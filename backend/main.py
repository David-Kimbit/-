# backend/main.py

from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, create_engine, Session
from . import models # 방금 만든 models.py를 import

# --- DB 설정 ---
DATABASE_FILE = "rise_budget.db"
sqlite_url = f"sqlite:///{DATABASE_FILE}"
engine = create_engine(sqlite_url, echo=True) # echo=True는 SQL 로그를 보여줌

# --- DB 테이블 생성 함수 ---
def create_db_and_tables():
    # models.py에서 정의한 모든 테이블을 실제 DB 파일에 생성
    SQLModel.metadata.create_all(engine)

# --- FastAPI 세션 관리 ---
# API 요청이 있을 때마다 DB 세션을 열고, 끝나면 닫는 함수
def get_session():
    with Session(engine) as session:
        yield session

# --- FastAPI 앱 생성 ---
app = FastAPI(
    title="RISE 사업단 예산 관리 백엔드",
    description="한국폴리텍IV대학 대전캠퍼스 RISE사업단 예산 관리 앱을 위한 API 서버입니다.",
    version="0.1.0",
)

# --- 앱 시작 시 DB 생성 ---
@app.on_event("startup")
def on_startup():
    create_db_and_tables() # 앱이 시작될 때 DB와 테이블을 생성
    print("데이터베이스 및 테이블이 성공적으로 생성되었습니다.")

# --- 테스트용 API ---
@app.get("/")
def read_root():
    return {"message": "RISE 사업단 백엔드 서버에 오신 것을 환영합니다!"}


# --- 여기에 3개 페이지를 위한 API들을 추가할 것입니다 ---
# 예: (1) 프로젝트 세팅 API
# 예: (2) 예산 수정 API
# 예: (3) 대시보드 API
