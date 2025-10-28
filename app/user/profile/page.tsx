"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TagInput } from "@/components/tag-input"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2, Save } from "lucide-react"

interface WorkExp {
  company?: string
  role: string
  start: string
  end?: string
  highlights?: string[]
}

export default function UserProfilePage() {
  const [displayName, setDisplayName] = useState("John Doe")
  const [bio, setBio] = useState("")
  const [skills, setSkills] = useState<string[]>(["TypeScript", "React", "Node.js"])
  const [certifications, setCertifications] = useState<string[]>(["AWS Certified"])
  const [workExperiences, setWorkExperiences] = useState<WorkExp[]>([
    { company: "Tech Corp", role: "Senior Developer", start: "2020-01", end: "2023-12" },
  ])
  const [desiredRole, setDesiredRole] = useState("Full Stack Developer")
  const [salaryMin, setSalaryMin] = useState("80000")
  const [salaryMax, setSalaryMax] = useState("120000")
  const [hideCompanyNames, setHideCompanyNames] = useState(false)
  const [hideAge, setHideAge] = useState(true)

  const profileCompleteness = 85

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { role: "", start: "" }])
  }

  const removeWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index))
  }

  const updateWorkExperience = (index: number, field: keyof WorkExp, value: string) => {
    const updated = [...workExperiences]
    updated[index] = { ...updated[index], [field]: value }
    setWorkExperiences(updated)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Candidate Profile</h1>
          <p className="text-muted-foreground">Complete your profile to start matching with opportunities</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Preview Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Profile Completeness</CardTitle>
                <CardDescription>Fill all required fields to reach 100%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span className="text-muted-foreground">{profileCompleteness}%</span>
                  </div>
                  <Progress value={profileCompleteness} className="h-2" />
                </div>

                <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
                  <h3 className="font-semibold">{displayName}</h3>
                  {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 5).map((skill) => (
                        <span key={skill} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name *</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workExperiences.map((exp, index) => (
                    <div key={index} className="space-y-4 rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button variant="ghost" size="sm" onClick={() => removeWorkExperience(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company || ""}
                            onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                            placeholder="Company name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Role *</Label>
                          <Input
                            value={exp.role}
                            onChange={(e) => updateWorkExperience(index, "role", e.target.value)}
                            placeholder="Your role"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Start Date *</Label>
                          <Input
                            type="month"
                            value={exp.start}
                            onChange={(e) => updateWorkExperience(index, "start", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.end || ""}
                            onChange={(e) => updateWorkExperience(index, "end", e.target.value)}
                            placeholder="Leave empty if current"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addWorkExperience} className="w-full bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Work Experience
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Skills *</Label>
                    <TagInput tags={skills} onChange={setSkills} placeholder="Type a skill and press Enter" />
                  </div>

                  <div className="space-y-2">
                    <Label>Certifications</Label>
                    <TagInput
                      tags={certifications}
                      onChange={setCertifications}
                      placeholder="Type a certification and press Enter"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Desired Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="desiredRole">Desired Role</Label>
                    <Input
                      id="desiredRole"
                      value={desiredRole}
                      onChange={(e) => setDesiredRole(e.target.value)}
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="salaryMin">Minimum Salary (USD)</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                        placeholder="80000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salaryMax">Maximum Salary (USD)</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                        placeholder="120000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control what information is hidden during matching</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="hideCompanyNames">Hide Company Names</Label>
                      <p className="text-sm text-muted-foreground">Company names will not be visible to employers</p>
                    </div>
                    <Switch id="hideCompanyNames" checked={hideCompanyNames} onCheckedChange={setHideCompanyNames} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="hideAge">Hide Age</Label>
                      <p className="text-sm text-muted-foreground">Your age will remain private</p>
                    </div>
                    <Switch id="hideAge" checked={hideAge} onCheckedChange={setHideAge} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
