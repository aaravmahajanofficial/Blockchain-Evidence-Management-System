"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FolderOpen, FolderPlus, FileDigit, Database, BarChart3, Save, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect, Option } from "@/components/ui/multi-select"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"

// Mock investigators for assignment
const investigators = [
  { id: "1", name: "John Doe", role: "forensic_investigator" },
  { id: "2", name: "Emma Parker", role: "forensic_investigator" },
  { id: "3", name: "Sarah Johnson", role: "forensic_investigator" },
  { id: "4", name: "Michael Wong", role: "forensic_investigator" }
]

export default function NewCasePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    caseType: "",
    priority: "",
    reference: "",
    leadInvestigator: "",
    assignedInvestigators: [] as string[]
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleMultiSelectChange = (values: Option[]) => {
    setFormData(prev => ({ ...prev, assignedInvestigators: values.map(v => v.value) }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the API call to create a new case
    console.log("Creating new case:", formData)
    
    // Mock success - redirect to cases list
    setTimeout(() => {
      router.push("/dashboard/case-manager/cases")
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

  // Create the options for the MultiSelect component
  const investigatorOptions: Option[] = investigators.map(inv => ({
    label: inv.name,
    value: inv.id
  }))

  return (
    <AuthGuard roles={['case_manager']}>
      <PermissionGuard permission="create_cases">
        <DashboardLayout 
          sidebarNav={sidebarNav} 
          pageTitle="Create New Case"
          pageDescription="Set up a new investigation case and assign investigators"
        >
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
                <CardDescription>Enter the details for the new investigation case</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Case Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="Enter a descriptive title for the case"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Describe the purpose and scope of this investigation"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Case Type</Label>
                    <Select 
                      value={formData.caseType} 
                      onValueChange={(value) => handleSelectChange("caseType", value)}
                    >
                      <SelectTrigger id="caseType">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cybercrime">Cybercrime</SelectItem>
                        <SelectItem value="financial-fraud">Financial Fraud</SelectItem>
                        <SelectItem value="data-breach">Data Breach</SelectItem>
                        <SelectItem value="device-forensics">Device Forensics</SelectItem>
                        <SelectItem value="malware-analysis">Malware Analysis</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value) => handleSelectChange("priority", value)}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reference">External Reference (Optional)</Label>
                  <Input 
                    id="reference" 
                    name="reference" 
                    placeholder="Enter any reference number or ID (e.g., ticket number)"
                    value={formData.reference}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="pt-2 border-t">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Investigator Assignment
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="leadInvestigator">Lead Investigator</Label>
                      <Select 
                        value={formData.leadInvestigator} 
                        onValueChange={(value) => handleSelectChange("leadInvestigator", value)}
                      >
                        <SelectTrigger id="leadInvestigator">
                          <SelectValue placeholder="Select lead investigator" />
                        </SelectTrigger>
                        <SelectContent>
                          {investigators.map(inv => (
                            <SelectItem key={inv.id} value={inv.id}>
                              {inv.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="assignedInvestigators">Additional Investigators (Optional)</Label>
                      <MultiSelect
                        options={investigatorOptions}
                        selectedValues={formData.assignedInvestigators.map(id => 
                          investigatorOptions.find(opt => opt.value === id)!
                        )}
                        onChange={handleMultiSelectChange}
                        placeholder="Select additional investigators"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/dashboard/case-manager/cases")}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
                <Button type="submit" className="gap-1">
                  <Save className="h-4 w-4" />
                  <span>Create Case</span>
                </Button>
              </CardFooter>
            </Card>
          </form>
        </DashboardLayout>
      </PermissionGuard>
    </AuthGuard>
  )
} 