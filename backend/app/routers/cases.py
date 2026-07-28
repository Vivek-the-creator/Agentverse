from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional, Any, Dict
import time
import os
import json
from datetime import datetime

from app.database import get_db
from app import models, schemas
from app.routers.auth import get_current_user
from app.services import agents

router = APIRouter(
    prefix="/cases",
    tags=["Cases Management"]
)

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def _serialize_case(case: models.Case) -> dict:
    """Serialise a SQLAlchemy Case object to a plain dict the frontend expects."""
    return {
        "id": case.id,
        "caseNumber": case.caseNumber,
        "title": case.title,
        "type": case.type,
        "status": case.status,
        "riskScore": case.riskScore,
        "riskLevel": case.riskLevel,
        "successProbability": case.successProbability,
        "settlementChance": case.settlementChance,
        "courtName": case.courtName,
        "jurisdiction": case.jurisdiction,
        "filingDate": case.filingDate,
        "nextHearingDate": case.nextHearingDate,
        "lawyerName": case.lawyerName,
        "clientName": case.clientName,
        "opposingParty": case.opposingParty,
        "judgeAssigned": case.judgeAssigned,
        "summary": case.summary,
        "applicableLaws": case.applicableLaws or [],
        "importantDates": case.importantDates or [],
        "parties": case.parties or {},
        "evidence": case.evidence or [],
        "generatedNotice": case.generatedNotice,
        "defenseStrategy": case.defenseStrategy or [],
        "tags": case.tags or [],
    }


