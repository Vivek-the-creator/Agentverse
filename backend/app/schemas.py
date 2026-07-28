from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Optional[str] = "Legal Advocate"
    avatar: Optional[str] = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    barNumber: Optional[str] = None
    specialization: Optional[str] = None
    courtJurisdiction: Optional[str] = "District Court"
    casesManaged: Optional[int] = 0
    successRate: Optional[str] = "100%"
    status: Optional[str] = "Active"
    phone: Optional[str] = None
    location: Optional[str] = None
    joinedDate: Optional[str] = None
    bio: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    avatar: Optional[str] = None
    barNumber: Optional[str] = None
    specialization: Optional[str] = None
    courtJurisdiction: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None

class UserOut(UserBase):
    id: str

    class Config:
        from_attributes = True

# --- Case Schemas ---
class CaseBase(BaseModel):
    caseNumber: str
    title: str
    type: str
    status: Optional[str] = "Processing"
    riskScore: Optional[int] = 0
    riskLevel: Optional[str] = "Low"
    successProbability: Optional[int] = 50
    settlementChance: Optional[int] = 50
    courtName: Optional[str] = None
    jurisdiction: Optional[str] = None
    filingDate: Optional[str] = None
    nextHearingDate: Optional[str] = None
    lawyerName: Optional[str] = None
    clientName: Optional[str] = None
    opposingParty: Optional[str] = None
    judgeAssigned: Optional[str] = None
    summary: Optional[str] = None
    applicableLaws: Optional[List[str]] = []
    importantDates: Optional[List[Dict[str, Any]]] = []
    parties: Optional[Dict[str, Any]] = {}
    evidence: Optional[List[Dict[str, Any]]] = []
    generatedNotice: Optional[str] = None
    defenseStrategy: Optional[List[str]] = []
    tags: Optional[List[str]] = []

class CaseCreate(BaseModel):
    title: str
    caseType: str
    jurisdiction: str
    clientName: str
    opposingParty: str
    notes: Optional[str] = ""
    files: Optional[List[Dict[str, Any]]] = []

class CaseOut(CaseBase):
    id: str
    user_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- Document Schemas ---
class DocumentBase(BaseModel):
    filePath: str
    documentType: Optional[str] = None

class DocumentCreate(DocumentBase):
    case_id: str
    extractedText: Optional[str] = None

class DocumentOut(DocumentBase):
    id: str
    case_id: str
    extractedText: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- Notification Schemas ---
class NotificationBase(BaseModel):
    title: str
    message: str
    time: str
    read: Optional[bool] = False
    type: Optional[str] = "info"

class NotificationOut(NotificationBase):
    id: str
    user_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- Report Schemas ---
class ReportBase(BaseModel):
    title: str
    caseNumber: str
    caseTitle: str
    type: str
    authorAgent: Optional[str] = "Executive Synthesizer"
    generatedDate: str
    fileSize: Optional[str] = "2.0 MB"
    pages: Optional[int] = 10
    riskScore: Optional[int] = 0
    successProbability: Optional[str] = "50%"
    summary: Optional[str] = None
    downloadUrl: Optional[str] = "#"
    tags: Optional[List[str]] = []

class ReportOut(ReportBase):
    id: str
    case_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
