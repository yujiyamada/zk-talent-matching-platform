"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, User, Building2, CheckCircle, Users } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const getCurrentRole = () => {
    if (pathname.startsWith("/user")) return "Candidate"
    if (pathname.startsWith("/employer")) return "Company"
    if (pathname.startsWith("/approver")) return "Skill Approver"
    if (pathname.startsWith("/dao")) return "Operating Community"
    return "Select Role"
  }

  const roleOptions = [
    { name: "Candidate", path: "/user/profile", icon: User },
    { name: "Company", path: "/employer/jobs", icon: Building2 },
    { name: "Skill Approver", path: "/approver/queue", icon: CheckCircle },
    { name: "Operating Community", path: "/dao/proposals", icon: Users },
  ]

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-semibold">Web3 Talent Matching Platform</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                {getCurrentRole()}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {roleOptions.map((role) => {
                const Icon = role.icon
                return (
                  <DropdownMenuItem key={role.path} asChild>
                    <Link href={role.path} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="h-4 w-4" />
                      {role.name}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
