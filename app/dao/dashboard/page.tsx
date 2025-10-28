"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { FileText, Users, TrendingUp, CheckCircle, Clock, ThumbsUp } from "lucide-react"

export default function DaoDashboardPage() {
  const stats = [
    { label: "Active Proposals", value: "8", icon: FileText, color: "text-blue-600" },
    { label: "Total Members", value: "1,247", icon: Users, color: "text-purple-600" },
    { label: "Your Votes", value: "23", icon: ThumbsUp, color: "text-green-600" },
    { label: "Participation Rate", value: "76%", icon: TrendingUp, color: "text-orange-600" },
  ]

  const activeProposals = [
    {
      id: "p1",
      title: "Add New Credential Type: Bootcamp Certificates",
      status: "active",
      forVotes: 203,
      againstVotes: 89,
      deadline: "2024-02-10T23:59:59",
      hasVoted: false,
    },
    {
      id: "p2",
      title: "Reduce Minimum Experience Requirement",
      status: "active",
      forVotes: 156,
      againstVotes: 124,
      deadline: "2024-02-08T23:59:59",
      hasVoted: true,
    },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "proposal",
      title: "New proposal created: Update Fee Structure",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "vote",
      title: "You voted on: Add New Credential Type",
      time: "1 day ago",
    },
    {
      id: "3",
      type: "passed",
      title: "Proposal passed: Increase Approver Rewards",
      time: "3 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">DAO Dashboard</h1>
        <p className="text-muted-foreground">Participate in platform governance and decision-making</p>
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
        {/* Active Proposals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Proposals</CardTitle>
                <CardDescription>Proposals currently open for voting</CardDescription>
              </div>
              <Link href="/dao/proposals">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProposals.map((proposal) => {
                const totalVotes = proposal.forVotes + proposal.againstVotes
                const forPercentage = (proposal.forVotes / totalVotes) * 100
                const daysLeft = Math.ceil(
                  (new Date(proposal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <div key={proposal.id} className="rounded-lg border border-border p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="font-semibold leading-tight">{proposal.title}</h3>
                      {proposal.hasVoted && (
                        <Badge variant="outline" className="ml-2 shrink-0">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Voted
                        </Badge>
                      )}
                    </div>
                    <div className="mb-2">
                      <Progress value={forPercentage} className="h-2" />
                    </div>
                    <div className="mb-3 flex justify-between text-xs text-muted-foreground">
                      <span>
                        {proposal.forVotes} For / {proposal.againstVotes} Against
                      </span>
                      <span>{daysLeft} days left</span>
                    </div>
                    <Link href={`/dao/proposals/${proposal.id}`}>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        {proposal.hasVoted ? "View Details" : "Vote Now"}
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest DAO updates and your actions</CardDescription>
              </div>
              <Link href="/dao/voting-history">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View History
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="mt-1">
                    {activity.type === "proposal" && <FileText className="h-5 w-5 text-blue-600" />}
                    {activity.type === "vote" && <ThumbsUp className="h-5 w-5 text-purple-600" />}
                    {activity.type === "passed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
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
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/dao/new-proposal">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                Create Proposal
              </Button>
            </Link>
            <Link href="/dao/proposals">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Clock className="h-4 w-4" />
                Active Votes
              </Button>
            </Link>
            <Link href="/dao/voting-history">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <CheckCircle className="h-4 w-4" />
                Your Votes
              </Button>
            </Link>
            <Link href="/dao/proposals">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Users className="h-4 w-4" />
                Community
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
