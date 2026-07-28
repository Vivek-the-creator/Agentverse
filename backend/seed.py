import os
import subprocess
import json
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import bcrypt

# Import models
from app.database import DATABASE_URL, Base
from app import models

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

EXTRACTOR_JS = """
const fs = require('fs');
const path = require('path');

async function extract() {
  try {
    const usersMod = await import('../frontend/src/mock/users.js');
    const casesMod = await import('../frontend/src/mock/cases.js');
    const reportsMod = await import('../frontend/src/mock/reports.js');
    const notificationsMod = await import('../frontend/src/mock/notifications.js');

    fs.writeFileSync('users.json', JSON.stringify(usersMod.mockUsers, null, 2));
    fs.writeFileSync('cases.json', JSON.stringify(casesMod.mockCases, null, 2));
    fs.writeFileSync('reports.json', JSON.stringify(reportsMod.mockReports, null, 2));
    fs.writeFileSync('notifications.json', JSON.stringify(notificationsMod.mockNotifications, null, 2));
    console.log("Mock data extracted to JSON files successfully!");
  } catch (err) {
    console.error("Error during extraction:", err);
    process.exit(1);
  }
}

extract();
"""

def run_extraction():
    print("Writing temporary JS extractor...")
    with open("extractor.js", "w", encoding="utf-8") as f:
        f.write(EXTRACTOR_JS)
        
    print("Executing JS extractor via Node...")
    try:
        # Run node to extract ESM exports
        result = subprocess.run(["node", "extractor.js"], check=True, capture_output=True, text=True)
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print("Failed to run node extraction:", e.stderr)
        # clean up and exit
        if os.path.exists("extractor.js"):
            os.remove("extractor.js")
        sys.exit(1)
        
    # Clean up extractor file
    if os.path.exists("extractor.js"):
        os.remove("extractor.js")

