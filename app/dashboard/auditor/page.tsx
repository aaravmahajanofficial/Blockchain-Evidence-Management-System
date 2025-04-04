"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Activity, 
  AlertCircle,
  BarChart3, 
  ClipboardCheck, 
  Database, 
  FileDigit, 
  Home, 
  LineChart, 
  LogOut, 
  Search, 
  Settings, 
  Shield, 
  User, 
  FileText
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

export default function AuditorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { hasRole, loading } = usePermissions()
  
  // Check if user is authenticated and has auditor role
  useEffect(() => {
    if (!loading) {
      const authorized = hasRole('auditor')
      
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
            <span className="text-xs px-2 py-1 rounded-full bg-teal-500 text-primary-foreground">Auditor</span>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500 text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">Auditor Panel</span>
            </div>
            <nav className="grid gap-1 px-2">
              <PermissionAwareNavLink
                href="/dashboard/auditor"
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
                Evidence Records
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="verify_evidence"
                href="/dashboard/auditor/verify"
                isActive={activeTab === "verify"}
                onClick={() => setActiveTab("verify")}
                icon={ClipboardCheck}
              >
                Verification Logs
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="view_audit_trail"
                href="/dashboard/transactions"
                isActive={activeTab === "transactions"}
                onClick={() => setActiveTab("transactions")}
                icon={Database}
              >
                Transaction Audit
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="view_system_metrics"
                href="/dashboard/auditor/metrics"
                isActive={activeTab === "metrics"}
                onClick={() => setActiveTab("metrics")}
                icon={LineChart}
              >
                System Metrics
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="generate_reports"
                href="/dashboard/auditor/reports"
                isActive={activeTab === "reports"}
                onClick={() => setActiveTab("reports")}
                icon={FileText}
              >
                Audit Reports
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
                  <TabsTrigger value="audit-logs" className="text-sm">
                    Audit Logs
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="text-sm">
                    Reports
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <PermissionAwareButton permission="view_audit_trail" variant="outline" size="sm" className="h-8 gap-1">
                    <Search className="h-3.5 w-3.5" />
                    <span className="text-xs">Search Logs</span>
                  </PermissionAwareButton>
                  <PermissionAwareButton permission="generate_reports" size="sm" className="h-8 gap-1" asChild>
                    <Link href="/dashboard/auditor/reports">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="text-xs">Generate Report</span>
                    </Link>
                  </PermissionAwareButton>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <DashboardStats />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Auditor Actions</CardTitle>
                      <CardDescription>Quick access to auditing functions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <PermissionAwareButton 
                          permission="view_audit_trail"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/transactions">
                            <Database className="h-8 w-8" />
                            <span>Transaction Logs</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="view_system_metrics"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/auditor/metrics">
                            <LineChart className="h-8 w-8" />
                            <span>System Metrics</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="view_evidence"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/evidence">
                            <FileDigit className="h-8 w-8" />
                            <span>Evidence Audit</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="generate_reports"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/auditor/reports">
                            <FileText className="h-8 w-8" />
                            <span>Generate Report</span>
                          </Link>
                        </PermissionAwareButton>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                      <CardDescription>Current system status and metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">System Status</span>
                          <span className="flex items-center gap-1 text-sm text-green-500 font-medium">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Operational
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Blockchain Integrity</span>
                          <span className="text-sm font-medium">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Evidence Verification Rate</span>
                          <span className="text-sm font-medium">98.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Audit Logs Stored</span>
                          <span className="text-sm font-medium">1.2M</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Compliance Score</span>
                          <span className="text-sm font-medium">A+</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="space-y-1">
                        <CardTitle>System Alerts</CardTitle>
                        <CardDescription>Recent system notifications requiring attention</CardDescription>
                      </div>
                      <PermissionAwareButton permission="view_system_metrics" variant="outline" size="sm" asChild>
                        <Link href="/dashboard/auditor/metrics">
                          View All
                        </Link>
                      </PermissionAwareButton>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          {[
                            { id: "ALERT-1107", title: "Evidence verification failure", timestamp: "2 hours ago", severity: "High" },
                            { id: "ALERT-1106", title: "Storage capacity reaching threshold", timestamp: "5 hours ago", severity: "Medium" },
                            { id: "ALERT-1105", title: "Unusual access pattern detected", timestamp: "Yesterday", severity: "Low" },
                            { id: "ALERT-1104", title: "System backup completed", timestamp: "2 days ago", severity: "Info" },
                          ].map((alert) => (
                            <div key={alert.id} className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{alert.title}</p>
                                <p className="text-sm text-muted-foreground">{alert.id} • {alert.timestamp}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  alert.severity === "High" 
                                    ? "bg-red-100 text-red-800" 
                                    : alert.severity === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : alert.severity === "Low"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}>
                                  {alert.severity}
                                </span>
                                <Button variant="ghost" size="icon">
                                  <AlertCircle className="h-4 w-4" />
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
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Latest blockchain activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentTransactions />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="audit-logs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Log Explorer</CardTitle>
                    <CardDescription>Search and analyze system audit trails</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Audit log explorer interface will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Reports</CardTitle>
                    <CardDescription>Generate compliance and audit reports</CardDescription>
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