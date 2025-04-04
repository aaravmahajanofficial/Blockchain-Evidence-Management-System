"use client"

import { useState } from "react"
import Link from "next/link"
import { FolderOpen, FolderPlus, ChevronRight, Filter, FileDigit, Database, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"

// Mock data for cases
const mockCases = [
  {
    id: "CASE-001",
    title: "Digital Theft Investigation",
    description: "Investigation into unauthorized access to corporate financial records",
    status: "active",
    investigator: "John Doe",
    assignedTo: ["John Doe", "Emma Parker"],
    created: "2023-12-10T09:30:00",
    evidence_count: 12
  },
  {
    id: "CASE-002",
    title: "Ransomware Attack Analysis",
    description: "Analysis of ransomware attack on municipal systems",
    status: "active",
    investigator: "Sarah Johnson",
    assignedTo: ["Sarah Johnson", "Michael Wong"],
    created: "2023-12-05T11:15:00",
    evidence_count: 8
  },
  {
    id: "CASE-003",
    title: "Email Phishing Investigation",
    description: "Investigation into targeted phishing campaign against executives",
    status: "closed",
    investigator: "Emma Parker",
    assignedTo: ["Emma Parker"],
    created: "2023-11-22T14:45:00",
    evidence_count: 15
  },
  {
    id: "CASE-004",
    title: "Network Intrusion Analysis",
    description: "Investigation of suspicious network activity indicating potential breach",
    status: "pending",
    investigator: "Michael Wong",
    assignedTo: [],
    created: "2023-12-15T10:20:00",
    evidence_count: 3
  }
]

export default function CaseManagerCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.investigator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter
    
    return matchesSearch && matchesStatus
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
    }
  ]

  return (
    <AuthGuard roles={['case_manager']}>
      <DashboardLayout 
        sidebarNav={sidebarNav} 
        pageTitle="Case Management"
        pageDescription="View and manage all investigation cases"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex w-full max-w-sm space-x-2">
              <Input
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PermissionGuard permission="create_cases">
              <Button size="sm" className="gap-1 whitespace-nowrap" asChild>
                <Link href="/dashboard/case-manager/new-case">
                  <FolderPlus className="h-4 w-4" />
                  <span>Create New Case</span>
                </Link>
              </Button>
            </PermissionGuard>
          </div>

          <div className="grid gap-4">
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <Card key={caseItem.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{caseItem.title}</h3>
                          <Badge 
                            variant={
                              caseItem.status === "active" ? "default" : 
                              caseItem.status === "pending" ? "outline" : 
                              "secondary"
                            } 
                            className="capitalize"
                          >
                            {caseItem.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                          <span>ID: {caseItem.id}</span>
                          <span>Lead: {caseItem.investigator}</span>
                          <span>Evidence: {caseItem.evidence_count} items</span>
                          <span>Created: {new Date(caseItem.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="sm:ml-4 mt-4 sm:mt-0 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="gap-1" asChild>
                          <Link href={`/dashboard/case-manager/cases/${caseItem.id}`}>
                            <span>Details</span>
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                        </Button>
                        <PermissionGuard permission="assign_investigators">
                          <Button variant="outline" size="sm" className="gap-1" asChild>
                            <Link href={`/dashboard/case-manager/cases/${caseItem.id}/assign`}>
                              <span>Assign</span>
                            </Link>
                          </Button>
                        </PermissionGuard>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No cases found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchTerm ? "Try adjusting your search filters" : "No cases have been created yet"}
                    </p>
                    <PermissionGuard permission="create_cases">
                      <Button className="mt-4" size="sm" asChild>
                        <Link href="/dashboard/case-manager/new-case">Create New Case</Link>
                      </Button>
                    </PermissionGuard>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
} 