"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileUp, Shield, Upload, Database, Home, BarChart3, FileDigit, FolderSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AuthGuard } from "@/components/AuthGuard"
import { PermissionGuard } from "@/components/PermissionGuard"
import { formatAddress } from "@/lib/utils"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [ipfsCid, setIpfsCid] = useState("")
  const [evidenceType, setEvidenceType] = useState("")
  const [caseNumber, setCaseNumber] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate blockchain transaction and IPFS upload
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setTransactionHash("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")
      setIpfsCid("QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco")
      setUploadComplete(true)
      setUploading(false)
    }, 5000)
  }

  const sidebarNav = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard"
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
    <AuthGuard>
      <PermissionGuard permission="upload_evidence">
        <DashboardLayout
          sidebarNav={sidebarNav}
          pageTitle="Upload Evidence"
          pageDescription="Upload digital evidence to be securely stored on IPFS and verified on the blockchain"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Evidence Details</CardTitle>
                  <CardDescription>Provide information about the evidence you are uploading</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Evidence Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter a descriptive title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="evidence-type">Evidence Type</Label>
                    <Select value={evidenceType} onValueChange={setEvidenceType} required>
                      <SelectTrigger id="evidence-type">
                        <SelectValue placeholder="Select evidence type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="forensic_data">Forensic Data</SelectItem>
                        <SelectItem value="network_logs">Network Logs</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="case-number">Case Number</Label>
                    <Input 
                      id="case-number" 
                      placeholder="Enter case reference number" 
                      value={caseNumber}
                      onChange={(e) => setCaseNumber(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Provide details about this evidence" 
                      rows={4} 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Evidence File</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">Any file type (MAX. 500MB)</p>
                        </div>
                        <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} required />
                      </label>
                    </div>
                    {file && (
                      <p className="text-sm mt-2">
                        Selected file: <span className="font-medium">{file.name}</span> (
                        {(file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={uploading || !file || uploadComplete}>
                    {uploading ? "Uploading..." : uploadComplete ? "Uploaded Successfully" : "Upload Evidence"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Status</CardTitle>
                  <CardDescription>Track the progress of your evidence upload</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!uploading && !uploadComplete && (
                    <div className="flex flex-col items-center justify-center h-40 border rounded-lg bg-muted/40">
                      <Shield className="w-10 h-10 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload evidence to see status here</p>
                    </div>
                  )}

                  {uploading && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Upload Progress</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Processing Steps:</p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${uploadProgress > 20 ? "bg-green-500" : "bg-muted"}`}
                            ></div>
                            <span className={uploadProgress > 20 ? "" : "text-muted-foreground"}>Uploading file</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${uploadProgress > 40 ? "bg-green-500" : "bg-muted"}`}
                            ></div>
                            <span className={uploadProgress > 40 ? "" : "text-muted-foreground"}>Generating hash</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${uploadProgress > 60 ? "bg-green-500" : "bg-muted"}`}
                            ></div>
                            <span className={uploadProgress > 60 ? "" : "text-muted-foreground"}>Storing on IPFS</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${uploadProgress > 80 ? "bg-green-500" : "bg-muted"}`}
                            ></div>
                            <span className={uploadProgress > 80 ? "" : "text-muted-foreground"}>
                              Recording on blockchain
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${uploadProgress === 100 ? "bg-green-500" : "bg-muted"}`}
                            ></div>
                            <span className={uploadProgress === 100 ? "" : "text-muted-foreground"}>
                              Completing verification
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {uploadComplete && (
                    <div className="space-y-4">
                      <Alert className="bg-green-500/20 border-green-500">
                        <AlertTitle className="text-green-600">Upload Successful</AlertTitle>
                        <AlertDescription className="text-green-700">
                          Your evidence has been securely stored and recorded on the blockchain
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Evidence Details:</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Title:</span>
                            <span className="font-medium">{title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Case Number:</span>
                            <span className="font-medium">{caseNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">File Name:</span>
                            <span className="font-medium">{file?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="font-medium">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ""}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Blockchain Record:</p>
                        <div className="space-y-1 text-sm">
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-muted-foreground">TX Hash:</span>
                            <code className="bg-muted p-1 rounded text-xs break-all">
                              {formatAddress(transactionHash, 8)}
                            </code>
                          </div>
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-muted-foreground">IPFS CID:</span>
                            <code className="bg-muted p-1 rounded text-xs break-all">{ipfsCid}</code>
                          </div>
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-muted-foreground">Timestamp:</span>
                            <span className="font-medium">{new Date().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex gap-2">
                        <Button variant="outline" asChild>
                          <Link href="/dashboard/evidence">View Evidence List</Link>
                        </Button>
                        <Button onClick={() => {
                          setFile(null);
                          setTitle("");
                          setCaseNumber("");
                          setDescription("");
                          setEvidenceType("");
                          setUploadComplete(false);
                          setTransactionHash("");
                          setIpfsCid("");
                        }}>
                          Upload Another
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </DashboardLayout>
      </PermissionGuard>
    </AuthGuard>
  )
}

