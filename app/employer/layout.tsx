import type React from "react"
import { RoleSidebar } from "@/components/role-sidebar"

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <RoleSidebar role="employer" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
