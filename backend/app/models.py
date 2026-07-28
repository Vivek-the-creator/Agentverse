from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime, ForeignKey, Float, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="Legal Advocate")
    avatar = Column(String, nullable=True)
    barNumber = Column(String, nullable=True)
    specialization = Column(String, nullable=True)
    courtJurisdiction = Column(String, nullable=True)
    casesManaged = Column(Integer, default=0)
    successRate = Column(String, default="100%")
    status = Column(String, default="Active")
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    joinedDate = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())

    cases = relationship("Case", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

class Case(Base):
    __tablename__ = "cases"

    id = Column(String, primary_key=True, index=True)
    caseNumber = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False)
    status = Column(String, default="Processing")  # Processing, Active, Completed, Under Review
    riskScore = Column(Integer, default=0)
    riskLevel = Column(String, default="Low")       # Low, Medium, High, Critical
    successProbability = Column(Integer, default=50)
    settlementChance = Column(Integer, default=50)
    courtName = Column(String, nullable=True)
    jurisdiction = Column(String, nullable=True)
    filingDate = Column(String, nullable=True)
    nextHearingDate = Column(String, nullable=True)
    lawyerName = Column(String, nullable=True)
    clientName = Column(String, nullable=True)
    opposingParty = Column(String, nullable=True)
    judgeAssigned = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    
    # Store lists and dicts as JSON columns to support rich structures
    applicableLaws = Column(JSON, default=list)       # list of strings
    importantDates = Column(JSON, default=list)       # list of dicts: {date, event}
    parties = Column(JSON, default=dict)              # dict: {petitioner: {}, respondent: {}}
    evidence = Column(JSON, default=list)             # list of dicts: {id, title, type, score, date}
    generatedNotice = Column(Text, nullable=True)
    defenseStrategy = Column(JSON, default=list)       # list of strings
    tags = Column(JSON, default=list)                  # list of strings
    
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="cases")
    documents = relationship("Document", back_populates="case")
    evidence_records = relationship("Evidence", back_populates="case")
    predictions = relationship("Prediction", back_populates="case")
    reports = relationship("Report", back_populates="case")

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    case_id = Column(String, ForeignKey("cases.id"), nullable=False)
    filePath = Column(String, nullable=False)
    extractedText = Column(Text, nullable=True)
    documentType = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())

    case = relationship("Case", back_populates="documents")

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String, primary_key=True, index=True)
    case_id = Column(String, ForeignKey("cases.id"), nullable=False)
    fileType = Column(String, nullable=False)
    metadata_json = Column(JSON, default=dict)  # Metadata e.g. title, score, etc.
    timelineDate = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())

    case = relationship("Case", back_populates="evidence_records")

class Judgment(Base):
    __tablename__ = "judgments"

    id = Column(String, primary_key=True, index=True)
    citation = Column(String, nullable=False)
    verdict = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    vector_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String, primary_key=True, index=True)
    case_id = Column(String, ForeignKey("cases.id"), nullable=False)
    successRate = Column(Integer, default=50)
    riskLevel = Column(String, default="Low")
    estimate = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())

    case = relationship("Case", back_populates="predictions")

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, index=True)
    case_id = Column(String, ForeignKey("cases.id"), nullable=True)
    title = Column(String, nullable=False)
    caseNumber = Column(String, nullable=False)
    caseTitle = Column(String, nullable=False)
    type = Column(String, nullable=False)
    authorAgent = Column(String, default="Executive Synthesizer")
    generatedDate = Column(String, nullable=False)
    fileSize = Column(String, default="2.0 MB")
    pages = Column(Integer, default=10)
    riskScore = Column(Integer, default=0)
    successProbability = Column(String, default="50%")
    summary = Column(Text, nullable=True)
    downloadUrl = Column(String, default="#")
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=func.now())

    case = relationship("Case", back_populates="reports")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    time = Column(String, nullable=False)  # e.g., "10m ago"
    read = Column(Boolean, default=False)
    type = Column(String, default="info")  # success, warning, info, danger
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="notifications")
