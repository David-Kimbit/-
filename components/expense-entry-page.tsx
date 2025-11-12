"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon, Upload, Pencil, Trash2 } from "lucide-react"

const mainProjects = [
  { id: "1", name: "A 대사업" },
  { id: "2", name: "B 대사업" },
  { id: "3", name: "C 대사업" },
]

const subProjectsByMain: Record<string, Array<{ id: string; name: string }>> = {
  "1": [
    { id: "1-1", name: "Sub-Project A-1" },
    { id: "1-2", name: "Sub-Project A-2" },
  ],
  "2": [
    { id: "2-1", name: "Sub-Project B-1" },
    { id: "2-2", name: "Sub-Project B-2" },
  ],
  "3": [
    { id: "3-1", name: "Sub-Project C-1" },
    { id: "3-2", name: "Sub-Project C-2" },
  ],
}

const mockTransactions = [
  {
    id: "1",
    date: "2024-06-01",
    mainProject: "A 대사업",
    subProject: "Sub-Project A-1",
    description: "장비 구매",
    amount: 5000000,
    attachment: "receipt.pdf",
  },
  {
    id: "2",
    date: "2024-06-05",
    mainProject: "B 대사업",
    subProject: "Sub-Project B-1",
    description: "여행비",
    amount: 3000000,
    attachment: "invoice.pdf",
  },
]

export default function ExpenseEntryPage() {
  const [mainProject, setMainProject] = useState("")
  const [subProject, setSubProject] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [remarks, setRemarks] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [filterMainProject, setFilterMainProject] = useState("all")
  const [filterSubProject, setFilterSubProject] = useState("all")

  const handleReset = () => {
    setMainProject("")
    setSubProject("")
    setDate(new Date())
    setDescription("")
    setAmount("")
    setRemarks("")
    setFile(null)
  }

  const handleSave = async () => {
    if (!mainProject || !subProject || !date || !description || !amount) {
      alert("모든 필수 항목을 입력해주세요")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log({
        mainProject,
        subProject,
        date,
        description,
        amount: Number.parseFloat(amount),
        remarks,
        file: file?.name,
      })
      handleReset()
      alert("지출이 등록되었습니다!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSubProjects = mainProject ? subProjectsByMain[mainProject as keyof typeof subProjectsByMain] || [] : []

  return (
    <div className="ml-64 min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">예산 수정 (지출 등록 및 관리)</h1>
        <p className="text-muted-foreground mt-2">지출 내역을 등록하거나 기존 내역을 조회/수정하세요</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>지출 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new" className="w-full">
            <TabsList>
              <TabsTrigger value="new">신규 지출 등록</TabsTrigger>
              <TabsTrigger value="edit">기존 내역 조회/수정</TabsTrigger>
            </TabsList>
            {/* New Expense Tab */}
            <TabsContent value="new" className="space-y-6 pt-6">
              <div className="space-y-6">
                {/* Main Project Select */}
                <div className="space-y-2">
                  <Label htmlFor="main-project">대사업 선택</Label>
                  <Select
                    value={mainProject}
                    onValueChange={(value) => {
                      setMainProject(value)
                      setSubProject("")
                    }}
                  >
                    <SelectTrigger id="main-project">
                      <SelectValue placeholder="대사업을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {mainProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sub Project Select */}
                <div className="space-y-2">
                  <Label htmlFor="sub-project">소사업 선택</Label>
                  <Select value={subProject} onValueChange={setSubProject} disabled={!mainProject}>
                    <SelectTrigger id="sub-project">
                      <SelectValue placeholder="소사업을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <Label>지출 날짜</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "날짜를 선택하세요"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">지출 내역 (항목)</Label>
                  <Input
                    id="description"
                    placeholder="예: 장비 구매, 여행비"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">지출 금액</Label>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-muted-foreground mr-2">₩</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm font-semibold text-muted-foreground ml-2">원</span>
                  </div>
                </div>

                {/* Remarks */}
                <div className="space-y-2">
                  <Label htmlFor="remarks">상세 내용 (비고)</Label>
                  <Textarea
                    id="remarks"
                    placeholder="추가 설명이 필요한 경우 입력하세요"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">출처 자료 첨부</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {file ? file.name : "파일을 드래그하거나 클릭하여 업로드하세요"}
                      </span>
                      <span className="text-xs text-muted-foreground">최대 10MB</span>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
                    초기화
                  </Button>
                  <Button onClick={handleSave} disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "등록중..." : "등록하기"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Existing Transactions Tab */}
            <TabsContent value="edit" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="filter-date">날짜 범위</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-card">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>날짜 선택</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-main">대사업</Label>
                  <Select value={filterMainProject} onValueChange={setFilterMainProject}>
                    <SelectTrigger id="filter-main" className="bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      {mainProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-sub">소사업</Label>
                  <Select value={filterSubProject} onValueChange={setFilterSubProject}>
                    <SelectTrigger id="filter-sub" className="bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Transactions Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>날짜</TableHead>
                    <TableHead>대사업</TableHead>
                    <TableHead>소사업</TableHead>
                    <TableHead>내역</TableHead>
                    <TableHead className="text-right">금액</TableHead>
                    <TableHead className="text-center">첨부파일</TableHead>
                    <TableHead className="text-center">수정</TableHead>
                    <TableHead className="text-center">삭제</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((trans) => (
                    <TableRow key={trans.id}>
                      <TableCell className="text-sm">{trans.date}</TableCell>
                      <TableCell className="text-sm">{trans.mainProject}</TableCell>
                      <TableCell className="text-sm">{trans.subProject}</TableCell>
                      <TableCell className="text-sm">{trans.description}</TableCell>
                      <TableCell className="text-right text-sm">₩{(trans.amount / 1000000).toFixed(1)}M</TableCell>
                      <TableCell className="text-center">
                        <a href="#" className="text-primary text-xs hover:underline">
                          {trans.attachment}
                        </a>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
