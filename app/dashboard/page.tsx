"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserRole } from "@/types"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }
    
    // Redirect based on role
    const userData = JSON.parse(user)
    const role = userData.role as UserRole

    // Handle routing based on role
    switch(role) {
      case "administrator":
        router.push("/dashboard/admin")
        break
      case "forensic_investigator":
        router.push("/dashboard/investigator")
        break
      case "case_manager":
        router.push("/dashboard/case-manager")
        break
      case "evidence_reviewer":
        router.push("/dashboard/evidence-reviewer")
        break
      case "auditor":
        router.push("/dashboard/auditor")
        break
      default:
        // Handle legacy role format or unexpected values
        if (role === "investigator") {
          router.push("/dashboard/investigator")
        } else {
          // Fallback to investigator dashboard if role is unknown
          router.push("/dashboard/investigator")
        }
    }
  }, [router])

  // This is just a loading state while redirecting
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <h2 className="text-xl font-semibold">Loading your dashboard...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you to the appropriate dashboard.</p>
      </div>
    </div>
  )
}

