"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface AdvancedFilterModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Filters {
  experienceLevel: string[]
  salary: string[]
  workArrangement: string[]
}

export default function AdvancedFilterModal({ isOpen, onClose }: AdvancedFilterModalProps) {
  const [filters, setFilters] = useState<Filters>({
    experienceLevel: [],
    salary: [],
    workArrangement: [],
  })

  const handleExperienceChange = (value: string) => {
    if (filters.experienceLevel.includes(value)) {
      setFilters({
        ...filters,
        experienceLevel: filters.experienceLevel.filter((item) => item !== value),
      })
    } else {
      setFilters({
        ...filters,
        experienceLevel: [...filters.experienceLevel, value],
      })
    }
  }

  const handleSalaryChange = (value: string) => {
    if (filters.salary.includes(value)) {
      setFilters({
        ...filters,
        salary: filters.salary.filter((item) => item !== value),
      })
    } else {
      setFilters({
        ...filters,
        salary: [...filters.salary, value],
      })
    }
  }

  const handleWorkArrangementChange = (value: string) => {
    if (filters.workArrangement.includes(value)) {
      setFilters({
        ...filters,
        workArrangement: filters.workArrangement.filter((item) => item !== value),
      })
    } else {
      setFilters({
        ...filters,
        workArrangement: [...filters.workArrangement, value],
      })
    }
  }

  const handleReset = () => {
    setFilters({
      experienceLevel: [],
      salary: [],
      workArrangement: [],
    })
  }

  const handleApply = () => {
    // Apply filters logic here
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 bg-white">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Advanced Filters</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Experience Level */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Experience Level</h3>
            <div className="space-y-3">
              {["Entry Level (0-2 years)", "Mid Level (2-5 years)", "Senior Level (5+ years)", "Lead Level (7+ years)"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exp-${level}`}
                    checked={filters.experienceLevel.includes(level)}
                    onCheckedChange={() => handleExperienceChange(level)}
                    className="rounded-sm"
                  />
                  <Label htmlFor={`exp-${level}`} className="text-sm text-gray-600">{level}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Salary</h3>
            <div className="space-y-3">
              {["$0 - $50,000", "$50,000 - $100,000", "$100,000 - $150,000", "$150,000 +"].map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox
                    id={`salary-${range}`}
                    checked={filters.salary.includes(range)}
                    onCheckedChange={() => handleSalaryChange(range)}
                    className="rounded-sm"
                  />
                  <Label htmlFor={`salary-${range}`} className="text-sm text-gray-600">{range}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Work Arrangement */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Work Arrangement</h3>
            <div className="space-y-3">
              {["Remote", "Hybrid", "On-site"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`work-${type}`}
                    checked={filters.workArrangement.includes(type)}
                    onCheckedChange={() => handleWorkArrangementChange(type)}
                    className="rounded-sm"
                  />
                  <Label htmlFor={`work-${type}`} className="text-sm text-gray-600">{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50">
          <div className="flex justify-between w-full">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-gray-600"
            >
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

