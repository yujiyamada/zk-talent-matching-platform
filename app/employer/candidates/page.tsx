"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield, Briefcase, Star } from "lucide-react"

interface Candidate {
  id: string
  displayName: string
  skills: string[]
  yearsExperience: number
  verifiedCredentials: number
  matchScore: number
  availability: string
  salaryExpectation: string
}

export default function CandidateSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterExperience, setFilterExperience] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")

  const [candidates] = useState<Candidate[]>([
    {
      id: "c1",
      displayName: "Anonymous Candidate #1",
      skills: ["Solidity", "Rust", "Anchor", "Web3"],
      yearsExperience: 4,
      verifiedCredentials: 5,
      matchScore: 95,
      availability: "Immediate",
      salaryExpectation: "$100k - $150k",
    },
    {
      id: "c2",
      displayName: "Anonymous Candidate #2",
      skills: ["TypeScript", "React", "Next.js", "Node.js"],
      yearsExperience: 3,
      verifiedCredentials: 4,
      matchScore: 88,
      availability: "2 weeks",
      salaryExpectation: "$80k - $120k",
    },
    {
      id: "c3",
      displayName: "Anonymous Candidate #3",
      skills: ["Python", "Django", "PostgreSQL", "AWS"],
      yearsExperience: 5,
      verifiedCredentials: 6,
      matchScore: 82,
      availability: "1 month",
      salaryExpectation: "$90k - $130k",
    },
    {
      id: "c4",
      displayName: "Anonymous Candidate #4",
      skills: ["Solidity", "Ethereum", "Security", "Auditing"],
      yearsExperience: 6,
      verifiedCredentials: 7,
      matchScore: 91,
      availability: "Immediate",
      salaryExpectation: "$120k - $180k",
    },
  ])

  const filteredCandidates = candidates
    .filter((candidate) => {
      if (filterExperience !== "all") {
        const minYears = Number.parseInt(filterExperience)
        if (candidate.yearsExperience < minYears) return false
      }
      if (filterAvailability !== "all" && candidate.availability.toLowerCase() !== filterAvailability) return false
      if (searchQuery && !candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())))
        return false
      return true
    })
    .sort((a, b) => b.matchScore - a.matchScore)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Candidate Search</h1>
        <p className="text-muted-foreground">Find qualified candidates with verified credentials</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skills..."
                className="pl-10"
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <Select value={filterExperience} onValueChange={setFilterExperience}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience</SelectItem>
                  <SelectItem value="2">2+ years</SelectItem>
                  <SelectItem value="3">3+ years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Listings */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <CardTitle>{candidate.displayName}</CardTitle>
                    <Badge className="bg-purple-600">{candidate.matchScore}% Match</Badge>
                  </div>
                  <CardDescription>
                    {candidate.yearsExperience} years experience • {candidate.availability} availability
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Skills */}
                <div>
                  <p className="mb-2 text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Verified Credentials:</span>
                    <span className="font-medium">{candidate.verifiedCredentials}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{candidate.yearsExperience} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="font-medium">{candidate.salaryExpectation}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="gap-2">View Full Profile</Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    Send Invitation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium">No candidates found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
