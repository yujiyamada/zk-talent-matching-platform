"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThumbsUp, ThumbsDown, Search, Calendar, CheckCircle, XCircle } from "lucide-react"

interface VoteHistory {
  id: string
  proposalTitle: string
  yourVote: "for" | "against"
  finalResult: "passed" | "rejected" | "active"
  votedAt: string
  forVotes: number
  againstVotes: number
}

export default function VotingHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterResult, setFilterResult] = useState("all")
  const [filterVote, setFilterVote] = useState("all")

  const [history] = useState<VoteHistory[]>([
    {
      id: "v1",
      proposalTitle: "Add New Credential Type: Bootcamp Certificates",
      yourVote: "for",
      finalResult: "active",
      votedAt: "2024-01-25T10:00:00",
      forVotes: 203,
      againstVotes: 89,
    },
    {
      id: "v2",
      proposalTitle: "Reduce Minimum Experience Requirement",
      yourVote: "for",
      finalResult: "active",
      votedAt: "2024-01-24T14:00:00",
      forVotes: 156,
      againstVotes: 124,
    },
    {
      id: "v3",
      proposalTitle: "Increase Approver Rewards",
      yourVote: "for",
      finalResult: "passed",
      votedAt: "2024-01-20T09:00:00",
      forVotes: 342,
      againstVotes: 158,
    },
    {
      id: "v4",
      proposalTitle: "Change Platform Fee Structure",
      yourVote: "against",
      finalResult: "rejected",
      votedAt: "2024-01-15T16:00:00",
      forVotes: 145,
      againstVotes: 355,
    },
    {
      id: "v5",
      proposalTitle: "Add OAuth Authentication",
      yourVote: "for",
      finalResult: "passed",
      votedAt: "2024-01-10T11:00:00",
      forVotes: 421,
      againstVotes: 79,
    },
  ])

  const filteredHistory = history.filter((item) => {
    if (filterResult !== "all" && item.finalResult !== filterResult) return false
    if (filterVote !== "all" && item.yourVote !== filterVote) return false
    if (searchQuery && !item.proposalTitle.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getResultBadge = (result: VoteHistory["finalResult"]) => {
    switch (result) {
      case "passed":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Passed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      case "active":
        return <Badge className="bg-blue-600">Active</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Voting History</h1>
        <p className="text-muted-foreground">View all your past votes and proposal outcomes</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-950">
              <ThumbsUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{history.length}</p>
              <p className="text-sm text-muted-foreground">Total Votes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-100 p-3 text-green-600 dark:bg-green-950">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{history.filter((h) => h.finalResult === "passed").length}</p>
              <p className="text-sm text-muted-foreground">Passed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-red-100 p-3 text-red-600 dark:bg-red-950">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{history.filter((h) => h.finalResult === "rejected").length}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-950">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{history.filter((h) => h.finalResult === "active").length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by proposal title..."
                className="pl-10"
              />
            </div>
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterVote} onValueChange={setFilterVote}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Your Vote" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Votes</SelectItem>
                <SelectItem value="for">Voted For</SelectItem>
                <SelectItem value="against">Voted Against</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => {
          const totalVotes = item.forVotes + item.againstVotes
          const forPercentage = (item.forVotes / totalVotes) * 100

          return (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{item.proposalTitle}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Voted on {new Date(item.votedAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getResultBadge(item.finalResult)}
                    <Badge variant={item.yourVote === "for" ? "default" : "outline"} className="gap-1">
                      {item.yourVote === "for" ? <ThumbsUp className="h-3 w-3" /> : <ThumbsDown className="h-3 w-3" />}
                      You voted {item.yourVote}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium">Voting Results</span>
                      <span className="text-muted-foreground">{totalVotes} total votes</span>
                    </div>
                    <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-green-600 transition-all" style={{ width: `${forPercentage}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {item.forVotes} For ({forPercentage.toFixed(1)}%)
                      </span>
                      <span>
                        {item.againstVotes} Against ({(100 - forPercentage).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium">No votes found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
