"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react"

interface Approval {
  id: string
  userId: string
  userDisplayName: string
  target: "CERT" | "GITHUB" | "TEST"
  evidenceUrl: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
}

export default function ApproverQueuePage() {
  const [approvals] = useState<Approval[]>([
    {
      id: "apr1",
      userId: "user1",
      userDisplayName: "Alice Johnson",
      target: "GITHUB",
      evidenceUrl: "https://github.com/alice",
      submittedAt: "2024-01-20T10:00:00",
      status: "pending",
    },
    {
      id: "apr2",
      userId: "user2",
      userDisplayName: "Bob Smith",
      target: "CERT",
      evidenceUrl: "https://example.com/cert/aws-123",
      submittedAt: "2024-01-21T14:30:00",
      status: "pending",
    },
    {
      id: "apr3",
      userId: "user3",
      userDisplayName: "Carol White",
      target: "TEST",
      evidenceUrl: "https://example.com/test-results/456",
      submittedAt: "2024-01-22T09:15:00",
      status: "pending",
    },
    {
      id: "apr4",
      userId: "user4",
      userDisplayName: "David Brown",
      target: "GITHUB",
      evidenceUrl: "https://github.com/davidb",
      submittedAt: "2024-01-18T16:00:00",
      status: "approved",
    },
    {
      id: "apr5",
      userId: "user5",
      userDisplayName: "Eve Davis",
      target: "CERT",
      evidenceUrl: "https://example.com/cert/invalid",
      submittedAt: "2024-01-19T11:00:00",
      status: "rejected",
    },
  ])

  const pendingApprovals = approvals.filter((a) => a.status === "pending")
  const reviewedApprovals = approvals.filter((a) => a.status !== "pending")

  const getTargetBadge = (target: Approval["target"]) => {
    const colors = {
      CERT: "bg-blue-600",
      GITHUB: "bg-purple-600",
      TEST: "bg-green-600",
    }
    return <Badge className={colors[target]}>{target}</Badge>
  }

  const getStatusIcon = (status: Approval["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Approval Queue</h1>
          <p className="text-muted-foreground">Review and verify candidate credentials and skill claims</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingApprovals.length})</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed ({reviewedApprovals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingApprovals.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <CheckCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">All caught up!</p>
                  <p className="text-sm text-muted-foreground">No pending approvals at the moment</p>
                </CardContent>
              </Card>
            ) : (
              pendingApprovals.map((approval) => (
                <Card key={approval.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(approval.status)}
                        <div>
                          <CardTitle className="mb-1">{approval.userDisplayName}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Submitted {new Date(approval.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {getTargetBadge(approval.target)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-border bg-muted/50 p-4">
                        <p className="mb-2 text-sm font-medium">Evidence URL</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 rounded bg-background px-2 py-1 text-xs">{approval.evidenceUrl}</code>
                          <a href={approval.evidenceUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <ExternalLink className="h-3 w-3" />
                              Open
                            </Button>
                          </a>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link href={`/approver/review/${approval.id}`}>
                          <Button>Review Application</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="reviewed" className="space-y-4">
            {reviewedApprovals.map((approval) => (
              <Card key={approval.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(approval.status)}
                      <div>
                        <CardTitle className="mb-1">{approval.userDisplayName}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Submitted {new Date(approval.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTargetBadge(approval.target)}
                      <Badge variant={approval.status === "approved" ? "default" : "destructive"}>
                        {approval.status === "approved" ? "Approved" : "Rejected"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="mb-2 text-sm font-medium">Evidence URL</p>
                    <code className="rounded bg-background px-2 py-1 text-xs">{approval.evidenceUrl}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
