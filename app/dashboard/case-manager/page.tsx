"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  BarChart3, 
  Clock, 
  Database, 
  FileDigit, 
  FolderPlus, 
  Home, 
  LinkIcon, 
  LogOut, 
  Settings, 
  Shield, 
  User, 
  Search, 
  FolderOpen, 
  FileText,
  ClipboardList 
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

export default function CaseManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { hasRole, loading } = usePermissions()
  
  // Check if user is authenticated and has case manager role
  useEffect(() => {
    if (!loading) {
      const authorized = hasRole('case_manager')
      
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
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-primary-foreground">Case Manager</span>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">Case Manager Panel</span>
            </div>
            <nav className="grid gap-1 px-2">
              <PermissionAwareNavLink
                href="/dashboard/case-manager"
                isActive={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                icon={Home}
              >
                Overview
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="create_cases"
                href="/dashboard/case-manager/cases"
                isActive={activeTab === "cases"}
                onClick={() => setActiveTab("cases")}
                icon={FolderOpen}
              >
                Manage Cases
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="create_cases" 
                href="/dashboard/case-manager/new-case"
                isActive={activeTab === "new-case"}
                onClick={() => setActiveTab("new-case")}
                icon={FolderPlus}
              >
                Create New Case
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="view_evidence"
                href="/dashboard/evidence"
                isActive={activeTab === "evidence"}
                onClick={() => setActiveTab("evidence")}
                icon={FileDigit}
              >
                Evidence
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="link_evidence_to_cases"
                href="/dashboard/case-manager/link-evidence"
                isActive={activeTab === "link-evidence"}
                onClick={() => setActiveTab("link-evidence")}
                icon={LinkIcon}
              >
                Link Evidence
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
                href="/dashboard/case-manager/reports"
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
                  <TabsTrigger value="cases" className="text-sm">
                    Cases
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="text-sm">
                    Reports
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <PermissionAwareButton permission="view_evidence" variant="outline" size="sm" className="h-8 gap-1">
                    <Search className="h-3.5 w-3.5" />
                    <span className="text-xs">Search Evidence</span>
                  </PermissionAwareButton>
                  <PermissionAwareButton permission="create_cases" size="sm" className="h-8 gap-1" asChild>
                    <Link href="/dashboard/case-manager/new-case">
                      <FolderPlus className="h-3.5 w-3.5" />
                      <span className="text-xs">New Case</span>
                    </Link>
                  </PermissionAwareButton>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <DashboardStats />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Case Manager Actions</CardTitle>
                      <CardDescription>Quick access to case management functions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <PermissionAwareButton 
                          permission="create_cases"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/case-manager/new-case">
                            <FolderPlus className="h-8 w-8" />
                            <span>Create New Case</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="manage_cases"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/case-manager/cases">
                            <FolderOpen className="h-8 w-8" />
                            <span>Manage Cases</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="link_evidence_to_cases"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/case-manager/link-evidence">
                            <LinkIcon className="h-8 w-8" />
                            <span>Link Evidence</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="generate_reports"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/case-manager/reports">
                            <FileText className="h-8 w-8" />
                            <span>Generate Report</span>
                          </Link>
                        </PermissionAwareButton>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Case Statistics</CardTitle>
                      <CardDescription>Overview of case management activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Active Cases</span>
                          <span className="text-sm font-medium">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Open Investigations</span>
                          <span className="text-sm font-medium">8</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Cases Created (30d)</span>
                          <span className="text-sm font-medium">5</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Linked Evidence Items</span>
                          <span className="text-sm font-medium">43</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Case Reports Generated</span>
                          <span className="text-sm font-medium">18</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="space-y-1">
                        <CardTitle>Recent Cases</CardTitle>
                        <CardDescription>Recently created and updated cases</CardDescription>
                      </div>
                      <PermissionAwareButton permission="create_cases" variant="outline" size="sm" asChild>
                        <Link href="/dashboard/case-manager/cases">
                          View All
                        </Link>
                      </PermissionAwareButton>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          {[
                            { id: "C-2023-0107", title: "Johnson Fraud Investigation", updated: "2 hours ago", status: "Active" },
                            { id: "C-2023-0106", title: "Downtown Robbery Case", updated: "5 hours ago", status: "Active" },
                            { id: "C-2023-0105", title: "Cybersecurity Data Breach", updated: "Yesterday", status: "Active" },
                            { id: "C-2023-0104", title: "Corporate Embezzlement", updated: "2 days ago", status: "Closed" },
                          ].map((caseItem) => (
                            <div key={caseItem.id} className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{caseItem.title}</p>
                                <p className="text-sm text-muted-foreground">{caseItem.id}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  caseItem.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}>
                                  {caseItem.status}
                                </span>
                                <span className="text-xs text-muted-foreground">{caseItem.updated}</span>
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
                      <CardDescription>Recently linked evidence files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentEvidence />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="cases" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Management</CardTitle>
                    <CardDescription>View and manage all case files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Case management interface will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Reports</CardTitle>
                    <CardDescription>Generate and view case reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Report generation interface will appear here</p>
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