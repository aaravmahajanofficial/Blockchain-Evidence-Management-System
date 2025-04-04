"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FolderSearch, FileText, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"

// Mock data for cases
const mockCases = [
  { id: "CASE-001", title: "Digital Theft Investigation" },
  { id: "CASE-002", title: "Ransomware Attack Analysis" },
  { id: "CASE-003", title: "Email Phishing Investigation" }
]

// Mock data for evidence items
const mockEvidenceItems = [
  { id: "EVD-001", title: "Server Access Logs", type: "digital-document" },
  { id: "EVD-002", title: "Email Headers", type: "digital-document" },
  { id: "EVD-003", title: "Suspicious Executable", type: "binary-file" },
  { id: "EVD-004", title: "Network Traffic Capture", type: "network-data" }
]

export default function NewReportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    caseId: "",
    reportType: "",
    description: "",
    selectedEvidence: [] as string[]
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleEvidenceToggle = (id: string) => {
    setFormData(prev => {
      const selectedEvidence = [...prev.selectedEvidence]
      if (selectedEvidence.includes(id)) {
        return { ...prev, selectedEvidence: selectedEvidence.filter(item => item !== id) }
      } else {
        return { ...prev, selectedEvidence: [...selectedEvidence, id] }
      }
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the API call to create a new report
    console.log("Generating report:", formData)
    
    // Mock success - redirect to cases list
    setTimeout(() => {
      router.push("/dashboard/investigator")
    }, 1000)
  }
  
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
      <PermissionGuard permission="generate_reports">
        <DashboardLayout 
          sidebarNav={sidebarNav} 
          pageTitle="Generate Report"
          pageDescription="Create a new evidence report"
        >
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Report Information</CardTitle>
                <CardDescription>Create a report based on evidence from a case</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="Enter a descriptive title for the report"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseId">Related Case</Label>
                    <Select 
                      value={formData.caseId} 
                      onValueChange={(value) => handleSelectChange("caseId", value)}
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select 
                      value={formData.reportType} 
                      onValueChange={(value) => handleSelectChange("reportType", value)}
                    >
                      <SelectTrigger id="reportType">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forensic-analysis">Forensic Analysis</SelectItem>
                        <SelectItem value="evidence-summary">Evidence Summary</SelectItem>
                        <SelectItem value="timeline">Event Timeline</SelectItem>
                        <SelectItem value="findings">Investigation Findings</SelectItem>
                        <SelectItem value="technical">Technical Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Report Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Describe the purpose and scope of this report"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Include Evidence Items</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    {mockEvidenceItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={item.id} 
                          checked={formData.selectedEvidence.includes(item.id)}
                          onCheckedChange={() => handleEvidenceToggle(item.id)} 
                        />
                        <Label 
                          htmlFor={item.id} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {item.id} - {item.title} <span className="text-muted-foreground">({item.type})</span>
                        </Label>
                      </div>
                    ))}
                    {mockEvidenceItems.length === 0 && (
                      <p className="text-sm text-muted-foreground">No evidence items available for this case</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/dashboard/investigator")}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
                <Button type="submit" className="gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Generate Report</span>
                </Button>
              </CardFooter>
            </Card>
          </form>
        </DashboardLayout>
      </PermissionGuard>
    </AuthGuard>
  )
} 