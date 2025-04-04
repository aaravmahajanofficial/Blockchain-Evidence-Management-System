"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Database, FileDigit, FileUp, Home, Search, FolderSearch, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardStats from "@/components/dashboard-stats"
import RecentEvidence from "@/components/recent-evidence"
import RecentTransactions from "@/components/recent-transactions"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"

export default function InvestigatorDashboardPage() {
  const sidebarNav = [
    {
      href: "/dashboard/investigator",
      icon: Home,
      label: "Overview"
    },
    {
      href: "/dashboard/investigator/cases",
      icon: FolderSearch,
      label: "My Cases"
    },
    {
      href: "/dashboard/evidence",
      icon: FileDigit,
      label: "Evidence"
    },
    {
      href: "/dashboard/upload",
      icon: FileUp,
      label: "Upload Evidence",
      permission: "upload_evidence"
    },
    {
      href: "/dashboard/transactions",
      icon: Database,
      label: "Transactions"
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      label: "Analytics"
    }
  ]

  return (
    <AuthGuard roles={['forensic_investigator', 'investigator']}>
      <DashboardLayout 
        sidebarNav={sidebarNav} 
        pageTitle="Investigator Dashboard"
        pageDescription="Manage digital evidence and forensic investigations"
      >
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
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Search className="h-3.5 w-3.5" />
                <span className="text-xs">Search Evidence</span>
              </Button>
              <PermissionGuard permission="upload_evidence">
                <Link href="/dashboard/upload">
                  <Button size="sm" className="h-8 gap-1">
                    <FileUp className="h-3.5 w-3.5" />
                    <span className="text-xs">Upload Evidence</span>
                  </Button>
                </Link>
              </PermissionGuard>
            </div>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <DashboardStats />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Investigator Actions</CardTitle>
                  <CardDescription>Quick access to common investigator tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <PermissionGuard permission="upload_evidence">
                      <Link href="/dashboard/upload">
                        <Button variant="outline" className="h-24 w-full flex-col justify-center items-center gap-2 p-2">
                          <FileUp className="h-8 w-8" />
                          <span>Upload Evidence</span>
                        </Button>
                      </Link>
                    </PermissionGuard>
                    <PermissionGuard permission="create_cases">
                      <Link href="/dashboard/investigator/cases/new">
                        <Button variant="outline" className="h-24 w-full flex-col justify-center items-center gap-2 p-2">
                          <FolderSearch className="h-8 w-8" />
                          <span>Create New Case</span>
                        </Button>
                      </Link>
                    </PermissionGuard>
                    <PermissionGuard permission="generate_reports">
                      <Link href="/dashboard/investigator/reports/new">
                        <Button variant="outline" className="h-24 w-full flex-col justify-center items-center gap-2 p-2">
                          <FileText className="h-8 w-8" />
                          <span>Generate Report</span>
                        </Button>
                      </Link>
                    </PermissionGuard>
                    <PermissionGuard permission="view_evidence">
                      <Link href="/dashboard/evidence">
                        <Button variant="outline" className="h-24 w-full flex-col justify-center items-center gap-2 p-2">
                          <Search className="h-8 w-8" />
                          <span>Advanced Search</span>
                        </Button>
                      </Link>
                    </PermissionGuard>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent evidence handling activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentEvidence limit={5} />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Transactions</CardTitle>
                <CardDescription>Recent evidence recorded on the blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="cases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Cases</CardTitle>
                <CardDescription>Active investigation cases you are assigned to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Case data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>Reports of evidence and case analyses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Report data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </AuthGuard>
  )
} 