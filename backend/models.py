# backend/models.py

from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

# --- 1. MainProject (대사업) 모델 ---
# Relationship을 위한 중간 테이블 (링크)
class MainProjectSubProjectLink(SQLModel, table=True):
    sub_project_id: Optional[int] = Field(
        default=None, foreign_key="subproject.id", primary_key=True
    )
    main_project_id: Optional[int] = Field(
        default=None, foreign_key="mainproject.id", primary_key=True
    )

# Relationship을 위한 중간 테이블 (링크)
class SubProjectTransactionLink(SQLModel, table=True):
    transaction_id: Optional[int] = Field(
        default=None, foreign_key="transaction.id", primary_key=True
    )
    sub_project_id: Optional[int] = Field(
        default=None, foreign_key="subproject.id", primary_key=True
    )

class MainProjectBase(SQLModel):
    name: str = Field(index=True, description="대사업명")
    total_budget: float = Field(default=0, description="총 예산")

class MainProject(MainProjectBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    sub_projects: List["SubProject"] = Relationship(back_populates="main_project", link_model=MainProjectSubProjectLink)

# --- 2. SubProject (소사업) 모델 ---
class SubProjectBase(SQLModel):
    name: str = Field(index=True, description="소사업명")
    allocated_budget: float = Field(default=0, description="할당 예산")

class SubProject(SubProjectBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    main_project_id: int = Field(foreign_key="mainproject.id")
    main_project: MainProject = Relationship(back_populates="sub_projects", link_model=MainProjectSubProjectLink)
    
    transactions: List["Transaction"] = Relationship(back_populates="sub_project", link_model=SubProjectTransactionLink)


# --- 3. Transaction (지출 내역) 모델 ---
class TransactionBase(SQLModel):
    date: str = Field(description="지출 날짜")
    description: str = Field(description="지출 내역 (항목)")
    amount: float = Field(description="지출 금액")
    remarks: Optional[str] = Field(default=None, description="상세 내용 (비고)")
    file_path: Optional[str] = Field(default=None, description="첨부파일 저장 경로")

class Transaction(TransactionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    sub_project_id: int = Field(foreign_key="subproject.id")
    sub_project: SubProject = Relationship(back_populates="transactions", link_model=SubProjectTransactionLink)

# --- API 데이터 전송용 모델들 (Pydantic 역할) ---
# 이 모델들은 API가 데이터를 받을(Create) 때 사용됩니다.
class MainProjectCreate(MainProjectBase):
    pass

class SubProjectCreate(SubProjectBase):
    main_project_id: int # 소사업 생성 시 어느 대사업에 속할지 ID가 필요

class TransactionCreate(TransactionBase):
    sub_project_id: int # 지출 생성 시 어느 소사업에 속할지 ID가 필요
