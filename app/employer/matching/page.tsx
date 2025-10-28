"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, Clock, XCircle, Briefcase } from "lucide-react"
import Link from "next/link"

interface Match {
  id: string
  candidateId: string
  jobTitle: string
  matchScore: number
  status: "pending" | "active" | "closed"
  matchedAt: string
  lastActivity?: string
}

export default function EmployerMatchingPage() {
  const [matches] = useState<Match[]>([
    {
      id: "m1",
      candidateId: "Candidate #8",
      jobTitle: "Full Stack Developer",
      matchScore: 92,
      status: "active",
      matchedAt: "2024-01-15",
      lastActivity: "2 hours ago",
    },
    {
      id: "m2",
      candidateId: "Candidate #12",
      jobTitle: "Solana Engineer",
      matchScore: 88,
      status: "active",
      matchedAt: "2024-01-20",
      lastActivity: "1 day ago",
    },
    {
      id: "m3",
      candidateId: "Candidate #15",
      jobTitle: "Smart Contract Developer",
      matchScore: 85,
      status: "pending",
      matchedAt: "2024-01-22",
    },
    {
      id: "m4",
      candidateId: "Candidate #5",
      jobTitle: "Frontend Engineer",
      matchScore: 78,
      status: "closed",
      matchedAt: "2024-01-18",
    },
  ])

  const activeMatches = matches.filter((m) => m.status === "active")
  const pendingMatches = matches.filter((m) => m.status === "pending")
  const closedMatches = matches.filter((m) => m.status === "closed")

  const getStatusIcon = (status: Match["status"]) => {
    switch (status) {
      case "active":
        return <MessageSquare className="h-5 w-5 text-blue-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "closed":
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusBadge = (status: Match["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-600">Active</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "closed":
        return <Badge variant="destructive">Closed</Badge>
    }
  }

  const MatchCard = ({ match }: { match: Match }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getStatusIcon(match.status)}
            <div>
              <CardTitle className="mb-1">{match.candidateId}</CardTitle>
              <CardDescription>{match.jobTitle}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(match.status)}
            <Badge className="bg-purple-600">{match.matchScore}% Match</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Matched on:</span>
            <span className="font-medium">{new Date(match.matchedAt).toLocaleDateString()}</span>
          </div>
          {match.lastActivity && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last activity:</span>
              <span className="font-medium">{match.lastActivity}</span>
            </div>
          )}

          {match.status === "active" && (
            <Link href={`/employer/chat/${match.id}`}>
              <Button className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Open Chat
              </Button>
            </Link>
          )}
          {match.status === "pending" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">Waiting for candidate response...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Matching</h1>
        <p className="text-muted-foreground">Manage your candidate matches and communications</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-950">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeMatches.length}</p>
              <p className="text-sm text-muted-foreground">Active Matches</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-950">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingMatches.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-950">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{matches.length}</p>
              <p className="text-sm text-muted-foreground">Total Matches</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matches Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({activeMatches.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingMatches.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({closedMatches.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeMatches.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="mb-2 text-lg font-medium">No active matches</p>
                <p className="text-sm text-muted-foreground">Approve applicants to start matching</p>
              </CardContent>
            </Card>
          ) : (
            activeMatches.map((match) => <MatchCard key={match.id} match={match} />)
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingMatches.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="mb-2 text-lg font-medium">No pending matches</p>
                <p className="text-sm text-muted-foreground">Candidates are reviewing your offers</p>
              </CardContent>
            </Card>
          ) : (
            pendingMatches.map((match) => <MatchCard key={match.id} match={match} />)
          )}
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          {closedMatches.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <XCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="mb-2 text-lg font-medium">No closed matches</p>
                <p className="text-sm text-muted-foreground">Completed or declined matches will appear here</p>
              </CardContent>
            </Card>
          ) : (
            closedMatches.map((match) => <MatchCard key={match.id} match={match} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
