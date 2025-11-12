"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface SubProject {
  id: string
  name: string
  allocated: number
  spent: number
}

interface MainProject {
  id: string
  name: string
  allocated: number
  spent: number
  subProjects: SubProject[]
}

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

function formatAmount(amount: number, unit: string): string {
  const divisor =
    {
      원: 1,
      "천원 (1000원)": 1000,
      "백만원 (1,000,000원)": 1000000,
      "억원 (100,000,000원)": 100000000,
    }[unit] || 1

  const converted = amount / divisor
  const unitDisplay =
    {
      원: "원",
      "천원 (1000원)": "천원",
      "백만원 (1,000,000원)": "백만원",
      "억원 (100,000,000원)": "억원",
    }[unit] || "원"

  return `${converted.toLocaleString("ko-KR", { maximumFractionDigits: 1 })} ${unitDisplay}`
}

function calculatePercentage(spent: number, allocated: number): number {
  return Math.round((spent / allocated) * 100)
}

export default function Dashboard() {
  const [currencyUnit, setCurrencyUnit] = useState("원")

  const totalAllocated = mockProjects.reduce((sum, p) => sum + p.allocated, 0)
  const totalSpent = mockProjects.reduce((sum, p) => sum + p.spent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const spentPercentage = calculatePercentage(totalSpent, totalAllocated)

  const pieData = mockProjects.map((project) => ({
    name: project.name,
    value: project.spent,
  }))

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1", "#d084d0"]

  const monthlyData = [
    { month: "1월", spending: 5000000 },
    { month: "2월", spending: 8000000 },
    { month: "3월", spending: 12000000 },
    { month: "4월", spending: 18000000 },
    { month: "5월", spending: 25000000 },
    { month: "6월", spending: 32000000 },
  ]

  const detailedTransactions = [
    { date: "2024-06-01", description: "장비 구매", amount: 5000000, attachment: "receipt.pdf" },
    { date: "2024-06-05", description: "여행비", amount: 3000000, attachment: "invoice.pdf" },
    { date: "2024-06-10", description: "용역비", amount: 7000000, attachment: "contract.pdf" },
  ]

  return (
    <div className="ml-64 min-h-screen p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">대시보드</h1>
          <p className="text-muted-foreground mt-2">전체 예산 현황을 확인하세요</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="currency-select" className="text-sm font-medium">
            금액 단위
          </Label>
          <Select value={currencyUnit} onValueChange={setCurrencyUnit}>
            <SelectTrigger id="currency-select" className="w-48">
              <SelectValue placeholder="단위 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="원">원</SelectItem>
              <SelectItem value="천원 (1000원)">천원 (1000원)</SelectItem>
              <SelectItem value="백만원 (1,000,000원)">백만원 (1,000,000원)</SelectItem>
              <SelectItem value="억원 (100,000,000원)">억원 (100,000,000원)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8 max-w-7xl">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">총 지원금</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{formatAmount(totalAllocated, currencyUnit)}</div>
              <p className="text-xs text-muted-foreground mt-1">전체 지원금</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">총 사용액</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{formatAmount(totalSpent, currencyUnit)}</div>
              <p className="text-xs text-muted-foreground mt-1">{spentPercentage}% 사용</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-primary">잔여 예산</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{formatAmount(totalRemaining, currencyUnit)}</div>
              <p className="text-xs text-primary/70 mt-1">{100 - spentPercentage}% 남음</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">대사업별 지출 비중 (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatAmount(value as number, currencyUnit)} />
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
                이곳에 지출 현황에 대한 월간 분석 코멘트가 표시됩니다. 현재 총 예산의 {spentPercentage}%가 사용되었으며,
                남은 예산은 {formatAmount(totalRemaining, currencyUnit)}입니다. 주요 지출 항목은 {mockProjects[0].name}
                에서
                {formatAmount(mockProjects[0].spent, currencyUnit)}이고, 전월 대비 지출이 증가하는 추세입니다.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>대사업별 현황</CardTitle>
            <CardDescription>대사업을 클릭하여 소사업 상세 정보를 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {mockProjects.map((project) => {
                const projectSpentPercentage = calculatePercentage(project.spent, project.allocated)
                const projectRemaining = project.allocated - project.spent

                return (
                  <AccordionItem key={project.id} value={project.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-left">{project.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {projectSpentPercentage}% 사용
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatAmount(project.spent, currencyUnit)} /{" "}
                              {formatAmount(project.allocated, currencyUnit)}
                            </span>
                          </div>
                          <Progress value={projectSpentPercentage} className="mt-3 h-2" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 space-y-6">
                        <div className="border-t border-border pt-6">
                          <h4 className="font-semibold text-foreground mb-4">월별 지출 현황 (해당 사업)</h4>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                              <YAxis
                                stroke="var(--color-muted-foreground)"
                                label={{ value: "지출액", angle: -90, position: "insideLeft" }}
                              />
                              <Tooltip
                                formatter={(value) => formatAmount(value as number, currencyUnit)}
                                contentStyle={{
                                  backgroundColor: "var(--color-card)",
                                  border: "1px solid var(--color-border)",
                                }}
                              />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="spending"
                                stroke="var(--color-primary)"
                                strokeWidth={2}
                                name="지출액"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="border-t border-border pt-6">
                          <h4 className="font-semibold text-foreground mb-4">소사업별 현황</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>소사업명</TableHead>
                                <TableHead className="text-right">할당 예산</TableHead>
                                <TableHead className="text-right">총 지출액</TableHead>
                                <TableHead className="text-right">잔액</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {project.subProjects.map((subProject) => {
                                const subRemaining = subProject.allocated - subProject.spent

                                return (
                                  <TableRow key={subProject.id}>
                                    <TableCell className="font-medium">{subProject.name}</TableCell>
                                    <TableCell className="text-right">
                                      {formatAmount(subProject.allocated, currencyUnit)}
                                    </TableCell>
                                    <TableCell className="text-right text-destructive">
                                      {formatAmount(subProject.spent, currencyUnit)}
                                    </TableCell>
                                    <TableCell className="text-right text-primary font-semibold">
                                      {formatAmount(subRemaining, currencyUnit)}
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                              <TableRow className="bg-muted/50 font-semibold">
                                <TableCell>합계</TableCell>
                                <TableCell className="text-right">
                                  {formatAmount(project.allocated, currencyUnit)}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatAmount(project.spent, currencyUnit)}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatAmount(projectRemaining, currencyUnit)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        <div className="border-t border-border pt-6">
                          <h4 className="font-semibold text-foreground mb-4">월별 상세 지출 내역 (차트에서 월 선택)</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>날짜</TableHead>
                                <TableHead>지출 내역</TableHead>
                                <TableHead className="text-right">금액</TableHead>
                                <TableHead className="text-center">첨부파일</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {detailedTransactions.map((trans, idx) => (
                                <TableRow key={idx}>
                                  <TableCell className="text-sm">{trans.date}</TableCell>
                                  <TableCell className="text-sm">{trans.description}</TableCell>
                                  <TableCell className="text-right text-sm">
                                    {formatAmount(trans.amount, currencyUnit)}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <a href="#" className="text-primary text-xs hover:underline">
                                      {trans.attachment}
                                    </a>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
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
