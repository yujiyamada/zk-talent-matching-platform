"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, CheckCircle, XCircle, TrendingUp, FileCheck, AlertCircle } from "lucide-react"

export default function ApproverDashboardPage() {
  const stats = [
    { label: "Pending Reviews", value: "12", icon: Clock, color: "text-yellow-600" },
    { label: "Approved Today", value: "8", icon: CheckCircle, color: "text-green-600" },
    { label: "Total Reviewed", value: "156", icon: FileCheck, color: "text-blue-600" },
    { label: "Approval Rate", value: "87%", icon: TrendingUp, color: "text-purple-600" },
  ]

  const recentReviews = [
    {
      id: "1",
      candidateName: "Alice Johnson",
      credentialType: "GITHUB",
      status: "approved",
      reviewedAt: "2 hours ago",
    },
    {
      id: "2",
      candidateName: "Bob Smith",
      credentialType: "CERT",
      status: "approved",
      reviewedAt: "4 hours ago",
    },
    {
      id: "3",
      candidateName: "Carol White",
      credentialType: "TEST",
      status: "rejected",
      reviewedAt: "1 day ago",
    },
  ]

  const urgentReviews = [
    {
      id: "apr1",
      candidateName: "David Brown",
      credentialType: "CERT",
      submittedAt: "3 days ago",
      priority: "high",
    },
    {
      id: "apr2",
      candidateName: "Eve Davis",
      credentialType: "GITHUB",
      submittedAt: "2 days ago",
      priority: "medium",
    },
  ]

  const getCredentialBadge = (type: string) => {
    const colors: Record<string, string> = {
      CERT: "bg-blue-600",
      GITHUB: "bg-purple-600",
      TEST: "bg-green-600",
    }
    return <Badge className={colors[type]}>{type}</Badge>
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Approver Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your review overview</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Urgent Reviews */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Urgent Reviews
                </CardTitle>
                <CardDescription>Credentials waiting for more than 2 days</CardDescription>
              </div>
              <Link href="/approver/queue">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-900 dark:bg-orange-950/20"
                >
                  <AlertCircle className="mt-1 h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="font-medium">{review.candidateName}</p>
                    <p className="text-sm text-muted-foreground">Submitted {review.submittedAt}</p>
                  </div>
                  {getCredentialBadge(review.credentialType)}
                </div>
              ))}
              <Link href="/approver/queue">
                <Button className="w-full">Review Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>Your latest review decisions</CardDescription>
              </div>
              <Link href="/approver/history">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View History
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="mt-1">
                    {review.status === "approved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {review.status === "rejected" && <XCircle className="h-5 w-5 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{review.candidateName}</p>
                    <p className="text-sm text-muted-foreground">{review.reviewedAt}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getCredentialBadge(review.credentialType)}
                    <Badge variant={review.status === "approved" ? "default" : "destructive"} className="text-xs">
                      {review.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/approver/queue">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Clock className="h-4 w-4" />
                Review Pending
              </Button>
            </Link>
            <Link href="/approver/history">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <FileCheck className="h-4 w-4" />
                View History
              </Button>
            </Link>
            <Link href="/approver/queue">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <AlertCircle className="h-4 w-4" />
                Urgent Reviews
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
