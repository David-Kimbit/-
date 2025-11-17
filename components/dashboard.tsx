"use client"

import { useState } from "react"
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
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface MainProject {
  id: number
  name: string
  total_budget: number
}

const mockProjects: MainProject[] = [
  { id: 1, name: "A 대사업", total_budget: 100000000 },
  { id: 2, name: "B 대사업", total_budget: 150000000 },
  { id: 3, name: "C 대사업", total_budget: 80000000 },
]

function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}원`
}

const monthlyTrendData = [
  { month: "Jan", value: 45000000 },
  { month: "Feb", value: 52000000 },
  { month: "Mar", value: 48000000 },
  { month: "Apr", value: 61000000 },
  { month: "May", value: 55000000 },
  { month: "Jun", value: 67000000 },
  { month: "Jul", value: 72000000 },
  { month: "Aug", value: 58000000 },
  { month: "Sep", value: 75000000 },
  { month: "Oct", value: 82000000 },
  { month: "Nov", value: 78000000 },
  { month: "Dec", value: 68000000 },
]

export default function Dashboard() {
  const [projects, setProjects] = useState<MainProject[]>(mockProjects)
  const [selectedCurrency, setSelectedCurrency] = useState("원")

  const totalAllocated = projects.reduce((sum, p) => sum + p.total_budget, 0)
  const totalSpent = 132000000
  const totalRemaining = totalAllocated - totalSpent
  const spentPercentage = Math.round((totalSpent / totalAllocated) * 100)

  const formatAmount = (amount: number): string => {
    switch (selectedCurrency) {
      case "천원":
        return `₩${(amount / 1000).toLocaleString("ko-KR", { maximumFractionDigits: 0 })}천`
      case "백만원":
        return `₩${(amount / 1000000).toLocaleString("ko-KR", { maximumFractionDigits: 1 })}M`
      case "억원":
        return `₩${(amount / 100000000).toLocaleString("ko-KR", { maximumFractionDigits: 1 })}억`
      default:
        return formatKRW(amount)
    }
  }

  const pieData = projects.map((project) => ({
    name: project.name,
    value: project.total_budget,
  }))

  const COLORS = ["#06b6d4", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#06b6d4", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981"]

  return (
    <div className="ml-64 min-h-screen p-8 pt-24 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">오늘의 매출</h1>
            <p className="text-sm text-muted-foreground mt-1">매출 요약</p>
          </div>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-md text-foreground text-sm"
          >
            <option>원</option>
            <option>천원</option>
            <option>백만원</option>
            <option>억원</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">총 지원금</p>
                  <p className="text-2xl font-bold text-foreground">{formatAmount(totalAllocated)}</p>
                  <p className="text-xs text-cyan-500 mt-2">+10% from yesterday</p>
                </div>
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-500">
                  📊
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">주요 건수</p>
                  <p className="text-2xl font-bold text-foreground">500</p>
                  <p className="text-xs text-emerald-500 mt-2">+8% from yesterday</p>
                </div>
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500">
                  ⚡
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">불실 신청</p>
                  <p className="text-2xl font-bold text-foreground">9</p>
                  <p className="text-xs text-amber-500 mt-2">+2% from yesterday</p>
                </div>
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500">
                  🛍️
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">새로운 고객</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-cyan-500 mt-2">+3% from yesterday</p>
                </div>
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-500">
                  👥</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Level */}
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-base">Level</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px" }}
                    formatter={(value) => formatAmount(value as number)}
                  />
                  <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Area Chart - 용류비용 */}
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-base">용류비용</CardTitle>
              <Badge variant="outline" className="w-fit text-xs mt-2">새로운 고객</Badge>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyTrendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px" }}
                    formatter={(value) => formatAmount(value as number)}
                  />
                  <Area type="monotone" dataKey="value" stroke="#06b6d4" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ranked Projects Table */}
          <Card className="lg:col-span-2 bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-base">판매량 순</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs text-muted-foreground font-medium">#</TableHead>
                    <TableHead className="text-xs text-muted-foreground font-medium">사항명</TableHead>
                    <TableHead className="text-xs text-muted-foreground font-medium">인기도</TableHead>
                    <TableHead className="text-xs text-muted-foreground font-medium text-right">할인율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project, idx) => {
                    const progressValue = ((idx + 1) / projects.length) * 100
                    return (
                      <TableRow key={project.id} className="border-border hover:bg-muted/50">
                        <TableCell className="text-sm font-medium">0{idx + 1}</TableCell>
                        <TableCell className="text-sm text-foreground">{project.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={progressValue} className="w-24 h-1.5" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="text-amber-500 border-amber-500/30 text-xs">
                            {46 - idx * 14}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-base">대사업별 지출 비중</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatAmount(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Expense Card */}
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-base">순수익</CardTitle>
              <CardDescription className="text-xs">Total Expense</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-3xl font-bold text-foreground">{formatAmount(totalSpent)}</p>
                <p className="text-xs text-muted-foreground">Profit is 48% More than last Month</p>
                <div className="w-32 h-32 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-muted)" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="8"
                      strokeDasharray={`${(80 / 100) * 282.7} 282.7`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-foreground">
                      80%
                    </text>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card className="lg:col-span-2 bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-base">월별 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Current Trend Analysis</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    현재 월평균 지출액은 {formatAmount(totalSpent / 12)}이며, 전체 예산의 {spentPercentage}%가 사용되었습니다. 
                    예산 집행 추세는 매월 증가하고 있으며, 잔여 예산은 {formatAmount(totalRemaining)}입니다. 
                    월별 분석 결과, 가장 높은 지출은 10월에 기록되었습니다.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Last Month</p>
                    <p className="text-lg font-semibold text-foreground">{formatAmount(68000000)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">This Month</p>
                    <p className="text-lg font-semibold text-cyan-500">{formatAmount(82000000)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-base">대사업별 현황</CardTitle>
            <CardDescription className="text-xs">대사업을 클릭하여 예산과목 상세 정보를 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {projects.map((project) => {
                const projectSpent = Math.round((Math.random() * project.total_budget) / 1000000) * 1000000
                const spendPercent = Math.round((projectSpent / project.total_budget) * 100)

                return (
                  <AccordionItem key={project.id} value={`project-${project.id}`}>
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-foreground text-sm">{project.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {spendPercent}% 사용
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatAmount(projectSpent)} / {formatAmount(project.total_budget)}
                            </span>
                          </div>
                          <Progress value={spendPercent} className="mt-3 h-1.5" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={monthlyTrendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                            <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                            <Tooltip formatter={(value) => formatAmount(value as number)} />
                            <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
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
