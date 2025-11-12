"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import ExpenseEntryPage from "@/components/expense-entry-page"
import ProjectSettings from "@/components/project-settings"

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <Header />

      <main className="flex-1 overflow-auto pt-16">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "expense" && <ExpenseEntryPage />}
        {activePage === "settings" && <ProjectSettings />}
      </main>
    </div>
  )
}
