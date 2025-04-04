"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FolderOpen, FolderPlus, FileDigit, Database, BarChart3, Link as LinkIcon, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for cases
const mockCases = [
  { id: "CASE-001", title: "Digital Theft Investigation" },
  { id: "CASE-002", title: "Ransomware Attack Analysis" },
  { id: "CASE-003", title: "Email Phishing Investigation" }
]

// Mock data for evidence items
const mockEvidenceItems = [
  { 
    id: "EVD-001", 
    title: "Server Access Logs", 
    type: "digital-document",
    hash: "7e9f4b1239c8e2f9b0e1a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    dateUploaded: "2023-12-10T09:30:00",
    uploader: "John Doe",
    caseId: null
  },
  { 
    id: "EVD-002", 
    title: "Email Headers", 
    type: "digital-document",
    hash: "5a4b3c2d1e0f9g8h7i6j5k4l3m2n1o0p9q8r7s6t5u4v3w2x1y0z9a8b7c6d5e",
    dateUploaded: "2023-12-11T14:25:00",
    uploader: "Emma Parker",
    caseId: null
  },
  { 
    id: "EVD-003", 
    title: "Suspicious Executable", 
    type: "binary-file",
    hash: "2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g",
    dateUploaded: "2023-12-12T11:45:00",
    uploader: "Sarah Johnson",
    caseId: "CASE-001"
  },
  { 
    id: "EVD-004", 
    title: "Network Traffic Capture", 
    type: "network-data",
    hash: "8h7g6f5e4d3c2b1a0z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d",
    dateUploaded: "2023-12-13T16:20:00",
    uploader: "Michael Wong",
    caseId: "CASE-002"
  }
]

export default function LinkEvidencePage() {
  const router = useRouter()
  const [selectedCase, setSelectedCase] = useState("")
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  
  // Filter evidence items based on search term
  const filteredEvidence = mockEvidenceItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const handleEvidenceToggle = (id: string) => {
    setSelectedEvidence(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id)
      } else {
        return [...prev, id]
      }
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCase || selectedEvidence.length === 0) {
      alert("Please select a case and at least one evidence item")
      return
    }
    
    // Here would be the API call to link evidence to case
    console.log(`Linking evidence ${selectedEvidence.join(", ")} to case ${selectedCase}`)
    
    // Mock success - show success message or redirect
    setTimeout(() => {
      alert("Evidence successfully linked to case")
      setSelectedEvidence([])
    }, 1000)
  }
  
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
      <PermissionGuard permission="link_evidence_to_cases">
        <DashboardLayout 
          sidebarNav={sidebarNav} 
          pageTitle="Link Evidence to Cases"
          pageDescription="Associate evidence items with appropriate investigation cases"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Select Case</CardTitle>
                  <CardDescription>Choose the case to link evidence to</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="caseId">Target Case</Label>
                    <Select 
                      value={selectedCase} 
                      onValueChange={setSelectedCase}
                    >
                      <SelectTrigger id="caseId">
                        <SelectValue placeholder="Select a case" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCases.map(caseItem => (
                          <SelectItem key={caseItem.id} value={caseItem.id}>
                            {caseItem.id} - {caseItem.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Select Evidence</CardTitle>
                  <CardDescription>Choose the evidence items to link to the selected case</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="searchEvidence">Search Evidence</Label>
                    <Input
                      id="searchEvidence"
                      placeholder="Search by ID, title, or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="border rounded-md">
                    {filteredEvidence.length > 0 ? (
                      <div className="divide-y">
                        {filteredEvidence.map(item => (
                          <div 
                            key={item.id} 
                            className={`p-4 ${item.caseId && item.caseId !== selectedCase ? 'bg-muted/40' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox 
                                id={item.id} 
                                checked={selectedEvidence.includes(item.id)}
                                onCheckedChange={() => handleEvidenceToggle(item.id)}
                                disabled={Boolean(item.caseId) && item.caseId !== selectedCase}
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Label 
                                    htmlFor={item.id} 
                                    className={`font-medium cursor-pointer ${
                                      item.caseId && item.caseId !== selectedCase ? 'text-muted-foreground' : ''
                                    }`}
                                  >
                                    {item.title}
                                  </Label>
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {item.type.replace('-', ' ')}
                                  </Badge>
                                  {item.caseId && (
                                    <Badge 
                                      variant={item.caseId === selectedCase ? "default" : "secondary"}
                                      className="text-xs"
                                    >
                                      {item.caseId === selectedCase ? 'Already in this case' : `In case ${item.caseId}`}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  <span className="font-medium">ID:</span> {item.id} | 
                                  <span className="font-medium"> Uploaded:</span> {new Date(item.dateUploaded).toLocaleString()} | 
                                  <span className="font-medium"> By:</span> {item.uploader}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 font-mono break-all">
                                  <span className="font-medium">Hash:</span> {item.hash}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <FileDigit className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">No evidence items found matching your search criteria</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                      {selectedEvidence.length} items selected
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setSelectedEvidence([])}
                        disabled={selectedEvidence.length === 0}
                      >
                        Clear Selection
                      </Button>
                      <Button 
                        type="submit" 
                        className="gap-1"
                        disabled={!selectedCase || selectedEvidence.length === 0}
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span>Link to Case</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </DashboardLayout>
      </PermissionGuard>
    </AuthGuard>
  )
} 