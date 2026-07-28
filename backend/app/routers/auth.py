from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional

from app.database import get_db
from app import models, schemas
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

import bcrypt

# OAuth2 scheme for token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency to fetch the current user from the authorization header
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
        
    user = db.query(models.User).filter(models.User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/register")
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email is already registered."
        )

    # Hash user password
    hashed_pwd = get_password_hash(user_in.password)
    
    # Create new user record
    new_user = models.User(
        id=f"usr_{int(datetime.utcnow().timestamp())}",
        name=user_in.name,
        email=user_in.email,
        password_hash=hashed_pwd,
        role=user_in.role,
        avatar=user_in.avatar,
        barNumber=user_in.barNumber,
        specialization=user_in.specialization,
        courtJurisdiction=user_in.courtJurisdiction,
        casesManaged=0,
        successRate="100%",
        status="Active",
        phone=user_in.phone,
        location=user_in.location,
        joinedDate=datetime.now().strftime("%Y-%m-%d"),
        bio=user_in.bio
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create notification for new registration
    notif = models.Notification(
        id=f"notif_{int(datetime.utcnow().timestamp())}",
        title="Welcome to LexIntel AI",
        message="Your Multi-Agent Smart Court platform is active and ready for legal processing.",
        time="Just now",
        read=False,
        type="info",
        user_id=new_user.id
    )
    db.add(notif)
    db.commit()
    
    # Generate token
    token = create_access_token(data={"sub": new_user.email})
    
    # Format according to what frontend service expects
    return {
        "success": True,
        "data": {
            "user": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role,
                "avatar": new_user.avatar,
                "barNumber": new_user.barNumber,
                "specialization": new_user.specialization,
                "courtJurisdiction": new_user.courtJurisdiction,
                "casesManaged": new_user.casesManaged,
                "successRate": new_user.successRate,
                "status": new_user.status,
                "phone": new_user.phone,
                "location": new_user.location,
                "joinedDate": new_user.joinedDate,
                "bio": new_user.bio
            },
            "token": token,
            "message": "Registration successful."
        }
    }

@router.post("/login")
def login(login_req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_req.email).first()
    if not user or not verify_password(login_req.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password."
        )
        
    token = create_access_token(data={"sub": user.email})
    
    return {
        "success": True,
        "data": {
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "avatar": user.avatar,
                "barNumber": user.barNumber,
                "specialization": user.specialization,
                "courtJurisdiction": user.courtJurisdiction,
                "casesManaged": user.casesManaged,
                "successRate": user.successRate,
                "status": user.status,
                "phone": user.phone,
                "location": user.location,
                "joinedDate": user.joinedDate,
                "bio": user.bio
            },
            "token": token,
            "message": "Authentication successful."
        }
    }

@router.get("/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    return {
        "success": True,
        "data": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
            "role": current_user.role,
            "avatar": current_user.avatar,
            "barNumber": current_user.barNumber,
            "specialization": current_user.specialization,
            "courtJurisdiction": current_user.courtJurisdiction,
            "casesManaged": current_user.casesManaged,
            "successRate": current_user.successRate,
            "status": current_user.status,
            "phone": current_user.phone,
            "location": current_user.location,
            "joinedDate": current_user.joinedDate,
            "bio": current_user.bio
        }
    }
