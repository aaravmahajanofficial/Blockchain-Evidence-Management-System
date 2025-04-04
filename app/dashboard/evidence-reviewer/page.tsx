"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  BarChart3, 
  CheckCircle2, 
  Database, 
  Download, 
  FileDigit, 
  Home, 
  LogOut, 
  MagnifyingGlass,
  Settings, 
  Shield, 
  User, 
  Search, 
  FileText,
  ListFilter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardStats from "@/components/dashboard-stats"
import RecentEvidence from "@/components/recent-evidence"
import RecentTransactions from "@/components/recent-transactions"
import { PermissionAwareNavLink } from "@/components/PermissionAwareNavLink"
import { PermissionAwareButton } from "@/components/PermissionAwareButton"
import { usePermissions } from "@/hooks/usePermissions"

export default function EvidenceReviewerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { hasRole, loading } = usePermissions()
  
  // Check if user is authenticated and has evidence reviewer role
  useEffect(() => {
    if (!loading) {
      const authorized = hasRole('evidence_reviewer')
      
      if (!authorized) {
        router.push('/dashboard')
      }
    }
  }, [loading, hasRole, router])
  
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <h2 className="text-xl font-semibold">Loading dashboard...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">ForensicChain</span>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500 text-primary-foreground">Evidence Reviewer</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                localStorage.removeItem("user")
                router.push("/login")
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500 text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">Evidence Review Panel</span>
            </div>
            <nav className="grid gap-1 px-2">
              <PermissionAwareNavLink
                href="/dashboard/evidence-reviewer"
                isActive={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                icon={Home}
              >
                Overview
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="view_evidence"
                href="/dashboard/evidence"
                isActive={activeTab === "evidence"}
                onClick={() => setActiveTab("evidence")}
                icon={FileDigit}
              >
                Browse Evidence
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="verify_evidence"
                href="/dashboard/evidence-reviewer/verify"
                isActive={activeTab === "verify"}
                onClick={() => setActiveTab("verify")}
                icon={CheckCircle2}
              >
                Verify Evidence
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="download_evidence"
                href="/dashboard/evidence-reviewer/downloads"
                isActive={activeTab === "downloads"}
                onClick={() => setActiveTab("downloads")}
                icon={Download}
              >
                Downloaded Evidence
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="view_audit_trail"
                href="/dashboard/transactions"
                isActive={activeTab === "transactions"}
                onClick={() => setActiveTab("transactions")}
                icon={Database}
              >
                Transactions
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="generate_reports"
                href="/dashboard/evidence-reviewer/reports"
                isActive={activeTab === "reports"}
                onClick={() => setActiveTab("reports")}
                icon={FileText}
              >
                Reports
              </PermissionAwareNavLink>
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
                  <TabsTrigger value="evidence" className="text-sm">
                    Evidence
                  </TabsTrigger>
                  <TabsTrigger value="verification" className="text-sm">
                    Verification
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <PermissionAwareButton permission="view_evidence" variant="outline" size="sm" className="h-8 gap-1">
                    <Search className="h-3.5 w-3.5" />
                    <span className="text-xs">Search Evidence</span>
                  </PermissionAwareButton>
                  <PermissionAwareButton permission="verify_evidence" size="sm" className="h-8 gap-1" asChild>
                    <Link href="/dashboard/evidence-reviewer/verify">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span className="text-xs">Verify Evidence</span>
                    </Link>
                  </PermissionAwareButton>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <DashboardStats />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Evidence Review Actions</CardTitle>
                      <CardDescription>Quick access to evidence review functions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <PermissionAwareButton 
                          permission="view_evidence"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/evidence">
                            <FileDigit className="h-8 w-8" />
                            <span>Browse Evidence</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="verify_evidence"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/evidence-reviewer/verify">
                            <CheckCircle2 className="h-8 w-8" />
                            <span>Verify Evidence</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="download_evidence"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/evidence-reviewer/downloads">
                            <Download className="h-8 w-8" />
                            <span>Download Evidence</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="generate_reports"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/evidence-reviewer/reports">
                            <FileText className="h-8 w-8" />
                            <span>Generate Report</span>
                          </Link>
                        </PermissionAwareButton>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Review Statistics</CardTitle>
                      <CardDescription>Overview of evidence review activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Evidence Items Reviewed</span>
                          <span className="text-sm font-medium">156</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Pending Verification</span>
                          <span className="text-sm font-medium">8</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Downloaded Items</span>
                          <span className="text-sm font-medium">42</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Verification Failures</span>
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Last Activity</span>
                          <span className="text-sm font-medium">35 minutes ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="space-y-1">
                        <CardTitle>Evidence Awaiting Review</CardTitle>
                        <CardDescription>Evidence items requiring verification</CardDescription>
                      </div>
                      <PermissionAwareButton permission="verify_evidence" variant="outline" size="sm" asChild>
                        <Link href="/dashboard/evidence-reviewer/verify">
                          View All
                        </Link>
                      </PermissionAwareButton>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          {[
                            { id: "E-2023-1107", title: "Video Recording.mp4", uploadedBy: "J. Smith", priority: "High" },
                            { id: "E-2023-1102", title: "Financial Documents.pdf", uploadedBy: "M. Johnson", priority: "Medium" },
                            { id: "E-2023-1098", title: "Network Logs.zip", uploadedBy: "R. Williams", priority: "High" },
                            { id: "E-2023-1096", title: "Server Backups.tar", uploadedBy: "L. Davis", priority: "Low" },
                          ].map((evidence) => (
                            <div key={evidence.id} className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{evidence.title}</p>
                                <p className="text-sm text-muted-foreground">{evidence.id} • {evidence.uploadedBy}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  evidence.priority === "High" 
                                    ? "bg-red-100 text-red-800" 
                                    : evidence.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}>
                                  {evidence.priority}
                                </span>
                                <Button variant="ghost" size="icon">
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Evidence</CardTitle>
                      <CardDescription>Recently uploaded evidence files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentEvidence />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="evidence" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence Repository</CardTitle>
                    <CardDescription>Browse and search all evidence files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Evidence browser interface will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="verification" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence Verification</CardTitle>
                    <CardDescription>Verify the integrity and authenticity of evidence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Verification interface will appear here</p>
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