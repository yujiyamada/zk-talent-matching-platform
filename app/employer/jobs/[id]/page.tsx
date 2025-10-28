"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, Shield, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Applicant {
  id: string
  zkResult: "pass" | "fail"
  summaryBadges: number
  appliedAt: string
  status: "pending" | "approved" | "rejected"
}

export default function JobDetailPage() {
  const params = useParams()
  const { toast } = useToast()

  const [job] = useState({
    id: params.id,
    title: "Solana Engineer",
    description: "Looking for experienced Anchor developer to build DeFi protocols",
    requiredSkills: ["Rust", "Anchor", "Solana"],
    minYears: 2,
    minBadges: 1,
    salaryMin: 70000,
    salaryMax: 120000,
    status: "open",
  })

  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: "app1",
      zkResult: "pass",
      summaryBadges: 3,
      appliedAt: "2024-01-15",
      status: "pending",
    },
    {
      id: "app2",
      zkResult: "pass",
      summaryBadges: 2,
      appliedAt: "2024-01-18",
      status: "approved",
    },
    {
      id: "app3",
      zkResult: "fail",
      summaryBadges: 1,
      appliedAt: "2024-01-20",
      status: "pending",
    },
    {
      id: "app4",
      zkResult: "pass",
      summaryBadges: 4,
      appliedAt: "2024-01-22",
      status: "pending",
    },
  ])

  const handleApprove = (applicantId: string) => {
    setApplicants(applicants.map((app) => (app.id === applicantId ? { ...app, status: "approved" as const } : app)))
    toast({
      title: "Match Approved",
      description: "The candidate has been notified. You can now start a conversation.",
    })
  }

  const handleReject = (applicantId: string) => {
    setApplicants(applicants.map((app) => (app.id === applicantId ? { ...app, status: "rejected" as const } : app)))
    toast({
      title: "Application Rejected",
      description: "The candidate has been notified.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/employer/jobs">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{job.title}</h1>
          <p className="text-muted-foreground">{job.description}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Job Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Experience</span>
                    <span className="font-medium">{job.minYears} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Credentials</span>
                    <span className="font-medium">{job.minBadges} verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary Range</span>
                    <span className="font-medium">
                      ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Applicants ({applicants.length})</CardTitle>
                <CardDescription>
                  Review anonymous verification results and approve matches. Personal information is hidden until you
                  approve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicants.map((applicant, index) => (
                    <div key={applicant.id} className="rounded-lg border border-border p-4">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              applicant.zkResult === "pass"
                                ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
                                : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
                            }`}
                          >
                            {applicant.zkResult === "pass" ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <XCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">Candidate #{index + 1}</h3>
                            <p className="text-sm text-muted-foreground">
                              Applied on {new Date(applicant.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {applicant.status === "approved" && <Badge className="bg-green-600">Approved</Badge>}
                        {applicant.status === "rejected" && <Badge variant="destructive">Rejected</Badge>}
                      </div>

                      <div className="mb-4 space-y-2 rounded-lg bg-muted/50 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">ZK Proof Verification</span>
                          <Badge variant={applicant.zkResult === "pass" ? "default" : "destructive"}>
                            {applicant.zkResult === "pass" ? "PASS" : "FAIL"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Verified Credentials</span>
                          <span className="flex items-center gap-1 font-medium">
                            <Shield className="h-3 w-3" />
                            {applicant.summaryBadges}
                          </span>
                        </div>
                      </div>

                      {applicant.zkResult === "pass" && (
                        <p className="mb-4 text-sm text-muted-foreground">
                          This candidate meets all requirements. Approve to start communication.
                        </p>
                      )}

                      {applicant.zkResult === "fail" && (
                        <p className="mb-4 text-sm text-muted-foreground">
                          This candidate does not meet the minimum requirements.
                        </p>
                      )}

                      <div className="flex gap-2">
                        {applicant.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(applicant.id)}
                              disabled={applicant.zkResult === "fail"}
                              className="gap-2"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve Match
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(applicant.id)}
                              className="gap-2 bg-transparent"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                        {applicant.status === "approved" && (
                          <Link href={`/employer/chat/${applicant.id}`}>
                            <Button size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Open Chat
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
