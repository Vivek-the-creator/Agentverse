from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, cases, reports, dashboard

# Create all database tables in PostgreSQL if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LexIntel AI REST API",
    description="Multi-Agent Smart Court & Legal Intelligence Platform Backend Engine",
    version="1.0.0"
)

# CORS Policy configuration to allow react frontend (local and production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev simplicity, allow all origins. Can be restricted to localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers under api/v1 prefix
app.include_router(auth.router, prefix="/api/v1")
app.include_router(cases.router, prefix="/api/v1")
app.include_router(reports.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {
        "status": "Online",
        "service": "LexIntel AI Core Agent & REST Engine",
        "version": "1.0.0",
        "cluster": "Multi-Agent System Hub"
    }
