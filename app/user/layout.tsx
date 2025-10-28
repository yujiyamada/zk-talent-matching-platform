import type React from "react"
import { RoleSidebar } from "@/components/role-sidebar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <RoleSidebar role="user" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
