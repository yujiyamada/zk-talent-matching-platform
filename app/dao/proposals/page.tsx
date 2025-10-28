"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Proposal {
  id: string
  title: string
  body: string
  deadline: string
  forVotes: number
  againstVotes: number
  myVote?: "for" | "against"
  status: "active" | "passed" | "rejected"
}

export default function ProposalsPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "prop1",
      title: "Increase Minimum Experience Requirement",
      body: "Proposal to increase the minimum years of experience from 2 to 3 years for senior positions to ensure higher quality matches.",
      deadline: "2024-02-15T23:59:59",
      forVotes: 145,
      againstVotes: 67,
      status: "active",
    },
    {
      id: "prop2",
      title: "Add New Credential Type: Bootcamp Certificates",
      body: "Allow bootcamp certificates as valid credentials for entry-level positions. This would expand the talent pool and provide opportunities for career changers.",
      deadline: "2024-02-10T23:59:59",
      forVotes: 203,
      againstVotes: 89,
      myVote: "for",
      status: "active",
    },
    {
      id: "prop3",
      title: "Implement Skill Test Scoring System",
      body: "Introduce a standardized scoring system for skill tests with minimum passing scores for different job levels.",
      deadline: "2024-01-25T23:59:59",
      forVotes: 312,
      againstVotes: 45,
      status: "passed",
    },
    {
      id: "prop4",
      title: "Reduce Approval Timeframe",
      body: "Reduce the maximum approval timeframe from 7 days to 3 days to speed up the credential verification process.",
      deadline: "2024-01-20T23:59:59",
      forVotes: 98,
      againstVotes: 234,
      status: "rejected",
    },
  ])

  const [newProposal, setNewProposal] = useState({
    title: "",
    body: "",
    deadline: "",
  })

  const handleCreateProposal = () => {
    if (!newProposal.title || !newProposal.body || !newProposal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const proposal: Proposal = {
      id: `prop${Date.now()}`,
      title: newProposal.title,
      body: newProposal.body,
      deadline: newProposal.deadline,
      forVotes: 0,
      againstVotes: 0,
      status: "active",
    }

    setProposals([proposal, ...proposals])
    setIsDialogOpen(false)
    setNewProposal({ title: "", body: "", deadline: "" })

    toast({
      title: "Proposal Created",
      description: "Your proposal has been submitted for voting",
    })
  }

  const activeProposals = proposals.filter((p) => p.status === "active")
  const closedProposals = proposals.filter((p) => p.status !== "active")

  const getStatusBadge = (status: Proposal["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-600">Active</Badge>
      case "passed":
        return <Badge className="bg-green-600">Passed</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
    }
  }

  const getVotePercentage = (proposal: Proposal) => {
    const total = proposal.forVotes + proposal.againstVotes
    if (total === 0) return 50
    return (proposal.forVotes / total) * 100
  }

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">DAO Proposals</h1>
            <p className="text-muted-foreground">Participate in platform governance by voting on proposals</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Proposal</DialogTitle>
                <DialogDescription>Submit a proposal for the community to vote on</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="propTitle">Title *</Label>
                  <Input
                    id="propTitle"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                    placeholder="Brief description of the proposal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propBody">Description *</Label>
                  <Textarea
                    id="propBody"
                    value={newProposal.body}
                    onChange={(e) => setNewProposal({ ...newProposal, body: e.target.value })}
                    placeholder="Detailed explanation of the proposal and its impact..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propDeadline">Voting Deadline *</Label>
                  <Input
                    id="propDeadline"
                    type="datetime-local"
                    value={newProposal.deadline}
                    onChange={(e) => setNewProposal({ ...newProposal, deadline: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProposal}>Submit Proposal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active ({activeProposals.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({closedProposals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeProposals.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <TrendingUp className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">No active proposals</p>
                  <p className="mb-4 text-sm text-muted-foreground">Be the first to create a proposal</p>
                  <Button onClick={() => setIsDialogOpen(true)}>Create Proposal</Button>
                </CardContent>
              </Card>
            ) : (
              activeProposals.map((proposal) => {
                const votePercentage = getVotePercentage(proposal)
                const totalVotes = proposal.forVotes + proposal.againstVotes
                const deadlinePassed = isDeadlinePassed(proposal.deadline)

                return (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <CardTitle>{proposal.title}</CardTitle>
                            {getStatusBadge(proposal.status)}
                            {proposal.myVote && (
                              <Badge variant="outline" className="gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Voted
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-pretty">{proposal.body}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium">Voting Progress</span>
                            <span className="text-muted-foreground">{totalVotes} votes</span>
                          </div>
                          <Progress value={votePercentage} className="h-2" />
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-green-600">
                              For: {proposal.forVotes} ({votePercentage.toFixed(1)}%)
                            </span>
                            <span className="text-red-600">
                              Against: {proposal.againstVotes} ({(100 - votePercentage).toFixed(1)}%)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {deadlinePassed
                                ? "Voting ended"
                                : `Ends ${new Date(proposal.deadline).toLocaleDateString()}`}
                            </span>
                          </div>

                          <Link href={`/dao/proposals/${proposal.id}`}>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {closedProposals.map((proposal) => {
              const votePercentage = getVotePercentage(proposal)
              const totalVotes = proposal.forVotes + proposal.againstVotes

              return (
                <Card key={proposal.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <CardTitle>{proposal.title}</CardTitle>
                          {getStatusBadge(proposal.status)}
                        </div>
                        <CardDescription className="text-pretty">{proposal.body}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium">Final Results</span>
                          <span className="text-muted-foreground">{totalVotes} votes</span>
                        </div>
                        <Progress value={votePercentage} className="h-2" />
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="text-green-600">
                            For: {proposal.forVotes} ({votePercentage.toFixed(1)}%)
                          </span>
                          <span className="text-red-600">
                            Against: {proposal.againstVotes} ({(100 - votePercentage).toFixed(1)}%)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <div className="text-sm text-muted-foreground">
                          Ended {new Date(proposal.deadline).toLocaleDateString()}
                        </div>

                        <Link href={`/dao/proposals/${proposal.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
