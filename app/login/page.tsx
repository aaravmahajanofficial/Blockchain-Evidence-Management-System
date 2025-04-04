"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRole } from "@/types"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    
    // Demo credentials for testing
    const demoCredentials = [
      { email: "admin@example.com", password: "admin123", role: "administrator" as UserRole, name: "Admin User" },
      { email: "investigator@example.com", password: "invest123", role: "forensic_investigator" as UserRole, name: "Investigator User" },
      { email: "casemanager@example.com", password: "case123", role: "case_manager" as UserRole, name: "Case Manager User" },
      { email: "reviewer@example.com", password: "review123", role: "evidence_reviewer" as UserRole, name: "Evidence Reviewer User" },
      { email: "auditor@example.com", password: "audit123", role: "auditor" as UserRole, name: "Auditor User" }
    ]
    
    // In a real application, you would validate against a database/API
    setTimeout(() => {
      setIsLoading(false)
      
      // Find matching credentials
      const user = demoCredentials.find(cred => cred.email === email && cred.password === password)
      
      if (user) {
        // Store user info with role in localStorage
        localStorage.setItem('user', JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role
        }))
        
        // For now, route all non-admin users to investigator dashboard
        // In a full implementation, we would have separate dashboards for each role
        if (user.role === "administrator") {
          window.location.href = "/dashboard/admin"
        } else {
          window.location.href = "/dashboard/investigator"
        }
      } else {
        // Show error for invalid credentials
        alert("Invalid credentials. Try one of the demo accounts:\n" +
          "admin@example.com/admin123\n" +
          "investigator@example.com/invest123\n" +
          "casemanager@example.com/case123\n" +
          "reviewer@example.com/review123\n" +
          "auditor@example.com/audit123")
      }
    }, 1500)
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, wallet connects as forensic investigator
      localStorage.setItem('user', JSON.stringify({
        name: "Wallet User",
        address: "0x1234...5678",
        role: "forensic_investigator"
      }))
      window.location.href = "/dashboard/investigator"
    }, 1500)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Shield className="h-6 w-6" />
        <span className="text-lg font-bold">ForensicChain</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials">
            <Card>
              <CardHeader>
                <CardTitle>Account Login</CardTitle>
                <CardDescription>Enter your email and password to sign in</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Login</CardTitle>
                <CardDescription>Connect with your Ethereum wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleWalletConnect}
                  disabled={isLoading}
                >
                  <Wallet className="h-4 w-4" />
                  {isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We support MetaMask, WalletConnect, and other Ethereum wallets
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

