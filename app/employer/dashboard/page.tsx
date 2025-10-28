"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Briefcase, Users, Eye, Clock, CheckCircle, MessageSquare } from "lucide-react"

export default function EmployerDashboardPage() {
  const stats = [
    { label: "Active Jobs", value: "5", icon: Briefcase, color: "text-blue-600" },
    { label: "Total Applicants", value: "42", icon: Users, color: "text-purple-600" },
    { label: "Active Matches", value: "8", icon: CheckCircle, color: "text-green-600" },
    { label: "Profile Views", value: "156", icon: Eye, color: "text-orange-600" },
  ]

  const recentApplications = [
    {
      id: "1",
      jobTitle: "Solana Engineer",
      candidateId: "Candidate #12",
      matchScore: 92,
      appliedAt: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      jobTitle: "Full Stack Developer",
      candidateId: "Candidate #8",
      matchScore: 88,
      appliedAt: "5 hours ago",
      status: "approved",
    },
    {
      id: "3",
      jobTitle: "Smart Contract Developer",
      candidateId: "Candidate #15",
      matchScore: 85,
      appliedAt: "1 day ago",
      status: "pending",
    },
  ]

  const activeJobs = [
    {
      id: "j1",
      title: "Solana Engineer",
      applicants: 12,
      matches: 3,
      postedAt: "2024-01-15",
    },
    {
      id: "j2",
      title: "Full Stack Developer",
      applicants: 18,
      matches: 5,
      postedAt: "2024-01-10",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Company Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your recruitment overview</p>
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
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest candidates who applied</CardDescription>
              </div>
              <Link href="/employer/candidates">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="mt-1">
                    {app.status === "pending" && <Clock className="h-5 w-5 text-yellow-600" />}
                    {app.status === "approved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{app.candidateId}</p>
                    <p className="text-sm text-muted-foreground">{app.jobTitle}</p>
                    <p className="text-xs text-muted-foreground">{app.appliedAt}</p>
                  </div>
                  <Badge className="bg-purple-600">{app.matchScore}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Job Postings</CardTitle>
                <CardDescription>Your current open positions</CardDescription>
              </div>
              <Link href="/employer/jobs">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Manage
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="rounded-lg border border-border p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Posted {new Date(job.postedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Applicants: </span>
                      <span className="font-medium">{job.applicants}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Matches: </span>
                      <span className="font-medium">{job.matches}</span>
                    </div>
                  </div>
                  <Link href={`/employer/jobs/${job.id}`}>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      View Applicants
                    </Button>
                  </Link>
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
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/employer/jobs">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Briefcase className="h-4 w-4" />
                Post New Job
              </Button>
            </Link>
            <Link href="/employer/candidates">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Users className="h-4 w-4" />
                Search Candidates
              </Button>
            </Link>
            <Link href="/employer/matching">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <CheckCircle className="h-4 w-4" />
                View Matches
              </Button>
            </Link>
            <Link href="/employer/matching">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <MessageSquare className="h-4 w-4" />
                Active Chats
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
