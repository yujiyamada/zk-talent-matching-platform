"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ExternalLink, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [approval] = useState({
    id: params.id,
    userId: "user1",
    userDisplayName: "Alice Johnson",
    target: "GITHUB" as const,
    evidenceUrl: "https://github.com/alice",
    submittedAt: "2024-01-20T10:00:00",
    status: "pending" as const,
  })

  const [score, setScore] = useState([75])
  const [comment, setComment] = useState("")
  const [criteria, setCriteria] = useState({
    authentic: false,
    relevant: false,
    upToDate: false,
    sufficient: false,
  })

  const handleDecision = (decision: "approve" | "reject") => {
    if (decision === "approve" && !Object.values(criteria).every(Boolean)) {
      toast({
        title: "Incomplete Review",
        description: "Please check all criteria before approving",
        variant: "destructive",
      })
      return
    }

    toast({
      title: decision === "approve" ? "Credential Approved" : "Credential Rejected",
      description: `The applicant has been notified of your decision`,
    })

    setTimeout(() => {
      router.push("/approver/queue")
    }, 1500)
  }

  const getTargetBadge = (target: typeof approval.target) => {
    const colors = {
      CERT: "bg-blue-600",
      GITHUB: "bg-purple-600",
      TEST: "bg-green-600",
    }
    return <Badge className={colors[target]}>{target}</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/approver/queue">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Queue
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Review Credential</h1>
          <p className="text-muted-foreground">Evaluate the evidence and make a decision</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Evidence Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-1 text-sm font-medium">Display Name</p>
                  <p className="text-sm text-muted-foreground">{approval.userDisplayName}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium">Credential Type</p>
                  {getTargetBadge(approval.target)}
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium">Submitted</p>
                  <p className="text-sm text-muted-foreground">{new Date(approval.submittedAt).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>Review the submitted proof</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="mb-2 text-sm font-medium">Evidence URL</p>
                  <code className="block rounded bg-background px-2 py-1 text-xs">{approval.evidenceUrl}</code>
                </div>

                <a href={approval.evidenceUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <ExternalLink className="h-4 w-4" />
                    Open Evidence in New Tab
                  </Button>
                </a>

                {/* Mock preview */}
                <div className="rounded-lg border border-border bg-muted/50 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20" />
                    <div>
                      <p className="font-semibold">Alice Johnson</p>
                      <p className="text-sm text-muted-foreground">@alice</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Public Repositories</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contributions (last year)</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Followers</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evaluation Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Criteria</CardTitle>
                <CardDescription>Check all criteria that are met</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="authentic"
                    checked={criteria.authentic}
                    onCheckedChange={(checked) => setCriteria({ ...criteria, authentic: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="authentic" className="cursor-pointer font-medium">
                      Authenticity Verified
                    </Label>
                    <p className="text-sm text-muted-foreground">The evidence appears genuine and not fabricated</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="relevant"
                    checked={criteria.relevant}
                    onCheckedChange={(checked) => setCriteria({ ...criteria, relevant: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="relevant" className="cursor-pointer font-medium">
                      Relevant to Claim
                    </Label>
                    <p className="text-sm text-muted-foreground">The evidence supports the credential being claimed</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="upToDate"
                    checked={criteria.upToDate}
                    onCheckedChange={(checked) => setCriteria({ ...criteria, upToDate: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="upToDate" className="cursor-pointer font-medium">
                      Up to Date
                    </Label>
                    <p className="text-sm text-muted-foreground">The evidence is current and not outdated</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="sufficient"
                    checked={criteria.sufficient}
                    onCheckedChange={(checked) => setCriteria({ ...criteria, sufficient: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="sufficient" className="cursor-pointer font-medium">
                      Sufficient Evidence
                    </Label>
                    <p className="text-sm text-muted-foreground">The evidence provides enough proof for verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score</CardTitle>
                <CardDescription>Rate the overall quality of the credential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Quality Score</Label>
                    <span className="text-2xl font-bold text-primary">{score[0]}</span>
                  </div>
                  <Slider value={score} onValueChange={setScore} max={100} step={5} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>Optional feedback for the applicant</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add any notes or feedback..."
                  rows={4}
                />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => handleDecision("reject")}
                className="flex-1 gap-2 bg-transparent"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
              <Button onClick={() => handleDecision("approve")} className="flex-1 gap-2">
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
