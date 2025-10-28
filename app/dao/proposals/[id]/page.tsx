"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ThumbsUp, ThumbsDown, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProposalDetailPage() {
  const params = useParams()
  const { toast } = useToast()

  const [proposal, setProposal] = useState({
    id: params.id,
    title: "Add New Credential Type: Bootcamp Certificates",
    body: "Allow bootcamp certificates as valid credentials for entry-level positions. This would expand the talent pool and provide opportunities for career changers.\n\nRationale:\n- Many bootcamp graduates have practical skills but lack traditional degrees\n- This aligns with our mission of skills-based hiring\n- Other platforms have successfully implemented similar policies\n\nImplementation:\n- Add 'BOOTCAMP' as a new credential type\n- Require bootcamp verification through approved providers\n- Set minimum completion requirements (e.g., 12-week programs)\n\nExpected Impact:\n- 30% increase in candidate pool\n- More diverse talent pipeline\n- Better opportunities for career changers",
    deadline: "2024-02-10T23:59:59",
    forVotes: 203,
    againstVotes: 89,
    myVote: undefined as "for" | "against" | undefined,
    status: "active" as const,
    proposer: "0x742d...3f8a",
    createdAt: "2024-01-25T10:00:00",
  })

  const handleVote = (choice: "for" | "against") => {
    if (proposal.myVote) {
      toast({
        title: "Already Voted",
        description: "You have already cast your vote on this proposal",
        variant: "destructive",
      })
      return
    }

    setProposal({
      ...proposal,
      myVote: choice,
      forVotes: choice === "for" ? proposal.forVotes + 1 : proposal.forVotes,
      againstVotes: choice === "against" ? proposal.againstVotes + 1 : proposal.againstVotes,
    })

    toast({
      title: "Vote Recorded",
      description: `Your vote ${choice === "for" ? "in favor" : "against"} has been recorded on-chain`,
    })
  }

  const votePercentage = (proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100
  const totalVotes = proposal.forVotes + proposal.againstVotes
  const deadlinePassed = new Date(proposal.deadline) < new Date()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dao/proposals">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Proposals
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="mb-4 flex items-start gap-2">
                  <Badge className="bg-blue-600">Active</Badge>
                  {proposal.myVote && (
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      You Voted {proposal.myVote === "for" ? "For" : "Against"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl">{proposal.title}</CardTitle>
                <CardDescription>
                  Proposed by {proposal.proposer} on {new Date(proposal.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{proposal.body}</div>

                  {!deadlinePassed && !proposal.myVote && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                      <h3 className="mb-4 text-lg font-semibold">Cast Your Vote</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Your vote will be recorded on-chain and cannot be changed. In v1, this will require a wallet
                        signature.
                      </p>
                      <div className="flex gap-4">
                        <Button onClick={() => handleVote("for")} className="flex-1 gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          Vote For
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleVote("against")}
                          className="flex-1 gap-2 bg-transparent"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          Vote Against
                        </Button>
                      </div>
                    </div>
                  )}

                  {proposal.myVote && (
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <p className="text-sm text-muted-foreground">
                        Thank you for participating in governance! Your vote has been recorded.
                      </p>
                    </div>
                  )}

                  {deadlinePassed && !proposal.myVote && (
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <p className="text-sm text-muted-foreground">Voting has ended for this proposal.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Voting Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">Current Status</span>
                      <span className="text-muted-foreground">{totalVotes} votes</span>
                    </div>
                    <Progress value={votePercentage} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">For</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{proposal.forVotes}</p>
                        <p className="text-xs text-green-600/70">{votePercentage.toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-red-50 p-3 dark:bg-red-950/20">
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-600">Against</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">{proposal.againstVotes}</p>
                        <p className="text-xs text-red-600/70">{(100 - votePercentage).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Proposal Created</p>
                      <p className="text-xs text-muted-foreground">{new Date(proposal.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Voting {deadlinePassed ? "Ended" : "Ends"}</p>
                      <p className="text-xs text-muted-foreground">{new Date(proposal.deadline).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">About DAO Voting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-muted-foreground">
                  <p>Proposals require a simple majority ({">"} 50%) to pass.</p>
                  <p>Voting is open to all platform participants.</p>
                  <p>In v1, votes will require wallet signatures for verification.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
