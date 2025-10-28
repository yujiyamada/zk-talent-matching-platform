import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, Lock } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "ZK-Proof Anonymity",
      description: "Zero-knowledge proof technology enables anonymous verification of personal information and skills.",
    },
    {
      icon: Zap,
      title: "High-Precision Matching",
      description: "AI and blockchain combine to achieve accurate job matching.",
    },
    {
      icon: Users,
      title: "Community Approval",
      description: "Community-driven skill approval ensures citizen-determined decisions.",
    },
    {
      icon: Lock,
      title: "SBTC Credibility",
      description: "Soulbound Tokens provide tamper-proof skill verification.",
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Register Job & Skills",
      description: "Register your job and skills, and receive skill approval through human review.",
    },
    {
      number: "2",
      title: "Execute ZK Proof",
      description: "Generate anonymous ZK proof for approved skills and issue SBT.",
    },
    {
      number: "3",
      title: "Job Matching",
      description: "Company job postings automatically match with your skill proof.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
          Web3 Talent Matching Platform
          <br />
          <span className="text-primary">Anonymous and Trustworthy</span> Skill Verification
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground text-balance">
          A next-generation job platform utilizing zero-knowledge proof and Soulbound Tokens.
          <br />
          Verify your skills while protecting privacy.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/user/profile">
            <Button size="lg" className="text-lg px-8">
              Start as Candidate
            </Button>
          </Link>
          <Link href="/employer/jobs">
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Start as Company
            </Button>
          </Link>
        </div>
      </section>

      {/* Platform Features */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Platform Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-2 transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-pretty">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mb-3 text-2xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">Get Started Now</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground text-balance">
            Choose your role and experience the next-generation job platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/user/profile">
              <Button size="lg" className="px-8">
                Candidate
              </Button>
            </Link>
            <Link href="/employer/jobs">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Company
              </Button>
            </Link>
            <Link href="/approver/queue">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Skill Approver
              </Button>
            </Link>
            <Link href="/dao/proposals">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Operating Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
