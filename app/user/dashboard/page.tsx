"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Briefcase, Shield, Search, Users, TrendingUp, Clock, CheckCircle } from "lucide-react"

export default function UserDashboardPage() {
  const stats = [
    { label: "Active Applications", value: "3", icon: Briefcase, color: "text-blue-600" },
    { label: "Verified Credentials", value: "5", icon: Shield, color: "text-purple-600" },
    { label: "Profile Views", value: "24", icon: Users, color: "text-green-600" },
    { label: "Match Rate", value: "78%", icon: TrendingUp, color: "text-orange-600" },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "application",
      title: "Applied to Solana Engineer",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      type: "match",
      title: "Matched with Full Stack Developer",
      time: "1 day ago",
      status: "matched",
    },
    {
      id: "3",
      type: "credential",
      title: "AWS Certificate Verified",
      time: "3 days ago",
      status: "approved",
    },
  ]

  const recommendedJobs = [
    {
      id: "j1",
      title: "Senior Blockchain Developer",
      company: "Anonymous Company",
      match: 92,
      skills: ["Solidity", "Web3", "React"],
    },
    {
      id: "j2",
      title: "Full Stack Engineer",
      company: "Anonymous Company",
      match: 85,
      skills: ["TypeScript", "Next.js", "Node.js"],
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Candidate Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your activity overview</p>
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
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="mt-1">
                    {activity.status === "pending" && <Clock className="h-5 w-5 text-yellow-600" />}
                    {activity.status === "matched" && <Users className="h-5 w-5 text-green-600" />}
                    {activity.status === "approved" && <CheckCircle className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge
                    variant={activity.status === "matched" ? "default" : "secondary"}
                    className={activity.status === "pending" ? "bg-yellow-600" : ""}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recommended Jobs</CardTitle>
                <CardDescription>Based on your skills and preferences</CardDescription>
              </div>
              <Link href="/user/job-search">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="rounded-lg border border-border p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge className="bg-green-600">{job.match}% Match</Badge>
                  </div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/user/job-search?job=${job.id}`}>
                    <Button size="sm" className="w-full">
                      View Details
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
            <Link href="/user/work-history">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Briefcase className="h-4 w-4" />
                Update Work History
              </Button>
            </Link>
            <Link href="/user/credentials">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Shield className="h-4 w-4" />
                Add Credential
              </Button>
            </Link>
            <Link href="/user/job-search">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Search className="h-4 w-4" />
                Search Jobs
              </Button>
            </Link>
            <Link href="/user/matching">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Users className="h-4 w-4" />
                View Matches
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
