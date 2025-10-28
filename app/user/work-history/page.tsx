"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Briefcase, Calendar, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  description: string
  skills: string[]
  current: boolean
}

export default function WorkHistoryPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      company: "Tech Startup Inc.",
      position: "Senior Blockchain Developer",
      startDate: "2022-01",
      endDate: null,
      current: true,
      description:
        "Leading development of DeFi protocols on Solana. Built smart contracts using Anchor framework and integrated with frontend applications.",
      skills: ["Solidity", "Rust", "Anchor", "Web3"],
    },
    {
      id: "2",
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description: "Developed web applications using React and Node.js. Implemented RESTful APIs and database design.",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    },
  ])

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  })

  const handleAddExperience = () => {
    if (!formData.company || !formData.position || !formData.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: formData.company,
      position: formData.position,
      startDate: formData.startDate,
      endDate: formData.current ? null : formData.endDate,
      current: formData.current,
      description: formData.description,
      skills: [],
    }

    setExperiences([newExperience, ...experiences])
    setIsDialogOpen(false)
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    })

    toast({
      title: "Experience Added",
      description: "Your work history has been updated",
    })
  }

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
    toast({
      title: "Experience Removed",
      description: "Work history entry has been deleted",
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Work History</h1>
          <p className="text-muted-foreground">Manage your professional experience and employment history</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Work Experience</DialogTitle>
              <DialogDescription>Add a new position to your work history</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Tech Startup Inc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g., Senior Developer"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="current"
                      checked={formData.current}
                      onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="current" className="cursor-pointer text-sm font-normal">
                      I currently work here
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExperience}>Add Experience</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-4 text-muted-foreground">No work experience added yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>Add Your First Experience</Button>
            </CardContent>
          </Card>
        ) : (
          experiences.map((exp) => (
            <Card key={exp.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="mb-1">{exp.position}</CardTitle>
                      <CardDescription className="mb-2 text-base">{exp.company}</CardDescription>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate!)}
                        </span>
                        {exp.current && <Badge className="bg-green-600">Current</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(exp.id)}
                      className="bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                {exp.skills.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Skills Used:</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
