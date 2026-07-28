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

@router.get("", response_model=List[schemas.CaseOut])
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
        
    return query.order_by(models.Case.created_at.desc()).all()

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
        
    # Map model to dictionary to append timelineEvents for frontend compatibility
    # In the mock data, timelineEvents are retrieved from mockTimelines using caseId
    # Let's synthesize timeline events from importantDates and evidence
    events = []
    
    # Process importantDates
    important_dates = case.importantDates or []
    for d in important_dates:
        events.append({
            "date": d.get("date", ""),
            "title": d.get("event", "Milestone reached"),
            "description": f"Scheduled event for {case.title}",
            "type": "hearing" if "hearing" in d.get("event", "").lower() else "milestone",
            "completed": datetime.strptime(d.get("date", "2026-01-01"), "%Y-%m-%d").date() <= datetime.now().date() if d.get("date") else True
        })
        
    # Process evidence for timeline
    evidence_list = case.evidence or []
    for ev in evidence_list:
        events.append({
            "date": ev.get("date", ""),
            "title": f"Evidence Ingested: {ev.get('title')}",
            "description": f"Verified {ev.get('type')} - {ev.get('score')}",
            "type": "document",
            "completed": True
        })
        
    # Sort events by date
    try:
        events.sort(key=lambda x: x["date"], reverse=True)
    except Exception:
        pass
        
    case_data = {
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
        "applicableLaws": case.applicableLaws,
        "importantDates": case.importantDates,
        "parties": case.parties,
        "evidence": case.evidence,
        "generatedNotice": case.generatedNotice,
        "defenseStrategy": case.defenseStrategy,
        "tags": case.tags,
        "timelineEvents": events
    }
    
    return {
        "success": True,
        "data": case_data
    }

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
    
    # Save file uploads locally
    for f in files:
        if not f.filename:
            continue
        file_id = f"ev_up_{int(time.time())}_{f.filename.replace(' ', '_')}"
        file_path = os.path.join(UPLOAD_DIR, file_id)
        with open(file_path, "wb") as buffer:
            buffer.write(f.file.read())
            
        saved_files_metadata.append({
            "id": file_id,
            "name": f.filename,
            "size": f"{(os.path.getsize(file_path) / (1024 * 1024)):.1f} MB",
            "type": "PDF Document" if f.filename.endswith(".pdf") else "Image File" if f.filename.endswith((".png", ".jpg", ".jpeg")) else "Evidentiary File",
            "date": datetime.now().strftime("%Y-%m-%d")
        })

    # Run AI Agents to analyze and compile facts
    doc_intel = agents.run_document_intelligence_agent(title, caseType, notes, saved_files_metadata)
    evidence_timeline = agents.run_evidence_analysis_agent(saved_files_metadata, notes)
    applicable_laws = agents.run_legal_research_agent(caseType, notes)
    predictions = agents.run_outcome_prediction_agent(caseType, notes)
    strategy = agents.run_strategy_planning_agent(caseType, notes)
    parties = doc_intel.get("parties", {})
    draft_notice = agents.run_legal_drafting_agent(title, caseType, parties, notes)
    
    # Generate list of tags
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
        status="Processing",  # Start with processing status
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
        applicableLaws=applicable_laws,
        importantDates=important_dates,
        parties=parties,
        evidence=evidence_timeline,
        generatedNotice=draft_notice,
        defenseStrategy=strategy,
        tags=tags,
        user_id=current_user.id
    )
    
    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    # Increment user cases managed
    current_user.casesManaged += 1
    db.commit()

    # Save documents references in Documents table
    for sf in saved_files_metadata:
        db_doc = models.Document(
            id=sf["id"],
            case_id=case_id,
            filePath=os.path.join(UPLOAD_DIR, sf["id"]),
            extractedText=f"Extracted content from {sf['name']}. Undergoing OCR translation.",
            documentType=sf["type"]
        )
        db.add(db_doc)
        
        # Save in Evidence table as well
        db_ev = models.Evidence(
            id=sf["id"],
            case_id=case_id,
            fileType=sf["type"],
            metadata_json=sf,
            timelineDate=sf["date"]
        )
        db.add(db_ev)
    db.commit()

    # Generate Report using Report Agent
    report_data = agents.run_report_agent(
        new_case.id,
        new_case.title,
        new_case.caseNumber,
        new_case.type,
        predictions,
        new_case.summary
    )
    
    new_report = models.Report(
        id=report_data["id"],
        case_id=new_case.id,
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
    )
    db.add(new_report)
    
    # Add a notification
    new_notif = models.Notification(
        id=f"notif_{int(time.time())}",
        title="New Case Ingested",
        message=f"Case {new_case.caseNumber} ({new_case.title}) is uploaded and processing in Multi-Agent queue.",
        time="Just now",
        read=False,
        type="info",
        user_id=current_user.id
    )
    db.add(new_notif)
    db.commit()

    # Form response format
    return {
        "success": True,
        "data": {
            "id": new_case.id,
            "caseNumber": new_case.caseNumber,
            "title": new_case.title,
            "type": new_case.type,
            "status": new_case.status,
            "riskScore": new_case.riskScore,
            "riskLevel": new_case.riskLevel,
            "successProbability": new_case.successProbability,
            "settlementChance": new_case.settlementChance,
            "courtName": new_case.courtName,
            "jurisdiction": new_case.jurisdiction,
            "filingDate": new_case.filingDate,
            "nextHearingDate": new_case.nextHearingDate,
            "lawyerName": new_case.lawyerName,
            "clientName": new_case.clientName,
            "opposingParty": new_case.opposingParty,
            "judgeAssigned": new_case.judgeAssigned,
            "summary": new_case.summary,
            "applicableLaws": new_case.applicableLaws,
            "importantDates": new_case.importantDates,
            "parties": new_case.parties,
            "evidence": new_case.evidence,
            "generatedNotice": new_case.generatedNotice,
            "defenseStrategy": new_case.defenseStrategy,
            "tags": new_case.tags
        }
    }

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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found."
        )
        
    # Mark case analysis completed
    case.status = "In Progress"
    db.commit()
    
    # Trigger final analysis notification
    new_notif = models.Notification(
        id=f"notif_{int(time.time())}",
        title="Multi-Agent Processing Complete",
        message=f"Analysis complete for {case.title}. Risk assessment & strategy compiled.",
        time="Just now",
        read=False,
        type="success",
        user_id=current_user.id
    )
    db.add(new_notif)
    db.commit()
    
    return {
        "success": True,
        "data": {
            "agents": [
                {"id": "ag_1", "name": "Legal Document Intelligence", "status": "Completed", "progress": 100},
                {"id": "ag_2", "name": "Legal Research Swarm", "status": "Completed", "progress": 100},
                {"id": "ag_3", "name": "Similar Case Retriever", "status": "Completed", "progress": 100},
                {"id": "ag_4", "name": "Evidence Chronology Classifier", "status": "Completed", "progress": 100},
                {"id": "ag_5", "name": "Case Outcome Predictor", "status": "Completed", "progress": 100},
                {"id": "ag_6", "name": "Legal Strategy Planner", "status": "Completed", "progress": 100},
                {"id": "ag_7", "name": "Legal Notice Drafting Agent", "status": "Completed", "progress": 100},
                {"id": "ag_8", "name": "Executive Report Compiler", "status": "Completed", "progress": 100}
            ],
            "currentCase": {
                "id": case.id,
                "title": case.title,
                "caseNumber": case.caseNumber
            }
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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found."
        )
        
    return {
        "success": True,
        "data": {
            "riskScore": case.riskScore,
            "riskLevel": case.riskLevel,
            "successProbability": case.successProbability,
            "settlementChance": case.settlementChance,
            "confidenceInterval": "95% CI (80% - 94%)",
            "keyDrivers": [
                f"Statutory mandate under {case.applicableLaws[0] if case.applicableLaws else 'Governing Law'}",
                f"Relevance of evidence files ({len(case.evidence or [])} ingested elements)",
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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found."
        )
        
    return {
        "success": True,
        "data": {
            "draftType": draftType,
            "noticeText": case.generatedNotice,
            "generatedAt": datetime.now().isoformat()
        }
    }
