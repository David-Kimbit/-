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

// 백엔드 /api/main-projects 에서 받아올 데이터 타입
interface MainProject {
  id: number
  name: string
  total_budget: number
}

// 백엔드 /api/budget-items 에서 받아올 데이터 타입
interface BudgetItem {
  id: number
  name: string
  allocated_budget: number
  main_project_id: number
}

function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}원`
}

export default function Dashboard() {
  const [projects, setProjects] = useState<MainProject[]>([])
  const [budgetItems, setBudgetItems] = useState<{ [key: number]: BudgetItem[] }>({})
  const [loadingBudgetItems, setLoadingBudgetItems] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/main-projects")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data: MainProject[] = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching main projects:", error)
      }
    }

    fetchProjects()
  }, [])

  const fetchBudgetItems = async (projectId: number) => {
    // Skip if already loading or already loaded
    if (loadingBudgetItems[projectId] || budgetItems[projectId]) {
      return
    }

    setLoadingBudgetItems((prev) => ({ ...prev, [projectId]: true }))

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/budget-items?main_project_id=${projectId}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch budget items")
      }
      const data: BudgetItem[] = await response.json()
      setBudgetItems((prev) => ({ ...prev, [projectId]: data }))
    } catch (error) {
      console.error(`Error fetching budget items for project ${projectId}:`, error)
      // Set empty array on error to prevent repeated attempts
      setBudgetItems((prev) => ({ ...prev, [projectId]: [] }))
    } finally {
      setLoadingBudgetItems((prev) => ({ ...prev, [projectId]: false }))
    }
  }

  const totalAllocated = projects.reduce((sum, p) => sum + p.total_budget, 0)
  const totalSpent = 0
  const totalRemaining = totalAllocated - totalSpent
  const spentPercentage = 0

  const pieData = projects.map((project) => ({
    name: project.name,
    value: project.total_budget,
  }))

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7c7c",
    "#8dd1e1",
    "#d084d0",
    "#a4de6c",
    "#d0a46c",
    "#83a698",
    "#a8bccc",
    "#c7a8cc",
  ]

  return (
    <div className="ml-64 min-h-screen p-8">
      <div className="space-y-8 max-w-7xl">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">총 지원금</CardTitle>
            </CardHeader>
            <CardContent>
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
              <CardTitle className="text-lg">대사업별 예산 비중 (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
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
              <p className="text-muted-foreground leading-relaxed">
                현재 총 예산의 {spentPercentage}%가 사용되었으며, 남은 예산은 {formatKRW(totalRemaining)}
                입니다.
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
            <Accordion type="single" collapsible className="w-full">
              {projects.map((project) => {
                const projectSpentPercentage = 0
                const projectRemaining = project.total_budget - 0
                const projectBudgetItems = budgetItems[project.id] || []
                const isLoading = loadingBudgetItems[project.id] || false

                return (
                  <AccordionItem key={project.id} value={`project-${project.id}`}>
                    <AccordionTrigger
                      className="hover:no-underline"
                      onClick={() => fetchBudgetItems(project.id)}
                    >
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-left">{project.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {projectSpentPercentage}% 사용
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatKRW(0)} / {formatKRW(project.total_budget)}
                            </span>
                          </div>
                          <Progress value={projectSpentPercentage} className="mt-3 h-2" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 space-y-6">
                        <div className="border-t border-border pt-6">
                          <h4 className="font-semibold text-foreground mb-4">예산과목별 현황</h4>

                          {isLoading ? (
                            <p className="text-muted-foreground">로딩 중...</p>
                          ) : projectBudgetItems.length > 0 ? (
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>예산과목명</TableHead>
                                    <TableHead className="text-right">배정액</TableHead>
                                    <TableHead className="text-right">사용액</TableHead>
                                    <TableHead className="text-right">잔액</TableHead>
                                    <TableHead className="text-right">사용률</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {projectBudgetItems.map((item) => {
                                    const itemUsage = 0 // TODO: Fetch actual usage from expense API
                                    const itemRemaining = item.allocated_budget - itemUsage
                                    const itemUsageRate = item.allocated_budget > 0 
                                      ? ((itemUsage / item.allocated_budget) * 100).toFixed(1)
                                      : 0

                                    return (
                                      <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell className="text-right">
                                          {formatKRW(item.allocated_budget)}
                                        </TableCell>
                                        <TableCell className="text-right">{formatKRW(itemUsage)}</TableCell>
                                        <TableCell className="text-right">
                                          {formatKRW(itemRemaining)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                          <Badge variant={itemUsageRate > 80 ? "destructive" : "secondary"}>
                                            {itemUsageRate}%
                                          </Badge>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              {project.name}에 속한 예산과목이 없습니다.
                            </p>
                          )}
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
