"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Clock, Database, FileDigit, FileUp, Home, LogOut, Settings, Shield, User, Users, UserPlus, Layers, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardStats from "@/components/dashboard-stats"
import RecentEvidence from "@/components/recent-evidence"
import RecentTransactions from "@/components/recent-transactions"
import { usePermissions } from "@/hooks/usePermissions"
import { PermissionAwareNavLink } from "@/components/PermissionAwareNavLink"
import { PermissionAwareButton } from "@/components/PermissionAwareButton"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { hasRole, loading } = usePermissions()
  
  // Check if user is authenticated and has admin role
  useEffect(() => {
    if (!loading) {
      const authorized = hasRole('administrator')
      
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
            <span className="text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">Admin</span>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
            <nav className="grid gap-1 px-2">
              <PermissionAwareNavLink
                href="/dashboard/admin"
                isActive={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                icon={Home}
              >
                Overview
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="user_management"
                href="/dashboard/admin/users"
                isActive={activeTab === "users"}
                onClick={() => setActiveTab("users")}
                icon={Users}
              >
                User Management
              </PermissionAwareNavLink>
              
              <PermissionAwareNavLink
                permission="system_configuration"
                href="/dashboard/admin/permissions"
                isActive={activeTab === "permissions"}
                onClick={() => setActiveTab("permissions")}
                icon={Layers}
              >
                Permissions
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
                permission="upload_evidence"
                href="/dashboard/upload"
                isActive={activeTab === "upload"}
                onClick={() => setActiveTab("upload")}
                icon={FileUp}
              >
                Upload Evidence
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
                permission="view_system_metrics"
                href="/dashboard/analytics"
                isActive={activeTab === "analytics"}
                onClick={() => setActiveTab("analytics")}
                icon={BarChart3}
              >
                Analytics
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
                  <TabsTrigger value="users" className="text-sm">
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="audit" className="text-sm">
                    Audit Logs
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <PermissionAwareButton 
                    permission="system_configuration" 
                    variant="outline" 
                    size="sm" 
                    className="h-8 gap-1"
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span className="text-xs">System Alerts</span>
                  </PermissionAwareButton>
                  <PermissionAwareButton 
                    permission="user_management" 
                    size="sm" 
                    className="h-8 gap-1"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span className="text-xs">Add User</span>
                  </PermissionAwareButton>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <DashboardStats />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Administrator Controls</CardTitle>
                      <CardDescription>System management and administrative functions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <PermissionAwareButton 
                          permission="user_management"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/admin/users">
                            <Users className="h-8 w-8" />
                            <span>User Management</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="system_configuration"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                          asChild
                        >
                          <Link href="/dashboard/admin/permissions">
                            <Layers className="h-8 w-8" />
                            <span>Role Management</span>
                          </Link>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="system_configuration"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                        >
                          <AlertTriangle className="h-8 w-8" />
                          <span>System Alerts</span>
                        </PermissionAwareButton>
                        <PermissionAwareButton 
                          permission="system_configuration"
                          variant="outline" 
                          className="h-24 flex-col justify-center items-center gap-2 p-2"
                        >
                          <Database className="h-8 w-8" />
                          <span>Blockchain Config</span>
                        </PermissionAwareButton>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>System Status</CardTitle>
                      <CardDescription>Current system health and metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">System Status</span>
                          <span className="flex items-center gap-1 text-sm text-green-500 font-medium">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Online
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Active Users</span>
                          <span className="text-sm font-medium">24</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Storage Usage</span>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">API Requests (24h)</span>
                          <span className="text-sm font-medium">12,543</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Last Backup</span>
                          <span className="text-sm font-medium">2 hours ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage system users and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">User management interface will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="audit" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>System access and operation logs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Audit logs will appear here</p>
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