"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Clock, CheckCircle, XCircle, MessageSquare, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  minYears?: number
  salaryMin?: number
  salaryMax?: number
  status: "open" | "closed"
}

interface Application {
  id: string
  jobId: string
  jobTitle: string
  status: "pending" | "matched" | "rejected"
  appliedAt: string
  matchId?: string
}

export default function ApplicationsPage() {
  const { toast } = useToast()
  const [isApplying, setIsApplying] = useState<string | null>(null)

  const [openJobs] = useState<Job[]>([
    {
      id: "j1",
      title: "Solana Engineer",
      description: "Looking for experienced Anchor developer",
      requiredSkills: ["Rust", "Anchor", "Solana"],
      minYears: 2,
      salaryMin: 70000,
      salaryMax: 120000,
      status: "open",
    },
    {
      id: "j2",
      title: "Full Stack TypeScript Developer",
      description: "Next.js and React expertise required",
      requiredSkills: ["TypeScript", "Next.js", "React"],
      minYears: 3,
      salaryMin: 60000,
      salaryMax: 100000,
      status: "open",
    },
    {
      id: "j3",
      title: "Smart Contract Developer",
      description: "Build and audit DeFi protocols",
      requiredSkills: ["Solidity", "Ethereum", "Web3"],
      minYears: 2,
      salaryMin: 80000,
      salaryMax: 140000,
      status: "open",
    },
  ])

  const [applications, setApplications] = useState<Application[]>([
    {
      id: "a1",
      jobId: "j2",
      jobTitle: "Full Stack TypeScript Developer",
      status: "matched",
      appliedAt: "2024-01-15",
      matchId: "m1",
    },
    {
      id: "a2",
      jobId: "j1",
      jobTitle: "Solana Engineer",
      status: "pending",
      appliedAt: "2024-01-20",
    },
  ])

  const handleApply = async (job: Job) => {
    setIsApplying(job.id)

    // Mock ZK proof verification
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const matched = Math.random() > 0.3 // 70% success rate for demo

    const newApplication: Application = {
      id: `a${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      status: matched ? "matched" : "pending",
      appliedAt: new Date().toISOString().split("T")[0],
      matchId: matched ? `m${Date.now()}` : undefined,
    }

    setApplications([...applications, newApplication])
    setIsApplying(null)

    toast({
      title: matched ? "Match Successful!" : "Application Submitted",
      description: matched
        ? "Your credentials match the requirements. You can now chat with the employer."
        : "Your application is being reviewed. ZK proof verification in progress.",
    })
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "matched":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "matched":
        return <Badge className="bg-green-600">Matched</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground">Browse open positions and apply using your verified credentials</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications ({applications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            {openJobs.map((job) => {
              const hasApplied = applications.some((app) => app.jobId === job.id)
              const isCurrentlyApplying = isApplying === job.id

              return (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{job.title}</CardTitle>
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

                      {job.minYears && (
                        <p className="text-sm text-muted-foreground">
                          Minimum {job.minYears} years of experience required
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleApply(job)}
                          disabled={hasApplied || isCurrentlyApplying}
                          className="gap-2"
                        >
                          {isCurrentlyApplying && <Loader2 className="h-4 w-4 animate-spin" />}
                          {hasApplied
                            ? "Already Applied"
                            : isCurrentlyApplying
                              ? "Verifying..."
                              : "Apply with ZK Proof"}
                        </Button>
                        {hasApplied && (
                          <span className="text-sm text-muted-foreground">Check "My Applications" tab</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {applications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">No applications yet</p>
                  <p className="mb-4 text-sm text-muted-foreground">Browse jobs and apply to get started</p>
                  <Button onClick={() => document.querySelector('[value="browse"]')?.dispatchEvent(new Event("click"))}>
                    Browse Jobs
                  </Button>
                </CardContent>
              </Card>
            ) : (
              applications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(app.status)}
                        <div>
                          <CardTitle className="mb-1">{app.jobTitle}</CardTitle>
                          <CardDescription>Applied on {new Date(app.appliedAt).toLocaleDateString()}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {app.status === "matched" && app.matchId && (
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                          Congratulations! Your credentials match the requirements.
                        </p>
                        <Button size="sm" className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Start Chat
                        </Button>
                      </div>
                    )}
                    {app.status === "pending" && (
                      <p className="text-sm text-muted-foreground">
                        ZK proof verification in progress. The employer will review your anonymous credentials.
                      </p>
                    )}
                    {app.status === "rejected" && (
                      <p className="text-sm text-muted-foreground">
                        Your credentials did not meet the minimum requirements for this position.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
