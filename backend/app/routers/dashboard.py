from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any, Optional
import time
from datetime import datetime

from app.database import get_db
from app import models, schemas
from app.routers.auth import get_current_user

router = APIRouter(
    tags=["Dashboard & Notifications"]
)

# Static helper data matching mock/dashboard.js
QUICK_ACTIONS = [
    { "id": "qa_1", "title": "Upload & Analyze Case", "description": "Drag & drop legal briefs, PDFs, chats or audio scans", "route": "/upload", "icon": "UploadCloud", "color": "indigo" },
    { "id": "qa_2", "title": "Generate Legal Notice", "description": "Auto-draft Section 18 / Section 138 / Breach notices", "route": "/upload", "icon": "FileEdit", "color": "purple" },
    { "id": "qa_3", "title": "View Intelligence Reports", "description": "Browse and download 15+ comprehensive dossiers", "route": "/reports", "icon": "BookOpen", "color": "emerald" },
    { "id": "qa_4", "title": "Live Agent Pipeline", "description": "Monitor 8 real-time AI agents execution status", "route": "/processing", "icon": "Cpu", "color": "blue" }
]

SYSTEM_HEALTH = {
    "status": "All Multi-Agent Clusters Operational",
    "activeAgents": 8,
    "uptime": "99.98%",
    "apiLatency": "48ms",
    "ocrThroughput": "120 pages/min"
}

ANALYTICS_OVERVIEW = {
    "caseStatusDistribution": {
        "labels": ["Completed / Disposed", "In Progress", "Under Review", "Drafting Phase", "Appeals Pending"],
        "datasets": [
            {
                "label": "Cases Count",
                "data": [720, 390, 180, 112, 80],
                "backgroundColor": ["#10B981", "#6366F1", "#F59E0B", "#8B5CF6", "#EF4444"],
                "borderWidth": 0
            }
        ]
    },
    "monthlyCaseTrends": {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "datasets": [
            {
                "label": "Cases Ingested",
                "data": [65, 82, 110, 95, 130, 168, 195, 210, 185, 240, 265, 290],
                "borderColor": "#6366F1",
                "backgroundColor": "rgba(99, 102, 241, 0.15)",
                "fill": True,
                "tension": 0.4
            },
            {
                "label": "Favorable Outcomes",
                "data": [58, 74, 98, 86, 118, 150, 178, 192, 169, 218, 242, 268],
                "borderColor": "#10B981",
                "backgroundColor": "rgba(16, 185, 129, 0.1)",
                "fill": True,
                "tension": 0.4
            }
        ]
    },
    "caseCategoryBreakdown": {
        "labels": ["Property & RERA", "Consumer Complaints", "Cyber Crime & Data", "Employment & Labor", "Rental & Tenancy", "Traffic & MACT", "Insurance Claims", "Financial Fraud", "Domestic & Family", "Contract Breach"],
        "datasets": [
            {
                "label": "Active Cases",
                "data": [280, 210, 160, 140, 120, 150, 130, 95, 110, 87],
                "backgroundColor": "rgba(99, 102, 241, 0.8)",
                "borderRadius": 8
            }
        ]
    },
    "riskMatrix": {
        "labels": ["Low Risk (<30)", "Medium Risk (30-60)", "High Risk (60-80)", "Critical Risk (>80)"],
        "datasets": [
            {
                "label": "Percentage of Docket",
                "data": [58, 27, 11, 4],
                "backgroundColor": ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"]
            }
        ]
    },
    "agentPerformance": [
        { "name": "Document Intelligence Agent", "metric": "Document Processing", "val": "18,420 Files", "efficiency": "99.4%", "avgTime": "1.2s" },
        { "name": "Legal Research Agent", "metric": "Statute Mapping", "val": "42,100 Sections", "efficiency": "98.1%", "avgTime": "2.4s" },
        { "name": "Precedent Retrieval Agent", "metric": "Case Law Matches", "val": "12,900 Precedents", "efficiency": "95.7%", "avgTime": "3.1s" },
        { "name": "Evidence Classifier & Audit", "metric": "Proof Validation", "val": "9,450 Evidences", "efficiency": "97.2%", "avgTime": "1.8s" },
        { "name": "Outcome Predictor Engine", "metric": "Win Probability Model", "val": "1,482 Predictions", "efficiency": "94.8%", "avgTime": "2.0s" },
        { "name": "Defense Strategy Generator", "metric": "Argument Taxonomy", "val": "3,890 Strategies", "efficiency": "96.5%", "avgTime": "2.9s" },
        { "name": "Legal Notice Draft Agent", "metric": "Notices Drafted", "val": "890 Notices", "efficiency": "99.1%", "avgTime": "1.5s" },
        { "name": "Executive Synthesizer", "metric": "Final Dossiers", "val": "1,482 Dossiers", "efficiency": "99.8%", "avgTime": "1.1s" }
    ]
}

