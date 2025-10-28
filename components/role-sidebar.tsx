"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  Shield,
  Search,
  Users,
  FileText,
  Clock,
  CheckCircle,
  History,
  Plus,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface RoleSidebarProps {
  role: "user" | "employer" | "approver" | "dao"
}

const roleNavigation: Record<string, NavItem[]> = {
  user: [
    { title: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { title: "Work History", href: "/user/work-history", icon: Briefcase },
    { title: "Skill Verification", href: "/user/credentials", icon: Shield },
    { title: "Job Search", href: "/user/job-search", icon: Search },
    { title: "Matching", href: "/user/matching", icon: Users },
  ],
  employer: [
    { title: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
    { title: "Job Management", href: "/employer/jobs", icon: Briefcase },
    { title: "Candidate Search", href: "/employer/candidates", icon: Search },
    { title: "Matching", href: "/employer/matching", icon: Users },
  ],
  approver: [
    { title: "Dashboard", href: "/approver/dashboard", icon: LayoutDashboard },
    { title: "Pending Reviews", href: "/approver/queue", icon: Clock },
    { title: "Approval History", href: "/approver/history", icon: CheckCircle },
  ],
  dao: [
    { title: "Dashboard", href: "/dao/dashboard", icon: LayoutDashboard },
    { title: "Proposal List", href: "/dao/proposals", icon: FileText },
    { title: "New Proposal", href: "/dao/new-proposal", icon: Plus },
    { title: "Voting History", href: "/dao/voting-history", icon: History },
  ],
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  const pathname = usePathname()
  const navItems = roleNavigation[role] || []

  return (
    <aside className="w-64 border-r border-border bg-muted/30 p-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
