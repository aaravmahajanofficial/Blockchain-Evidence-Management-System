"use client"

import { useState } from "react"
import Link from "next/link"
import { FolderOpen, FolderPlus, FileDigit, Database, BarChart3, FileText, Download, Search, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for reports
const mockReports = [
  {
    id: "RPT-001",
    title: "Digital Theft Investigation - Forensic Analysis",
    description: "Detailed forensic analysis of digital theft evidence",
    caseId: "CASE-001",
    type: "forensic-analysis",
    author: "John Doe",
    createdAt: "2023-12-15T14:30:00",
    updatedAt: "2023-12-15T16:45:00",
    status: "final",
    evidenceCount: 8
  },
  {
    id: "RPT-002",
    title: "Ransomware Attack Evidence Summary",
    description: "Summary of collected evidence for ransomware attack case",
    caseId: "CASE-002",
    type: "evidence-summary",
    author: "Sarah Johnson",
    createdAt: "2023-12-12T10:15:00",
    updatedAt: "2023-12-14T09:20:00",
    status: "final",
    evidenceCount: 5
  },
  {
    id: "RPT-003",
    title: "Email Phishing Investigation Timeline",
    description: "Timeline reconstruction of phishing attack and subsequent events",
    caseId: "CASE-003",
    type: "timeline",
    author: "Emma Parker",
    createdAt: "2023-12-05T11:30:00",
    updatedAt: "2023-12-06T14:45:00",
    status: "draft",
    evidenceCount: 12
  },
  {
    id: "RPT-004",
    title: "Digital Theft Investigation - Technical Analysis",
    description: "Technical details of methods used in digital theft",
    caseId: "CASE-001",
    type: "technical",
    author: "Michael Wong",
    createdAt: "2023-12-16T09:10:00",
    updatedAt: "2023-12-16T11:25:00",
    status: "review",
    evidenceCount: 7
  }
]

// Report type labels and colors
const reportTypeLabels = {
  "forensic-analysis": "Forensic Analysis",
  "evidence-summary": "Evidence Summary",
  "timeline": "Timeline",
  "findings": "Findings",
  "technical": "Technical Report"
}

// Status variant mappings
const statusVariants = {
  "draft": "outline",
  "review": "secondary",
  "final": "default"
}

export default function CaseManagerReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.caseId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type === typeFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesCaseFilter = activeTab === "all" || report.caseId === activeTab
    
    return matchesSearch && matchesType && matchesStatus && matchesCaseFilter
  })
  
  const sidebarNav = [
    {
      href: "/dashboard/case-manager",
      icon: BarChart3,
      label: "Overview"
    },
    {
      href: "/dashboard/case-manager/cases",
      icon: FolderOpen,
      label: "Manage Cases"
    },
    {
      href: "/dashboard/case-manager/new-case",
      icon: FolderPlus,
      label: "Create New Case",
      permission: "create_cases"
    },
    {
      href: "/dashboard/evidence",
      icon: FileDigit,
      label: "Evidence",
      permission: "view_evidence"
    },
    {
      href: "/dashboard/case-manager/link-evidence",
      icon: Database,
      label: "Link Evidence",
      permission: "link_evidence_to_cases"
    },
    {
      href: "/dashboard/transactions",
      icon: Database,
      label: "Transactions",
      permission: "view_audit_trail"
    },
    {
      href: "/dashboard/case-manager/reports",
      icon: FileText,
      label: "Reports",
      permission: "generate_reports"
    }
  ]

  // Unique case IDs for tab filtering
  const uniqueCaseIds = Array.from(new Set(mockReports.map(report => report.caseId)))

  return (
    <AuthGuard roles={['case_manager']}>
      <PermissionGuard permission="generate_reports">
        <DashboardLayout 
          sidebarNav={sidebarNav} 
          pageTitle="Investigation Reports"
          pageDescription="View and manage reports for all cases"
        >
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-1 max-w-md items-center space-x-2">
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" className="shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <PermissionGuard permission="generate_reports">
                <Button size="sm" className="gap-1 whitespace-nowrap" asChild>
                  <Link href="/dashboard/case-manager/reports/new">
                    <PlusCircle className="h-4 w-4" />
                    <span>Generate Report</span>
                  </Link>
                </Button>
              </PermissionGuard>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="forensic-analysis">Forensic Analysis</SelectItem>
                  <SelectItem value="evidence-summary">Evidence Summary</SelectItem>
                  <SelectItem value="timeline">Timeline</SelectItem>
                  <SelectItem value="findings">Findings</SelectItem>
                  <SelectItem value="technical">Technical Report</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="border-b pb-0">
                <TabsTrigger value="all" className="text-sm">
                  All Cases
                </TabsTrigger>
                {uniqueCaseIds.map(caseId => (
                  <TabsTrigger key={caseId} value={caseId} className="text-sm">
                    {caseId}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0 pt-0">
                <div className="grid gap-4">
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <Card key={report.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold">{report.title}</h3>
                                <Badge 
                                  variant={statusVariants[report.status as keyof typeof statusVariants]} 
                                  className="capitalize"
                                >
                                  {report.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{report.description}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                                <span>ID: {report.id}</span>
                                <span>Case: {report.caseId}</span>
                                <span>Type: {reportTypeLabels[report.type as keyof typeof reportTypeLabels]}</span>
                                <span>Author: {report.author}</span>
                                <span>Last Updated: {new Date(report.updatedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="sm:ml-4 mt-4 sm:mt-0 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="gap-1" asChild>
                                <Link href={`/dashboard/case-manager/reports/${report.id}`}>
                                  <FileText className="h-3.5 w-3.5" />
                                  <span>View</span>
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Download className="h-3.5 w-3.5" />
                                <span>Download</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-medium">No reports found</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {searchTerm || typeFilter !== "all" || statusFilter !== "all" ? 
                              "Try adjusting your search filters" : 
                              "No reports have been generated yet"}
                          </p>
                          <PermissionGuard permission="generate_reports">
                            <Button className="mt-4" size="sm" asChild>
                              <Link href="/dashboard/case-manager/reports/new">Generate New Report</Link>
                            </Button>
                          </PermissionGuard>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DashboardLayout>
      </PermissionGuard>
    </AuthGuard>
  )
} 