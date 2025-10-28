"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TagInput } from "@/components/tag-input"
import { Switch } from "@/components/ui/switch"
import { Plus, Eye, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  minYears?: number
  minBadges?: number
  salaryMin?: number
  salaryMax?: number
  status: "draft" | "open" | "closed"
  applicants: number
}

export default function EmployerJobsPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "j1",
      title: "Solana Engineer",
      description: "Looking for experienced Anchor developer to build DeFi protocols",
      requiredSkills: ["Rust", "Anchor", "Solana"],
      minYears: 2,
      minBadges: 1,
      salaryMin: 70000,
      salaryMax: 120000,
      status: "open",
      applicants: 5,
    },
    {
      id: "j2",
      title: "Full Stack TypeScript Developer",
      description: "Next.js and React expertise required for building web3 applications",
      requiredSkills: ["TypeScript", "Next.js", "React"],
      minYears: 3,
      salaryMin: 60000,
      salaryMax: 100000,
      status: "open",
      applicants: 12,
    },
    {
      id: "j3",
      title: "Backend Engineer",
      description: "Draft position for backend development",
      requiredSkills: ["Node.js", "PostgreSQL"],
      minYears: 2,
      status: "draft",
      applicants: 0,
    },
  ])

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requiredSkills: [] as string[],
    minYears: "",
    minBadges: "",
    salaryMin: "",
    salaryMax: "",
    status: "draft" as "draft" | "open",
  })

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.description || newJob.requiredSkills.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const job: Job = {
      id: `j${Date.now()}`,
      title: newJob.title,
      description: newJob.description,
      requiredSkills: newJob.requiredSkills,
      minYears: newJob.minYears ? Number.parseInt(newJob.minYears) : undefined,
      minBadges: newJob.minBadges ? Number.parseInt(newJob.minBadges) : undefined,
      salaryMin: newJob.salaryMin ? Number.parseInt(newJob.salaryMin) : undefined,
      salaryMax: newJob.salaryMax ? Number.parseInt(newJob.salaryMax) : undefined,
      status: newJob.status,
      applicants: 0,
    }

    setJobs([...jobs, job])
    setIsDialogOpen(false)
    setNewJob({
      title: "",
      description: "",
      requiredSkills: [],
      minYears: "",
      minBadges: "",
      salaryMin: "",
      salaryMax: "",
      status: "draft",
    })

    toast({
      title: "Job Created",
      description: `${job.title} has been ${job.status === "open" ? "published" : "saved as draft"}`,
    })
  }

  const getStatusBadge = (status: Job["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-600">Open</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "closed":
        return <Badge variant="outline">Closed</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Job Postings</h1>
            <p className="text-muted-foreground">Create and manage your job openings</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>Define the requirements and criteria for your position</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g., Senior Solana Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    placeholder="Describe the role and responsibilities..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Required Skills *</Label>
                  <TagInput
                    tags={newJob.requiredSkills}
                    onChange={(skills) => setNewJob({ ...newJob, requiredSkills: skills })}
                    placeholder="Type a skill and press Enter"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="minYears">Minimum Years of Experience</Label>
                    <Input
                      id="minYears"
                      type="number"
                      value={newJob.minYears}
                      onChange={(e) => setNewJob({ ...newJob, minYears: e.target.value })}
                      placeholder="e.g., 3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minBadges">Minimum Verified Credentials</Label>
                    <Input
                      id="minBadges"
                      type="number"
                      value={newJob.minBadges}
                      onChange={(e) => setNewJob({ ...newJob, minBadges: e.target.value })}
                      placeholder="e.g., 1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">Minimum Salary (USD)</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      value={newJob.salaryMin}
                      onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })}
                      placeholder="60000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">Maximum Salary (USD)</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      value={newJob.salaryMax}
                      onChange={(e) => setNewJob({ ...newJob, salaryMax: e.target.value })}
                      placeholder="100000"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="publish">Publish Immediately</Label>
                    <p className="text-sm text-muted-foreground">Make this job visible to candidates</p>
                  </div>
                  <Switch
                    id="publish"
                    checked={newJob.status === "open"}
                    onCheckedChange={(checked) => setNewJob({ ...newJob, status: checked ? "open" : "draft" })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateJob}>Create Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <p className="mb-4 text-muted-foreground">No job postings yet</p>
                <Button onClick={() => setIsDialogOpen(true)}>Create Your First Job</Button>
              </CardContent>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <CardTitle>{job.title}</CardTitle>
                        {getStatusBadge(job.status)}
                      </div>
                      <CardDescription>{job.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      {job.salaryMin && job.salaryMax && (
                        <p className="text-sm font-semibold text-primary">
                          ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      {job.minYears && <span>Min. {job.minYears} years experience</span>}
                      {job.minBadges && <span>Min. {job.minBadges} verified credentials</span>}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{job.applicants}</span>
                        <span className="text-muted-foreground">applicants</span>
                      </div>

                      <Link href={`/employer/jobs/${job.id}`}>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
