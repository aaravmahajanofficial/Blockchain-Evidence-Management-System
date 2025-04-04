"use client"

import { useState } from "react"
import Link from "next/link"
import { FolderSearch, FolderPlus, ChevronRight, Filter } from "lucide-react"
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
    created: "2023-12-10T09:30:00",
    evidence_count: 12
  },
  {
    id: "CASE-002",
    title: "Ransomware Attack Analysis",
    description: "Analysis of ransomware attack on municipal systems",
    status: "active",
    investigator: "John Doe",
    created: "2023-12-05T11:15:00",
    evidence_count: 8
  },
  {
    id: "CASE-003",
    title: "Email Phishing Investigation",
    description: "Investigation into targeted phishing campaign against executives",
    status: "closed",
    investigator: "John Doe",
    created: "2023-11-22T14:45:00",
    evidence_count: 15
  }
]

export default function InvestigatorCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  const sidebarNav = [
    {
      href: "/dashboard/investigator",
      icon: FolderSearch,
      label: "Overview"
    },
    {
      href: "/dashboard/investigator/cases",
      icon: FolderSearch,
      label: "My Cases"
    },
    {
      href: "/dashboard/evidence",
      icon: FolderSearch,
      label: "Evidence"
    },
    {
      href: "/dashboard/upload",
      icon: FolderSearch,
      label: "Upload Evidence",
      permission: "upload_evidence"
    },
    {
      href: "/dashboard/transactions",
      icon: FolderSearch,
      label: "Transactions"
    },
    {
      href: "/dashboard/analytics",
      icon: FolderSearch,
      label: "Analytics"
    }
  ]

  return (
    <AuthGuard roles={['forensic_investigator', 'investigator']}>
      <DashboardLayout 
        sidebarNav={sidebarNav} 
        pageTitle="My Cases"
        pageDescription="Manage and view your assigned investigation cases"
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
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PermissionGuard permission="create_cases">
              <Button size="sm" className="gap-1 whitespace-nowrap" asChild>
                <Link href="/dashboard/investigator/cases/new">
                  <FolderPlus className="h-4 w-4" />
                  <span>New Case</span>
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
                          <Badge variant={caseItem.status === "active" ? "default" : "secondary"} className="capitalize">
                            {caseItem.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                          <span>ID: {caseItem.id}</span>
                          <span>Evidence: {caseItem.evidence_count} items</span>
                          <span>Created: {new Date(caseItem.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="sm:ml-4 mt-4 sm:mt-0">
                        <Button variant="outline" size="sm" className="gap-1" asChild>
                          <Link href={`/dashboard/investigator/cases/${caseItem.id}`}>
                            <span>View Details</span>
                            <ChevronRight className="h-3 w-3" />
                          </Link>
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
                    <FolderSearch className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No cases found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchTerm ? "Try adjusting your search filters" : "You don't have any cases assigned yet"}
                    </p>
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