def seed_db():
    print(f"Connecting to database: {DATABASE_URL}")
    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()

    # Make sure tables exist
    print("Ensuring tables are created...")
    Base.metadata.create_all(bind=engine)

    # 1. Load Mocks from JSON
    print("Loading extracted JSON files...")
    with open("users.json", "r", encoding="utf-8") as f:
        users_data = json.load(f)
    with open("cases.json", "r", encoding="utf-8") as f:
        cases_data = json.load(f)
    with open("reports.json", "r", encoding="utf-8") as f:
        reports_data = json.load(f)
    with open("notifications.json", "r", encoding="utf-8") as f:
        notifications_data = json.load(f)

    # 2. Seed Users
    print(f"Seeding {len(users_data)} users...")
    user_mapping = {}  # Map name to ID for case relationships
    default_password_hash = get_password_hash("password123")
    
    for u in users_data:
        # Check if already exists
        existing_user = session.query(models.User).filter(models.User.email == u["email"]).first()
        if not existing_user:
            user = models.User(
                id=u["id"],
                name=u["name"],
                email=u["email"],
                password_hash=default_password_hash,
                role=u["role"],
                avatar=u.get("avatar"),
                barNumber=u.get("barNumber"),
                specialization=u.get("specialization"),
                courtJurisdiction=u.get("courtJurisdiction"),
                casesManaged=u.get("casesManaged", 0),
                successRate=u.get("successRate", "100%"),
                status=u.get("status", "Active"),
                phone=u.get("phone"),
                location=u.get("location"),
                joinedDate=u.get("joinedDate"),
                bio=u.get("bio")
            )
            session.add(user)
            user_mapping[u["name"]] = u["id"]
            print(f"Added User: {u['name']} ({u['email']})")
        else:
            user_mapping[u["name"]] = existing_user.id
            print(f"User {u['name']} already exists.")

    session.commit()

    # 3. Seed Cases
    print(f"Seeding {len(cases_data)} cases...")
    case_mapping = {}  # Map caseNumber/id to DB case id
    for c in cases_data:
        existing_case = session.query(models.Case).filter(models.Case.caseNumber == c["caseNumber"]).first()
        if not existing_case:
            # Match case to its lawyer ID
            lawyer_id = user_mapping.get(c.get("lawyerName"), "usr_001")
            
            # Map frontend case type to backend schema
            case = models.Case(
                id=c["id"],
                caseNumber=c["caseNumber"],
                title=c["title"],
                type=c["type"],
                status=c["status"],
                riskScore=c.get("riskScore", 0),
                riskLevel=c.get("riskLevel", "Low"),
                successProbability=c.get("successProbability", 50),
                settlementChance=c.get("settlementChance", 50),
                courtName=c.get("courtName"),
                jurisdiction=c.get("jurisdiction"),
                filingDate=c.get("filingDate"),
                nextHearingDate=c.get("nextHearingDate"),
                lawyerName=c.get("lawyerName"),
                clientName=c.get("clientName"),
                opposingParty=c.get("opposingParty"),
                judgeAssigned=c.get("judgeAssigned"),
                summary=c.get("summary"),
                applicableLaws=c.get("applicableLaws", []),
                importantDates=c.get("importantDates", []),
                parties=c.get("parties", {}),
                evidence=c.get("evidence", []),
                generatedNotice=c.get("generatedNotice"),
                defenseStrategy=c.get("defenseStrategy", []),
                tags=c.get("tags", []),
                user_id=lawyer_id
            )
            session.add(case)
            case_mapping[c["id"]] = c["id"]
            case_mapping[c["caseNumber"]] = c["id"]
            
            # Also seed its evidence documents
            for ev in c.get("evidence", []):
                db_doc = models.Document(
                    id=f"{c['id']}_{ev['id']}",
                    case_id=c["id"],
                    filePath=f"uploads/{ev['id']}_{ev['title'].replace(' ', '_')}",
                    extractedText=f"Mock OCR extraction content for evidence {ev['title']}.",
                    documentType=ev["type"]
                )
                session.add(db_doc)
                
                db_ev = models.Evidence(
                    id=f"{c['id']}_{ev['id']}",
                    case_id=c["id"],
                    fileType=ev["type"],
                    metadata_json=ev,
                    timelineDate=ev.get("date")
                )
                session.add(db_ev)
            
            print(f"Added Case: {c['title']} ({c['caseNumber']})")
        else:
            case_mapping[c["id"]] = existing_case.id
            case_mapping[c["caseNumber"]] = existing_case.id
            print(f"Case {c['title']} already exists.")
            
    session.commit()

    # 4. Seed Reports
    print(f"Seeding {len(reports_data)} reports...")
    for r in reports_data:
        # Resolve case id
        case_id = case_mapping.get(r["caseNumber"]) or case_mapping.get(r.get("case_id"))
        existing_report = session.query(models.Report).filter(models.Report.title == r["title"]).first()
        if not existing_report:
            report = models.Report(
                id=r["id"],
                case_id=case_id,
                title=r["title"],
                caseNumber=r["caseNumber"],
                caseTitle=r["caseTitle"],
                type=r["type"],
                authorAgent=r.get("authorAgent", "Executive Synthesizer"),
                generatedDate=r["generatedDate"],
                fileSize=r.get("fileSize", "2.5 MB"),
                pages=r.get("pages", 10),
                riskScore=r.get("riskScore", 0),
                successProbability=r.get("successProbability", "50%"),
                summary=r.get("summary"),
                downloadUrl=r.get("downloadUrl", "#"),
                tags=r.get("tags", [])
            )
            session.add(report)
            print(f"Added Report: {r['title']}")
            
    session.commit()

    # 5. Seed Notifications for users
    print(f"Seeding {len(notifications_data)} notifications...")
    all_users = session.query(models.User).all()
    for n in notifications_data:
        # Create a notification for each user to populate their feeds
        for user in all_users:
            existing_notif = session.query(models.Notification).filter(
                models.Notification.title == n["title"],
                models.Notification.user_id == user.id
            ).first()
            if not existing_notif:
                notif = models.Notification(
                    id=f"{user.id}_{n['id']}",
                    title=n["title"],
                    message=n["message"],
                    time=n["time"],
                    read=n["read"],
                    type=n["type"],
                    user_id=user.id
                )
                session.add(notif)
                
    session.commit()
    print("Database seeding completed successfully!")
    session.close()

    # Clean up JSON files
    for filename in ["users.json", "cases.json", "reports.json", "notifications.json"]:
        if os.path.exists(filename):
            os.remove(filename)

if __name__ == "__main__":
    run_extraction()
    seed_db()
