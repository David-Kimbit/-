"use client"

import { LayoutDashboard, PencilIcon, Settings } from "lucide-react"

interface SidebarProps {
  activePage: string
  onPageChange: (page: string) => void
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
    { id: "expense", label: "예산 수정", icon: PencilIcon },
    { id: "settings", label: "프로젝트 세팅", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col fixed left-0 top-0 h-screen">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">RISE사업단 예산 관리</h1>
        <p className="text-xs text-muted-foreground mt-2">한국폴리텍IV대학 대전캠퍼스</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