@router.get("")
def get_cases(
    type: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    query = db.query(models.Case).filter(models.Case.user_id == current_user.id)

    if type and type != "All":
        query = query.filter(models.Case.type.ilike(f"%{type}%"))
    if status and status != "All":
        query = query.filter(models.Case.status.ilike(f"%{status}%"))
    if search:
        query = query.filter(
            models.Case.title.ilike(f"%{search}%") |
            models.Case.caseNumber.ilike(f"%{search}%") |
            models.Case.clientName.ilike(f"%{search}%") |
            models.Case.opposingParty.ilike(f"%{search}%")
        )

    cases = query.order_by(models.Case.created_at.desc()).all()
    return {"success": True, "data": [_serialize_case(c) for c in cases]}


@router.get("/{case_id}")
def get_case_by_id(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    case = db.query(models.Case).filter(
        models.Case.id == case_id,
        models.Case.user_id == current_user.id
    ).first()

    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found or unauthorized access."
        )

    # Build timeline events from importantDates + evidence
    events = []
    for d in (case.importantDates or []):
        try:
            completed = datetime.strptime(d.get("date", "2026-01-01"), "%Y-%m-%d").date() <= datetime.now().date()
        except ValueError:
            completed = True
        events.append({
            "date": d.get("date", ""),
            "title": d.get("event", "Milestone"),
            "description": f"Scheduled event for {case.title}",
            "type": "hearing" if "hearing" in d.get("event", "").lower() else "milestone",
            "completed": completed
        })

    for ev in (case.evidence or []):
        events.append({
            "date": ev.get("date", ""),
            "title": f"Evidence: {ev.get('title')}",
            "description": f"{ev.get('type')} — {ev.get('score')}",
            "type": "document",
            "completed": True
        })

    try:
        events.sort(key=lambda x: x["date"], reverse=True)
    except Exception:
        pass

    case_data = _serialize_case(case)
    case_data["timelineEvents"] = events

    return {"success": True, "data": case_data}


@router.post("/upload")
def upload_case(
    title: str = Form(...),
    caseType: str = Form(...),
    jurisdiction: str = Form(...),
    clientName: str = Form(...),
    opposingParty: str = Form(...),
    notes: Optional[str] = Form(""),
    files: List[UploadFile] = File([]),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    case_id = f"case_{int(time.time())}"
    case_number = f"CS/2026/{int(time.time() % 10000):04d}"

    saved_files_metadata = []

    for f in files:
        if not f.filename:
            continue
        safe_name = f.filename.replace(" ", "_")
        file_id = f"ev_up_{int(time.time())}_{safe_name}"
        file_path = os.path.join(UPLOAD_DIR, file_id)
        with open(file_path, "wb") as buffer:
            buffer.write(f.file.read())

        saved_files_metadata.append({
            "id": file_id,
            "name": f.filename,
            "size": f"{(os.path.getsize(file_path) / (1024 * 1024)):.1f} MB",
            "type": (
                "PDF Document" if f.filename.endswith(".pdf")
                else "Image File" if f.filename.endswith((".png", ".jpg", ".jpeg"))
                else "Evidentiary File"
            ),
            "date": datetime.now().strftime("%Y-%m-%d")
        })

    # Run all 8 agent stubs
    doc_intel      = agents.run_document_intelligence_agent(title, caseType, notes, saved_files_metadata)
    evidence_list  = agents.run_evidence_analysis_agent(saved_files_metadata, notes)
    laws           = agents.run_legal_research_agent(caseType, notes)
    predictions    = agents.run_outcome_prediction_agent(caseType, notes)
    strategy       = agents.run_strategy_planning_agent(caseType, notes)
    parties        = doc_intel.get("parties", {})
    draft_notice   = agents.run_legal_drafting_agent(title, caseType, parties, notes)

    tags = [caseType.split(" ")[0], "New Ingestion"]
    if predictions.get("successProbability", 50) > 85:
        tags.append("High Success Rate")

    important_dates = [
        {"date": datetime.now().strftime("%Y-%m-%d"), "event": "Legal Brief Ingested by LexIntel Core"},
        {"date": "2026-09-15", "event": "Scheduled First Preliminary Hearing"}
    ]

    new_case = models.Case(
        id=case_id,
        caseNumber=case_number,
        title=title,
        type=caseType,
        status="Processing",
        riskScore=predictions.get("riskScore", 30),
        riskLevel=predictions.get("riskLevel", "Medium"),
        successProbability=predictions.get("successProbability", 50),
        settlementChance=predictions.get("settlementChance", 50),
        courtName="High Court of Judicature",
        jurisdiction=jurisdiction,
        filingDate=datetime.now().strftime("%Y-%m-%d"),
        nextHearingDate="2026-09-15",
        lawyerName=current_user.name,
        clientName=clientName,
        opposingParty=opposingParty,
        judgeAssigned="Justice Swarm Panel",
        summary=doc_intel.get("summary", notes),
        applicableLaws=laws,
        importantDates=important_dates,
        parties=parties,
        evidence=evidence_list,
        generatedNotice=draft_notice,
        defenseStrategy=strategy,
        tags=tags,
        user_id=current_user.id
    )

    db.add(new_case)
    current_user.casesManaged = (current_user.casesManaged or 0) + 1

    # Save document references
    for sf in saved_files_metadata:
        db.add(models.Document(
            id=sf["id"],
            case_id=case_id,
            filePath=os.path.join(UPLOAD_DIR, sf["id"]),
            extractedText=f"Extracted content from {sf['name']}. Undergoing OCR translation.",
            documentType=sf["type"]
        ))
        db.add(models.Evidence(
            id=sf["id"] + "_ev",
            case_id=case_id,
            fileType=sf["type"],
            metadata_json=sf,
            timelineDate=sf["date"]
        ))

    # Generate & save report
    report_data = agents.run_report_agent(
        case_id, title, case_number, caseType, predictions, doc_intel.get("summary", notes)
    )
    db.add(models.Report(
        id=report_data["id"],
        case_id=case_id,
        title=report_data["title"],
        caseNumber=report_data["caseNumber"],
        caseTitle=report_data["caseTitle"],
        type=report_data["type"],
        authorAgent=report_data["authorAgent"],
        generatedDate=report_data["generatedDate"],
        fileSize=report_data["fileSize"],
        pages=report_data["pages"],
        riskScore=report_data["riskScore"],
        successProbability=report_data["successProbability"],
        summary=report_data["summary"],
        downloadUrl=report_data["downloadUrl"],
        tags=report_data["tags"]
    ))

    # Notify the user
    db.add(models.Notification(
        id=f"notif_{int(time.time())}",
        title="New Case Ingested",
        message=f"Case {case_number} ({title}) uploaded and queued for Multi-Agent processing.",
        time="Just now",
        read=False,
        type="info",
        user_id=current_user.id
    ))

    db.commit()
    db.refresh(new_case)

    return {"success": True, "data": _serialize_case(new_case)}


@router.post("/{case_id}/analyze")
def analyze_case(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    case = db.query(models.Case).filter(
        models.Case.id == case_id,
        models.Case.user_id == current_user.id
    ).first()

    if not case:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case not found.")

    case.status = "In Progress"

    db.add(models.Notification(
        id=f"notif_{int(time.time())}",
        title="Multi-Agent Processing Complete",
        message=f"Analysis complete for {case.title}. Risk assessment & strategy compiled.",
        time="Just now",
        read=False,
        type="success",
        user_id=current_user.id
    ))
    db.commit()

    return {
        "success": True,
        "data": {
            "agents": [
                {"id": f"ag_{i}", "name": name, "status": "Completed", "progress": 100}
                for i, name in enumerate([
                    "Legal Document Intelligence", "Legal Research Swarm",
                    "Similar Case Retriever", "Evidence Chronology Classifier",
                    "Case Outcome Predictor", "Legal Strategy Planner",
                    "Legal Notice Drafting Agent", "Executive Report Compiler"
                ], start=1)
            ],
            "currentCase": {"id": case.id, "title": case.title, "caseNumber": case.caseNumber}
        }
    }


@router.post("/{case_id}/predict")
def predict_outcome(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    case = db.query(models.Case).filter(
        models.Case.id == case_id,
        models.Case.user_id == current_user.id
    ).first()

    if not case:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case not found.")

    laws = case.applicableLaws or []
    return {
        "success": True,
        "data": {
            "riskScore": case.riskScore,
            "riskLevel": case.riskLevel,
            "successProbability": case.successProbability,
            "settlementChance": case.settlementChance,
            "confidenceInterval": "95% CI (80% - 94%)",
            "keyDrivers": [
                f"Statutory mandate under {laws[0]}" if laws else "Applicable governing statutes",
                f"Evidence files analysed: {len(case.evidence or [])} documents",
                "Precedent binding force in Apex tribunals"
            ]
        }
    }


@router.post("/{case_id}/draft")
def generate_draft(
    case_id: str,
    draftType: str = "Legal Notice",
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    case = db.query(models.Case).filter(
        models.Case.id == case_id,
        models.Case.user_id == current_user.id
    ).first()

    if not case:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case not found.")

    return {
        "success": True,
        "data": {
            "draftType": draftType,
            "noticeText": case.generatedNotice,
            "generatedAt": datetime.now().isoformat()
        }
    }
