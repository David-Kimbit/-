"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface ExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mainProjects = [
  { id: "1", name: "Main Project A" },
  { id: "2", name: "Main Project B" },
  { id: "3", name: "Main Project C" },
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

export default function ExpenseModal({ open, onOpenChange }: ExpenseModalProps) {
  const [mainProject, setMainProject] = useState("")
  const [subProject, setSubProject] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReset = () => {
    setMainProject("")
    setSubProject("")
    setDate(new Date())
    setDescription("")
    setAmount("")
  }

  const handleSave = async () => {
    if (!mainProject || !subProject || !date || !description || !amount) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log({
        mainProject,
        subProject,
        date,
        description,
        amount: Number.parseFloat(amount),
      })
      handleReset()
      onOpenChange(false)
      alert("Expense logged successfully!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSubProjects = mainProject ? subProjectsByMain[mainProject as keyof typeof subProjectsByMain] || [] : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log New Expense</DialogTitle>
          <DialogDescription>Record a new expense transaction for your grant budget</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Main Project Select */}
          <div className="space-y-2">
            <Label htmlFor="main-project">Main Project</Label>
            <Select
              value={mainProject}
              onValueChange={(value) => {
                setMainProject(value)
                setSubProject("")
              }}
            >
              <SelectTrigger id="main-project">
                <SelectValue placeholder="Select a main project" />
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
            <Label htmlFor="sub-project">Sub-Project</Label>
            <Select value={subProject} onValueChange={setSubProject} disabled={!mainProject}>
              <SelectTrigger id="sub-project">
                <SelectValue placeholder="Select a sub-project" />
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
            <Label>Expense Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g., Equipment purchase, Travel expense"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
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
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              handleReset()
              onOpenChange(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
