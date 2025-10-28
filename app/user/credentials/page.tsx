"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CredentialBadge } from "@/components/credential-badge"
import { Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Credential {
  id: string
  title: string
  issuer?: string
  type: "CERT" | "GITHUB" | "TEST"
  proofHash: string
  issuedAt: string
  enabled: boolean
}

export default function CredentialsPage() {
  const { toast } = useToast()
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      type: "CERT",
      proofHash: "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
      issuedAt: "2023-06-15",
      enabled: true,
    },
    {
      id: "2",
      title: "Open Source Contributions",
      issuer: "GitHub",
      type: "GITHUB",
      proofHash: "0x3c2c2eb7b11a91385f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ea",
      issuedAt: "2024-01-10",
      enabled: true,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isIssuing, setIsIssuing] = useState(false)
  const [newCredType, setNewCredType] = useState<"CERT" | "GITHUB" | "TEST">("CERT")
  const [newCredTitle, setNewCredTitle] = useState("")
  const [newCredValue, setNewCredValue] = useState("")

  const handleToggle = (id: string, enabled: boolean) => {
    setCredentials(credentials.map((c) => (c.id === id ? { ...c, enabled } : c)))
    toast({
      title: enabled ? "Credential Enabled" : "Credential Disabled",
      description: enabled
        ? "This credential will be used in job matching"
        : "This credential will not be used in job matching",
    })
  }

  const handleIssueCredential = async () => {
    if (!newCredTitle.trim() || !newCredValue.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsIssuing(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newCred: Credential = {
      id: Date.now().toString(),
      title: newCredTitle,
      issuer: newCredType === "GITHUB" ? "GitHub" : "Self-Attested",
      type: newCredType,
      proofHash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      issuedAt: new Date().toISOString().split("T")[0],
      enabled: true,
    }

    setCredentials([...credentials, newCred])
    setIsIssuing(false)
    setIsDialogOpen(false)
    setNewCredTitle("")
    setNewCredValue("")

    toast({
      title: "Credential Issued Successfully",
      description: "Your new credential has been added to your profile",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Credentials & Verification</h1>
            <p className="text-muted-foreground">Issue and manage your verifiable credentials for anonymous matching</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Credential
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Issue New Credential</DialogTitle>
                <DialogDescription>
                  Create a verifiable credential that can be used in anonymous job matching
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="credType">Credential Type</Label>
                  <Select value={newCredType} onValueChange={(v: any) => setNewCredType(v)}>
                    <SelectTrigger id="credType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CERT">Certification</SelectItem>
                      <SelectItem value="GITHUB">GitHub Profile</SelectItem>
                      <SelectItem value="TEST">Skill Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credTitle">Title</Label>
                  <Input
                    id="credTitle"
                    value={newCredTitle}
                    onChange={(e) => setNewCredTitle(e.target.value)}
                    placeholder="e.g., AWS Certified Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credValue">
                    {newCredType === "GITHUB" ? "GitHub URL" : "Certificate ID / Evidence"}
                  </Label>
                  <Input
                    id="credValue"
                    value={newCredValue}
                    onChange={(e) => setNewCredValue(e.target.value)}
                    placeholder={
                      newCredType === "GITHUB" ? "https://github.com/username" : "Certificate ID or proof URL"
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isIssuing}>
                  Cancel
                </Button>
                <Button onClick={handleIssueCredential} disabled={isIssuing}>
                  {isIssuing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isIssuing ? "Issuing..." : "Issue Credential"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {credentials.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <p className="mb-4 text-muted-foreground">No credentials yet</p>
                <Button onClick={() => setIsDialogOpen(true)}>Add Your First Credential</Button>
              </CardContent>
            </Card>
          ) : (
            credentials.map((cred) => <CredentialBadge key={cred.id} {...cred} onToggle={handleToggle} />)
          )}
        </div>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">About Verifiable Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Credentials are issued as Soul-Bound Tokens (SBTs) on the blockchain, making them non-transferable and
              verifiable.
            </p>
            <p>
              When you apply to jobs, zero-knowledge proofs verify your credentials without revealing your identity.
            </p>
            <p>Toggle credentials on/off to control which ones are used in job matching.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
