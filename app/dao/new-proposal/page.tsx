"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NewProposalPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    rationale: "",
    implementation: "",
    votingPeriod: "7",
  })

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Proposal Created",
      description: "Your proposal has been submitted and is now open for voting",
    })

    setTimeout(() => {
      router.push("/dao/proposals")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <Link href="/dao/proposals">
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Proposals
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Create New Proposal</h1>
        <p className="text-muted-foreground">Submit a proposal for community voting</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
              <CardDescription>Provide clear and detailed information about your proposal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Proposal Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Add New Credential Type: Bootcamp Certificates"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platform">Platform Features</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="economics">Economics & Fees</SelectItem>
                    <SelectItem value="security">Security & Privacy</SelectItem>
                    <SelectItem value="community">Community & Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a clear summary of what you're proposing..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rationale">Rationale</Label>
                <Textarea
                  id="rationale"
                  value={formData.rationale}
                  onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
                  placeholder="Explain why this proposal is important and what problems it solves..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="implementation">Implementation Details</Label>
                <Textarea
                  id="implementation"
                  value={formData.implementation}
                  onChange={(e) => setFormData({ ...formData, implementation: e.target.value })}
                  placeholder="Describe how this proposal would be implemented..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="votingPeriod">Voting Period</Label>
                <Select
                  value={formData.votingPeriod}
                  onValueChange={(v) => setFormData({ ...formData, votingPeriod: v })}
                >
                  <SelectTrigger id="votingPeriod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>✓ Be clear and specific about what you're proposing</p>
                <p>✓ Explain the rationale and expected impact</p>
                <p>✓ Consider implementation feasibility</p>
                <p>✓ Engage with community feedback</p>
                <p>✓ Proposals require {">"} 50% approval to pass</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Review Before Submitting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <p>Once submitted, proposals cannot be edited.</p>
                <p>Make sure all information is accurate and complete.</p>
                <p>The community will vote on your proposal for {formData.votingPeriod} days.</p>
              </CardContent>
            </Card>

            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
