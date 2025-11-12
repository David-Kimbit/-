"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface SubProject {
  id: string
  name: string
  allocated: number
}

interface MainProjectData {
  id: string
  name: string
  subProjects: SubProject[]
}

const mockMainProjects: MainProjectData[] = [
  {
    id: "1",
    name: "Main Project A",
    subProjects: [
      { id: "1-1", name: "Sub-Project A-1", allocated: 50000000 },
      { id: "1-2", name: "Sub-Project A-2", allocated: 50000000 },
    ],
  },
  {
    id: "2",
    name: "Main Project B",
    subProjects: [
      { id: "2-1", name: "Sub-Project B-1", allocated: 75000000 },
      { id: "2-2", name: "Sub-Project B-2", allocated: 75000000 },
    ],
  },
  {
    id: "3",
    name: "Main Project C",
    subProjects: [
      { id: "3-1", name: "Sub-Project C-1", allocated: 40000000 },
      { id: "3-2", name: "Sub-Project C-2", allocated: 40000000 },
    ],
  },
  {
    id: "4",
    name: "Main Project D",
    subProjects: [
      { id: "4-1", name: "Sub-Project D-1", allocated: 40000000 },
      { id: "4-2", name: "Sub-Project D-2", allocated: 40000000 },
    ],
  },
  {
    id: "5",
    name: "Main Project E",
    subProjects: [
      { id: "5-1", name: "Sub-Project E-1", allocated: 40000000 },
      { id: "5-2", name: "Sub-Project E-2", allocated: 40000000 },
    ],
  },
  {
    id: "6",
    name: "Main Project F",
    subProjects: [
      { id: "6-1", name: "Sub-Project F-1", allocated: 40000000 },
      { id: "6-2", name: "Sub-Project F-2", allocated: 40000000 },
    ],
  },
  {
    id: "7",
    name: "Main Project G",
    subProjects: [
      { id: "7-1", name: "Sub-Project G-1", allocated: 40000000 },
      { id: "7-2", name: "Sub-Project G-2", allocated: 40000000 },
    ],
  },
  {
    id: "0",
    name: "Main Project Z",
    subProjects: [
      { id: "0-1", name: "Sub-Project Z-1", allocated: 40000000 },
      { id: "0-2", name: "Sub-Project Z-2", allocated: 40000000 },
    ],
  },
]

function formatKRW(amount: number): string {
  return `₩${(amount / 1000000).toFixed(1)}M`
}

export default function ProjectSettings() {
  const [projects, setProjects] = useState<MainProjectData[]>(mockMainProjects)
  const [selectedMainProject, setSelectedMainProject] = useState<string>("")

  const handleEditSubProject = (mainId: string, subId: string) => {
    alert(`Edit sub-project ${subId} under main project ${mainId}`)
  }

  const handleRemoveSubProject = (mainId: string, subId: string) => {
    setProjects(
      projects.map((main) =>
        main.id === mainId
          ? {
              ...main,
              subProjects: main.subProjects.filter((sub) => sub.id !== subId),
            }
          : main,
      ),
    )
  }

  const handleAddSubProject = (mainId: string) => {
    alert(`Add new sub-project to main project ${mainId}`)
  }

  const handleEditMainProject = (mainId: string) => {
    alert(`Edit main project ${mainId}`)
  }

  const handleDeleteMainProject = (mainId: string) => {
    setProjects(projects.filter((p) => p.id !== mainId))
  }

  const handleAddMainProject = () => {
    alert("Add new main project")
  }

  const currentMainProject = selectedMainProject ? projects.find((p) => p.id === selectedMainProject) : null

  return (
    <div className="ml-64 min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">프로젝트 세팅</h1>
        <p className="text-muted-foreground mt-2">대사업 및 소사업을 관리하세요</p>
      </div>

      <div className="space-y-8 max-w-6xl">
        {/* Main Project Management Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">대사업 관리</h2>
            <Button onClick={handleAddMainProject} className="gap-2">
              <Plus className="w-4 h-4" />
              신규 대사업 추가
            </Button>
          </div>

          {/* Main Projects List as Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">대사업명</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">수정</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">삭제</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground">{project.name}</td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditMainProject(project.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMainProject(project.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sub Project Management Section */}
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">소사업 관리</h2>

          {/* Main Project Select */}
          <div className="mb-6 max-w-xs">
            <Label htmlFor="main-project-select" className="mb-2 block">
              대사업 선택
            </Label>
            <Select value={selectedMainProject} onValueChange={setSelectedMainProject}>
              <SelectTrigger id="main-project-select">
                <SelectValue placeholder="대사업을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sub Projects for Selected Main Project */}
          {currentMainProject && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{currentMainProject.name} - 소사업 목록</CardTitle>
                  <CardDescription>{currentMainProject.subProjects.length}개의 소사업</CardDescription>
                </div>
                <Button onClick={() => handleAddSubProject(currentMainProject.id)} className="gap-2" size="sm">
                  <Plus className="w-4 h-4" />
                  소사업 추가
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">소사업명</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">할당 예산</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">수정</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">삭제</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {currentMainProject.subProjects.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-sm text-muted-foreground">
                            등록된 소사업이 없습니다
                          </td>
                        </tr>
                      ) : (
                        currentMainProject.subProjects.map((subProject) => (
                          <tr key={subProject.id} className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 text-sm text-foreground">{subProject.name}</td>
                            <td className="px-6 py-4 text-right text-sm text-foreground">
                              {formatKRW(subProject.allocated)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditSubProject(currentMainProject.id, subProject.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Pencil className="w-4 h-4 text-muted-foreground" />
                              </Button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveSubProject(currentMainProject.id, subProject.id)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {!currentMainProject && (
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">대사업을 선택하여 소사업을 관리하세요</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
