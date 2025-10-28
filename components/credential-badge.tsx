import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Github, Award, CheckCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type CredentialType = "CERT" | "GITHUB" | "TEST"

interface CredentialBadgeProps {
  id: string
  title: string
  issuer?: string
  type: CredentialType
  proofHash: string
  issuedAt: string
  enabled: boolean
  onToggle?: (id: string, enabled: boolean) => void
}

const iconMap = {
  CERT: Award,
  GITHUB: Github,
  TEST: Shield,
}

export function CredentialBadge({
  id,
  title,
  issuer,
  type,
  proofHash,
  issuedAt,
  enabled,
  onToggle,
}: CredentialBadgeProps) {
  const Icon = iconMap[type]

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10" />
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{title}</h3>
              {issuer && <p className="text-sm text-muted-foreground">{issuer}</p>}
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
                <span className="text-xs text-muted-foreground">{new Date(issuedAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">Proof: {proofHash.slice(0, 16)}...</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor={`credential-${id}`} className="text-xs text-muted-foreground">
              Use in matching
            </Label>
            <Switch id={`credential-${id}`} checked={enabled} onCheckedChange={(checked) => onToggle?.(id, checked)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