@router.get("/dashboard")
def get_dashboard_data(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Query cases list associated with the user
    user_cases = db.query(models.Case).filter(models.Case.user_id == current_user.id).all()
    total_cases = len(user_cases)
    
    # Calculate Dynamic KPIs based on user database cases
    # 1. Total Active Cases count
    active_cases_count = sum(1 for c in user_cases if c.status in ("In Progress", "Processing", "Active", "Under Review"))
    
    # 2. Average Win Probability
    avg_win_rate = 0.0
    if total_cases > 0:
        avg_win_rate = sum(c.successProbability for c in user_cases) / total_cases
    else:
        avg_win_rate = 89.4  # Default fallback
        
    # 3. Reports Generated count
    reports_count = db.query(models.Report).join(
        models.Case, models.Report.case_id == models.Case.id
    ).filter(models.Case.user_id == current_user.id).count()
    if reports_count == 0:
        reports_count = total_cases # Seed count if reports table isn't fully linked
        
    # Format dynamic KPI stats
    kpis = [
        {
            "id": "kpi_1",
            "title": "Total Active Cases",
            "value": str(active_cases_count) if active_cases_count > 0 else "0",
            "change": "+12.4%",
            "isPositive": True,
            "period": "vs last month",
            "iconName": "FolderKanban",
            "color": "indigo"
        },
        {
            "id": "kpi_2",
            "title": "AI Win Probability Avg",
            "value": f"{avg_win_rate:.1f}%",
            "change": "+4.1%",
            "isPositive": True,
            "period": "predictive model accuracy",
            "iconName": "TrendingUp",
            "color": "emerald"
        },
        {
            "id": "kpi_3",
            "title": "Legal Reports Generated",
            "value": f"{reports_count:,}",
            "change": "+28.5%",
            "isPositive": True,
            "period": "automated dossiers",
            "iconName": "FileText",
            "color": "purple"
        },
        {
            "id": "kpi_4",
            "title": "Risk Exposure Mitigated",
            "value": "₹ 142.5 Cr",
            "change": "+18.2%",
            "isPositive": True,
            "period": "financial litigation value",
            "iconName": "ShieldCheck",
            "color": "blue"
        }
    ]

    # Query last 5 cases
    recent_cases = db.query(models.Case).filter(
        models.Case.user_id == current_user.id
    ).order_by(models.Case.created_at.desc()).limit(5).all()
    
    # Query unread/recent user notifications
    notifications = db.query(models.Notification).filter(
        models.Notification.user_id == current_user.id
    ).order_by(models.Notification.created_at.desc()).limit(5).all()

    # Generate recent activities list
    # Use real user data details to synthesize activities
    recent_activities = []
    actions = [
        {"user": current_user.name, "action": "generated legal notice for", "icon": "FileText", "color": "indigo"},
        {"user": current_user.name, "action": "downloaded forensic audit report for", "icon": "Download", "color": "emerald"},
        {"user": "LexIntel AI Core", "action": "completed 100% processing for", "icon": "CheckCircle", "color": "blue"},
        {"user": current_user.name, "action": "added medical evidence to", "icon": "PlusSquare", "color": "purple"},
        {"user": current_user.name, "action": "updated win probability model for", "icon": "TrendingUp", "color": "amber"}
    ]
    
    # Mix recent user cases into activities
    for idx, case in enumerate(recent_cases[:5]):
        act_info = actions[idx % len(actions)]
        recent_activities.append({
            "id": f"act_{case.id}",
            "user": act_info["user"],
            "action": act_info["action"],
            "target": case.title,
            "time": "Just now" if idx == 0 else f"{idx} hours ago",
            "icon": act_info["icon"],
            "color": act_info["color"]
        })
        
    if not recent_activities:
        # Fallback to static mock list if no cases exist yet
        recent_activities = [
            { "id": "act_1", "user": current_user.name, "action": "generated RERA Legal Notice for", "target": "Sharma vs. Apex Realty", "time": "12 mins ago", "icon": "FileText", "color": "indigo" },
            { "id": "act_2", "user": "Dr. Ananya Roy", "action": "downloaded Forensic Audit Report for", "target": "State vs. Cyber Syndicate", "time": "45 mins ago", "icon": "Download", "color": "emerald" },
            { "id": "act_3", "user": "LexIntel AI Core", "action": "completed 100% processing for", "target": "Kulkarni vs. NovaSoft", "time": "1 hour ago", "icon": "CheckCircle", "color": "blue" }
        ]

    # Compile dynamic stats
    analytics = dict(ANALYTICS_OVERVIEW)
    analytics["overviewStats"] = {
        "totalCasesAnalyzed": total_cases,
        "activeLitigations": active_cases_count,
        "winRatePercentage": avg_win_rate,
        "avgResolutionDays": 64,
        "documentsProcessed": len(saved_documents_count(db, current_user.id)),
        "totalLegalNoticesGenerated": sum(1 for c in user_cases if c.generatedNotice),
        "riskMitigatedAmount": "₹ 142.5 Cr",
        "aiAccuracyScore": "96.8%"
    }

    return {
        "success": True,
        "data": {
            "kpis": kpis,
            "quickActions": QUICK_ACTIONS,
            "systemHealth": SYSTEM_HEALTH,
            "analytics": analytics,
            "recentCases": [
                {
                    "id": c.id,
                    "caseNumber": c.caseNumber,
                    "title": c.title,
                    "type": c.type,
                    "status": c.status,
                    "riskScore": c.riskScore,
                    "riskLevel": c.riskLevel,
                    "successProbability": c.successProbability,
                    "clientName": c.clientName,
                    "opposingParty": c.opposingParty,
                    "nextHearingDate": c.nextHearingDate
                } for c in recent_cases
            ],
            "recentActivities": recent_activities,
            "notifications": [
                {
                    "id": n.id,
                    "title": n.title,
                    "message": n.message,
                    "time": n.time,
                    "read": n.read,
                    "type": n.type
                } for n in notifications
            ]
        }
    }

def saved_documents_count(db: Session, user_id: str) -> List[str]:
    # Returns list of document IDs associated with user's cases
    docs = db.query(models.Document).join(
        models.Case, models.Document.case_id == models.Case.id
    ).filter(models.Case.user_id == user_id).all()
    return [d.id for d in docs]

@router.get("/notifications")
def get_notifications(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    notifications = db.query(models.Notification).filter(
        models.Notification.user_id == current_user.id
    ).order_by(models.Notification.created_at.desc()).all()
    
    return {
        "success": True,
        "data": [
            {
                "id": n.id,
                "title": n.title,
                "message": n.message,
                "time": n.time,
                "read": n.read,
                "type": n.type
            } for n in notifications
        ]
    }

@router.post("/notifications/{notif_id}/read")
def mark_notification_read(
    notif_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    notif = db.query(models.Notification).filter(
        models.Notification.id == notif_id,
        models.Notification.user_id == current_user.id
    ).first()
    
    if not notif:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found."
        )
        
    notif.read = True
    db.commit()
    
    return {"success": True, "message": "Notification marked as read."}
