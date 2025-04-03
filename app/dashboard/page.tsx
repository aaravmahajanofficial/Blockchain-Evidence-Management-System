"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Clock, Database, FileDigit, FileUp, Home, LogOut, Settings, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardStats from "@/components/dashboard-stats"
import RecentEvidence from "@/components/recent-evidence"
import RecentTransactions from "@/components/recent-transactions"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">ForensicChain</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-12 items-center gap-2 px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
            <nav className="grid gap-1 px-2">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "overview" ? "bg-accent" : "hover:bg-accent"
                } transition-all`}
                onClick={() => setActiveTab("overview")}
              >
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Overview</span>
              </Link>
              <Link
                href="/dashboard/evidence"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "evidence" ? "bg-accent" : "hover:bg-accent"
                } transition-all`}
                onClick={() => setActiveTab("evidence")}
              >
                <FileDigit className="h-4 w-4" />
                <span className="text-sm font-medium">Evidence</span>
              </Link>
              <Link
                href="/dashboard/upload"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "upload" ? "bg-accent" : "hover:bg-accent"
                } transition-all`}
                onClick={() => setActiveTab("upload")}
              >
                <FileUp className="h-4 w-4" />
                <span className="text-sm font-medium">Upload Evidence</span>
              </Link>
              <Link
                href="/dashboard/transactions"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "transactions" ? "bg-accent" : "hover:bg-accent"
                } transition-all`}
                onClick={() => setActiveTab("transactions")}
              >
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Transactions</span>
              </Link>
              <Link
                href="/dashboard/analytics"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "analytics" ? "bg-accent" : "hover:bg-accent"
                } transition-all`}
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-medium">Analytics</span>
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <Tabs defaultValue="overview" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview" className="text-sm">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="text-sm">
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="text-sm">
                    Reports
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">History</span>
                  </Button>
                  <Link href="/dashboard/upload">
                    <Button size="sm" className="h-8 gap-1">
                      <FileUp className="h-3.5 w-3.5" />
                      <span className="text-xs">Upload Evidence</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <DashboardStats />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Evidence</CardTitle>
                      <CardDescription>Recently uploaded and verified evidence files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentEvidence />
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Latest blockchain transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentTransactions />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>View detailed analytics about evidence and transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Analytics charts will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generate and view reports about system usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Reports will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

