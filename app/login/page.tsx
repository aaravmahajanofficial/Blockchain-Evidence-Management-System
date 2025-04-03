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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
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
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" required />
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

