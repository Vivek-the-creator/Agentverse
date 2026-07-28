import os
from dotenv import load_dotenv

# Load environmental variables from .env file if it exists
load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres.zrlqrcexnrcdcwteroiy:Rajadirector67.@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres"
)

# Convert connection string schema to standard postgresql if postgres:// is used
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

SECRET_KEY = os.getenv("SECRET_KEY", "lexintel_ai_platform_security_secret_2026_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week token lifespan for ease of dev testing
