"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileUp, Shield, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [ipfsCid, setIpfsCid] = useState("")

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

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <FileUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upload Evidence</h1>
          <p className="text-muted-foreground">
            Upload digital evidence to be securely stored on IPFS and verified on the blockchain
          </p>
        </div>
      </div>

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
                <Input id="title" placeholder="Enter a descriptive title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="case-number">Case Number</Label>
                <Input id="case-number" placeholder="Enter case reference number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Provide details about this evidence" rows={4} required />
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
                  <Alert className="border-green-500/50 bg-green-500/10">
                    <Shield className="h-4 w-4 text-green-500" />
                    <AlertTitle>Upload Successful</AlertTitle>
                    <AlertDescription>Your evidence has been securely uploaded and verified</AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Transaction Details:</p>
                    <div className="rounded-md bg-muted p-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Transaction Hash</p>
                        <p className="text-xs break-all">{transactionHash}</p>
                      </div>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium">IPFS CID</p>
                        <p className="text-xs break-all">{ipfsCid}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link href="/dashboard/evidence">
                      <Button variant="outline" size="sm">
                        View All Evidence
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
              <CardDescription>How your evidence is secured</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Blockchain Verification</h3>
                <p className="text-xs text-muted-foreground">
                  All evidence is cryptographically hashed and recorded on the Ethereum blockchain, creating an
                  immutable record of when the evidence was submitted and by whom.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Decentralized Storage</h3>
                <p className="text-xs text-muted-foreground">
                  Files are stored on IPFS (InterPlanetary File System), a distributed and decentralized storage network
                  that ensures your evidence cannot be tampered with.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Chain of Custody</h3>
                <p className="text-xs text-muted-foreground">
                  Every access and action related to the evidence is recorded, maintaining a complete and verifiable
                  chain of custody for legal proceedings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

