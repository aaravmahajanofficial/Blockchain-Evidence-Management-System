"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserRole } from "@/types"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [role, setRole] = useState<UserRole>("forensic_investigator")
  const [organization, setOrganization] = useState<string>("")

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    
    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    
    setIsLoading(true)
    
    // In a real application, you would submit this data to an API/backend
    setTimeout(() => {
      setIsLoading(false)
      
      // Store user information in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        role,
        organization
      }))
      
      // Redirect based on role
      if (role === "administrator") {
        window.location.href = "/dashboard/admin"
      } else {
        // Temporary: all other roles to investigator dashboard
        // In a full implementation, we would have different dashboards
        window.location.href = "/dashboard/investigator"
      }
    }, 1500)
  }

  // Function to get role display name for a more user-friendly UI
  const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
      case "administrator": return "Administrator";
      case "forensic_investigator": return "Forensic Investigator";
      case "case_manager": return "Case Manager";
      case "evidence_reviewer": return "Evidence Reviewer";
      case "auditor": return "Auditor";
      default: return role;
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Shield className="h-6 w-6" />
        <span className="text-lg font-bold">ForensicChain</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
        </div>
        <Card>
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>Fill in your information to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  required 
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="forensic_investigator">Forensic Investigator</SelectItem>
                    <SelectItem value="case_manager">Case Manager</SelectItem>
                    <SelectItem value="evidence_reviewer">Evidence Reviewer</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input 
                  id="organization" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Your organization" 
                  required 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

