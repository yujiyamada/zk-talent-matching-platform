"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Briefcase, DollarSign, MapPin, Clock, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  minYears?: number
  salaryMin?: number
  salaryMax?: number
  location: string
  type: string
  postedAt: string
  matchScore?: number
}

export default function JobSearchPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isApplying, setIsApplying] = useState<string | null>(null)

  const [jobs] = useState<Job[]>([
    {
      id: "j1",
      title: "Senior Blockchain Developer",
      description: "Build next-generation DeFi protocols on Solana",
      requiredSkills: ["Solidity", "Rust", "Anchor", "Web3"],
      minYears: 3,
      salaryMin: 90000,
      salaryMax: 150000,
      location: "Remote",
      type: "Full-time",
      postedAt: "2024-01-20",
      matchScore: 92,
    },
    {
      id: "j2",
      title: "Full Stack TypeScript Developer",
      description: "Next.js and React expertise required for SaaS platform",
      requiredSkills: ["TypeScript", "Next.js", "React", "Node.js"],
      minYears: 2,
      salaryMin: 70000,
      salaryMax: 110000,
      location: "Remote",
      type: "Full-time",
      postedAt: "2024-01-22",
      matchScore: 85,
    },
    {
      id: "j3",
      title: "Smart Contract Auditor",
      description: "Review and audit DeFi protocols for security vulnerabilities",
      requiredSkills: ["Solidity", "Security", "Ethereum"],
      minYears: 4,
      salaryMin: 100000,
      salaryMax: 160000,
      location: "Remote",
      type: "Contract",
      postedAt: "2024-01-18",
      matchScore: 78,
    },
    {
      id: "j4",
      title: "Frontend Engineer",
      description: "Build beautiful user interfaces for Web3 applications",
      requiredSkills: ["React", "TypeScript", "Tailwind CSS"],
      minYears: 2,
      salaryMin: 60000,
      salaryMax: 100000,
      location: "Hybrid",
      type: "Full-time",
      postedAt: "2024-01-25",
      matchScore: 71,
    },
  ])

  const handleApply = async (jobId: string) => {
    setIsApplying(jobId)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsApplying(null)

    toast({
      title: "Application Submitted",
      description: "Your ZK proof has been generated and sent to the employer",
    })
  }

  const filteredJobs = jobs
    .filter((job) => {
      if (filterType !== "all" && job.type.toLowerCase() !== filterType) return false
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Job Search</h1>
        <p className="text-muted-foreground">Find opportunities that match your skills and preferences</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title..."
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isCurrentlyApplying = isApplying === job.id

          return (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <CardTitle>{job.title}</CardTitle>
                      {job.matchScore && job.matchScore >= 80 && (
                        <Badge className="bg-green-600">{job.matchScore}% Match</Badge>
                      )}
                      {job.matchScore && job.matchScore < 80 && job.matchScore >= 70 && (
                        <Badge className="bg-yellow-600">{job.matchScore}% Match</Badge>
                      )}
                    </div>
                    <CardDescription>{job.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    {job.salaryMin && job.salaryMax && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>
                          ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {job.minYears && (
                    <p className="text-sm text-muted-foreground">Minimum {job.minYears} years of experience required</p>
                  )}

                  {/* Apply Button */}
                  <Button onClick={() => handleApply(job.id)} disabled={isCurrentlyApplying} className="gap-2">
                    {isCurrentlyApplying && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isCurrentlyApplying ? "Applying..." : "Apply with ZK Proof"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium">No jobs found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
