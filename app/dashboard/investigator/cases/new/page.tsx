"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FolderSearch, FolderPlus, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"

export default function NewCasePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    caseType: "",
    priority: "",
    reference: ""
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the API call to create a new case
    console.log("Creating new case:", formData)
    
    // Mock success - redirect to cases list
    setTimeout(() => {
      router.push("/dashboard/investigator/cases")
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
      <PermissionGuard permission="create_cases">
        <DashboardLayout 
          sidebarNav={sidebarNav} 
          pageTitle="Create New Case"
          pageDescription="Set up a new investigation case"
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/dashboard/investigator/cases")}
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