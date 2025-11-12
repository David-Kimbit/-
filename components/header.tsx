"use client"

import { Search, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-8 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search here..." className="pl-10 bg-muted border-border" />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <User className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  )
}
