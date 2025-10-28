"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Search, Calendar } from "lucide-react"

interface ApprovalHistory {
  id: string
  candidateName: string
  credentialType: "CERT" | "GITHUB" | "TEST"
  status: "approved" | "rejected"
  reviewedAt: string
  score: number
  comment?: string
}

export default function ApprovalHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const [history] = useState<ApprovalHistory[]>([
    {
      id: "h1",
      candidateName: "Alice Johnson",
      credentialType: "GITHUB",
      status: "approved",
      reviewedAt: "2024-01-25T10:00:00",
      score: 85,
      comment: "Strong portfolio with consistent contributions",
    },
    {
      id: "h2",
      candidateName: "Bob Smith",
      credentialType: "CERT",
      status: "approved",
      reviewedAt: "2024-01-25T09:30:00",
      score: 90,
      comment: "Valid AWS certification verified",
    },
    {
      id: "h3",
      candidateName: "Carol White",
      credentialType: "TEST",
      status: "rejected",
      reviewedAt: "2024-01-24T16:00:00",
      score: 45,
      comment: "Test results below minimum threshold",
    },
    {
      id: "h4",
      candidateName: "David Brown",
      credentialType: "GITHUB",
      status: "approved",
      reviewedAt: "2024-01-24T14:00:00",
      score: 88,
    },
    {
      id: "h5",
      candidateName: "Eve Davis",
      credentialType: "CERT",
      status: "rejected",
      reviewedAt: "2024-01-23T11:00:00",
      score: 50,
      comment: "Certificate could not be verified",
    },
    {
      id: "h6",
      candidateName: "Frank Miller",
      credentialType: "TEST",
      status: "approved",
      reviewedAt: "2024-01-23T09:00:00",
      score: 92,
      comment: "Excellent test performance",
    },
  ])

  const filteredHistory = history.filter((item) => {
    if (filterStatus !== "all" && item.status !== filterStatus) return false
    if (filterType !== "all" && item.credentialType !== filterType) return false
    if (searchQuery && !item.candidateName.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getCredentialBadge = (type: ApprovalHistory["credentialType"]) => {
    const colors = {
      CERT: "bg-blue-600",
      GITHUB: "bg-purple-600",
      TEST: "bg-green-600",
    }
    return <Badge className={colors[type]}>{type}</Badge>
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Approval History</h1>
        <p className="text-muted-foreground">View all your past credential reviews and decisions</p>
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
                placeholder="Search by candidate name..."
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="CERT">Certification</SelectItem>
                <SelectItem value="GITHUB">GitHub</SelectItem>
                <SelectItem value="TEST">Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {item.status === "approved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {item.status === "rejected" && <XCircle className="h-5 w-5 text-red-600" />}
                  </div>
                  <div>
                    <CardTitle className="mb-1">{item.candidateName}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.reviewedAt).toLocaleString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getCredentialBadge(item.credentialType)}
                  <Badge variant={item.status === "approved" ? "default" : "destructive"}>
                    {item.status === "approved" ? "Approved" : "Rejected"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-sm font-medium">Quality Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(item.score)}`}>{item.score}</span>
                </div>
                {item.comment && (
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className="text-sm font-medium text-muted-foreground">Review Comment:</p>
                    <p className="mt-1 text-sm">{item.comment}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium">No reviews found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
