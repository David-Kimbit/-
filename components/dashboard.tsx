"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// [ 🔽 1. 백엔드에서 받아올 데이터의 타입을 정의합니다 ]
// [ 🔽 1. (19~34줄) 기존 interface 정의를 모두 지우고 이걸로 교체 ]

// 백엔드 /api/main-projects 에서 받아올 데이터 타입
interface MainProject {
  id: number;
  name: string;
  total_budget: number;
}

// (나중에 사용) 백엔드 /api/budget-items 에서 받아올 데이터 타입
interface BudgetItem {
  id: number;
  name: string;
  allocated_budget: number;
  main_project_id: number;
}

// [ 🔼

const mockProjects: MainProject[] = [
  {
    id: "1",
    name: "A 대사업",
    allocated: 100000000,
    spent: 40000000,
    subProjects: [
      { id: "1-1", name: "Sub-Project A-1", allocated: 50000000, spent: 20000000 },
      { id: "1-2", name: "Sub-Project A-2", allocated: 50000000, spent: 20000000 },
    ],
  },
  {
    id: "2",
    name: "B 대사업",
    allocated: 150000000,
    spent: 60000000,
    subProjects: [
      { id: "2-1", name: "Sub-Project B-1", allocated: 75000000, spent: 30000000 },
      { id: "2-2", name: "Sub-Project B-2", allocated: 75000000, spent: 30000000 },
    ],
  },
  {
    id: "3",
    name: "C 대사업",
    allocated: 80000000,
    spent: 32000000,
    subProjects: [
      { id: "3-1", name: "Sub-Project C-1", allocated: 40000000, spent: 16000000 },
      { id: "3-2", name: "Sub-Project C-2", allocated: 40000000, spent: 16000000 },
    ],
  },
]
// ... (파일 상단의 import, interface 정의는 그대로 둠) ...

function formatKRW(amount: number): string {
  // M (백만) 단위 대신, '원' 단위로 포맷팅합니다.
  return `₩${amount.toLocaleString("ko-KR")}원`
}

// ... (calculatePercentage 함수는 그대로 둠) ...

export default function Dashboard() {
  // [ 🔽 1. mockProjects 대신, API 데이터를 담을 state를 만듭니다 ]
  const [projects, setProjects] = useState<MainProject[]>([]);
  // (나중에 로딩 스피너를 위해 추가)
  // const [isLoading, setIsLoading] = useState(true);

  // [ 🔽 2. 컴포넌트가 처음 보일 때 백엔드 API를 호출합니다 ]
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/main-projects");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: MainProject[] = await response.json();
        setProjects(data); // 성공하면, 받아온 데이터를 'state'에 저장
      } catch (error) {
        console.error("Error fetching main projects:", error);
      }
      // setIsLoading(false);
    }

    fetchProjects(); // 함수 실행
  }, []); // [] = "단 한 번만" 실행

  // [ 🔽 3. 'mockProjects' 대신, 실제 'projects' state를 사용하도록 계산 로직 변경 ]
  const totalAllocated = projects.reduce((sum, p) => sum + p.total_budget, 0)
  const totalSpent = 0 // [임시] 아직 지출 API가 없으므로 0으로 고정
  const totalRemaining = totalAllocated - totalSpent
  const spentPercentage = 0 // [임시] 0으로 고정

  const pieData = projects.map((project) => ({
    name: project.name,
    value: project.total_budget, // [수정] 'spent' 대신 'total_budget'으로 파이 차트 표시
  }))

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1", "#d084d0", "#a4de6c", "#d0a46c", "#83a698", "#a8bccc", "#c7a8cc"]

  // [ 🔽 4. (삭제) v0가 만든 가짜 데이터들을 모두 지웁니다 ]
  // const monthlyData = [...] 
  // const detailedTransactions = [...]
  // const mockProjects = [...] // (파일 상단에 있던 mockProjects도 지워야 합니다)

  return (
    <div className="ml-64 min-h-screen p-8">
      {/* ... (상단 h1, p 태그는 동일) ... */}

      <div className="space-y-8 max-w-7xl">
        {/* Summary Cards */}
        {/* [ 🔽 5. 상단 카드들이 이제 'projects' state를 바라봅니다 ] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">총 지원금</CardTitle>
            </CardHeader>
            <CardContent>
              {/* [수정] formatKRW가 '원' 단위로 표시하도록 변경됨 */}
              <div className="text-3xl font-bold text-foreground">{formatKRW(totalAllocated)}</div>
              <p className="text-xs text-muted-foreground mt-1">전체 지원금</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">총 사용액</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{formatKRW(totalSpent)}</div>
              <p className="text-xs text-muted-foreground mt-1">{spentPercentage}% 사용</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-primary">잔여 예산</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{formatKRW(totalRemaining)}</div>
              <p className="text-xs text-primary/70 mt-1">{100 - spentPercentage}% 남음</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              {/* [수정] 파이 차트 제목 변경 */}
              <CardTitle className="text-lg">대사업별 예산 비중 (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {/* [ 🔽 6. 파이 차트가 이제 'projects' state를 바라봅니다 ] */}
                <PieChart>
                  <Pie
                    data={pieData}
                    // ... (파이 차트 설정은 동일) ...
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatKRW(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">월간 재정 요약 (분석)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* [ 🔽 7. 분석 텍스트가 'projects' state를 바라봅니다 ] */}
              <p className="text-muted-foreground leading-relaxed">
                현재 총 예산의 {spentPercentage}%가 사용되었으며, 남은 예산은 {formatKRW(totalRemaining)}입니다. 
                {projects.length > 0 && (
                  <>
                    주요 예산 항목은 {projects[0].name}에 {formatKRW(projects[0].total_budget)}가 배정되었습니다.
                  </>
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>대사업별 현황</CardTitle>
            <CardDescription>대사업을 클릭하여 예산과목 상세 정보를 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            {/* [ 🔽 8. (핵심) Accordion이 'mockProjects' 대신 'projects' state를 바라봅니다 ] */}
            <Accordion type="single" collapsible className="w-full">
              {projects.map((project) => {
                // [임시] 지출액이 없으므로 0으로 고정
                const projectSpentPercentage = 0
                const projectRemaining = project.total_budget - 0

                return (
                  <AccordionItem key={project.id} value={project.name}> {/* [수정] key/value 변경 */}
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-left">{project.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {projectSpentPercentage}% 사용
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {/* [수정] 'spent' 대신 0, 'allocated' 대신 'total_budget' */}
                              {formatKRW(0)} / {formatKRW(project.total_budget)}
                            </span>
                          </div>
                          <Progress value={projectSpentPercentage} className="mt-3 h-2" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* [ 🔽 9. (다음 단계) Accordion 내부 컨텐츠는 비워둡니다 ] */}
                      <div className="pt-4 space-y-6">
                        <div className="border-t border-border pt-6">
                          <h4 className="font-semibold text-foreground mb-4">예산과목별 현황 (다음 단계)</h4>
                          <p className="text-muted-foreground">
                            이곳에 {project.name}에 속한 예산과목 리스트가 표시됩니다.
                            (GET /api/budget-items?main_project_id={project.id} API 호출 필요)
                          </p>
                          {/* (이전 테이블은 project.subProjects.map(...)을 사용했지만, 
                             project에는 subProjects가 없으므로 이 로직은 나중에 추가해야 함)
                          */}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
