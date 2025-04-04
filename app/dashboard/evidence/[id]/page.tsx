"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Clock, Download, ExternalLink, FileDigit, History, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useParams } from "next/navigation"
import { PermissionAwareButton } from "@/components/PermissionAwareButton"

export default function EvidenceDetailPage() {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  
  // Get params using the useParams hook
  const params = useParams()
  const evidenceId = params.id as string || "EVD-001"

  // This would normally fetch the evidence details based on the ID
  // For demo purposes, we're using hardcoded data
  const evidence = {
    id: evidenceId,
    title: "Hard Drive Image - Suspect A",
    caseNumber: "CASE-2024-001",
    dateUploaded: "2024-04-01T14:32:15Z",
    status: "verified",
    type: "disk-image",
    size: "256.4 GB",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    investigator: "John Doe",
    department: "Digital Forensics Unit",
    description:
      "Full disk image of suspect's primary hard drive. Contains operating system, user files, and deleted data recovered during initial investigation.",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    ipfsCid: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    blockNumber: 12345678,
    timestamp: "2024-04-01T14:35:22Z",
    chainOfCustody: [
      {
        action: "Created",
        actor: "John Doe",
        timestamp: "2024-04-01T14:32:15Z",
        details: "Evidence initially uploaded to the system",
      },
      {
        action: "Verified",
        actor: "System",
        timestamp: "2024-04-01T14:35:22Z",
        details: "Hash verified and recorded on blockchain",
      },
      {
        action: "Accessed",
        actor: "Jane Smith",
        timestamp: "2024-04-02T09:15:43Z",
        details: "Evidence accessed for case review",
      },
      {
        action: "Verified",
        actor: "Michael Brown",
        timestamp: "2024-04-03T11:22:05Z",
        details: "Manual verification performed",
      },
    ],
  }

  const handleVerify = () => {
    setVerifying(true)
    // Simulate verification process
    setTimeout(() => {
      setVerifying(false)
      setVerified(true)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link
          href="/dashboard/evidence"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Evidence List
        </Link>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <Badge variant={evidence.status === "verified" ? "default" : "outline"} className="flex items-center gap-1">
            {evidence.status === "verified" ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
            <span className="capitalize">{evidence.status}</span>
          </Badge>
          <Badge variant="outline" className="capitalize">
            {evidence.type.replace("-", " ")}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{evidence.title}</h1>
        <p className="text-muted-foreground">
          {evidence.id} • Case: {evidence.caseNumber} • Uploaded: {new Date(evidence.dateUploaded).toLocaleString()}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              <TabsTrigger value="custody">Chain of Custody</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evidence Information</CardTitle>
                  <CardDescription>Detailed information about this evidence file</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Title</p>
                      <p className="text-sm text-muted-foreground">{evidence.title}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Case Number</p>
                      <p className="text-sm text-muted-foreground">{evidence.caseNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Evidence ID</p>
                      <p className="text-sm text-muted-foreground">{evidence.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-sm text-muted-foreground capitalize">{evidence.type.replace("-", " ")}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Size</p>
                      <p className="text-sm text-muted-foreground">{evidence.size}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Upload Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(evidence.dateUploaded).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Investigator</p>
                      <p className="text-sm text-muted-foreground">{evidence.investigator}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Department</p>
                      <p className="text-sm text-muted-foreground">{evidence.department}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground">{evidence.description}</p>
                  </div>

                  <Separator />

                  <div className="space-y-1">
                    <p className="text-sm font-medium">SHA-256 Hash</p>
                    <p className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto">{evidence.hash}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <PermissionAwareButton 
                  permission="download_evidence"
                  variant="outline" 
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Evidence
                </PermissionAwareButton>
                <PermissionAwareButton
                  permission="verify_evidence"
                  className="gap-2" 
                  onClick={handleVerify} 
                  disabled={verifying || verified}
                >
                  {verifying ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : verified ? (
                    <>
                      <Check className="h-4 w-4" />
                      Verified
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      Verify Integrity
                    </>
                  )}
                </PermissionAwareButton>
              </div>

              {verified && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <Check className="h-4 w-4 text-green-500" />
                  <AlertTitle>Verification Successful</AlertTitle>
                  <AlertDescription>
                    The evidence hash has been verified against the blockchain record and is authentic.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="blockchain" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Information</CardTitle>
                  <CardDescription>Details of the blockchain record for this evidence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Transaction Hash</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto flex-1">
                        {evidence.txHash}
                      </p>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View on Etherscan</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">IPFS Content ID (CID)</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto flex-1">
                        {evidence.ipfsCid}
                      </p>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View on IPFS Gateway</span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Block Number</p>
                      <p className="text-sm text-muted-foreground">{evidence.blockNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Timestamp</p>
                      <p className="text-sm text-muted-foreground">{new Date(evidence.timestamp).toLocaleString()}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Smart Contract Details</p>
                    <div className="rounded-md bg-muted p-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Contract Address</p>
                        <p className="text-xs font-mono">0x9876543210fedcba9876543210fedcba98765432</p>
                      </div>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Function Called</p>
                        <p className="text-xs font-mono">
                          recordEvidence(bytes32 hash, string ipfsCid, string metadata)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>Current verification status of this evidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="border-green-500/50 bg-green-500/10">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertTitle>Verified on Blockchain</AlertTitle>
                    <AlertDescription>
                      This evidence has been cryptographically verified and recorded on the Ethereum blockchain. The
                      hash stored on-chain matches the file hash, confirming its authenticity and integrity.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custody" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chain of Custody</CardTitle>
                  <CardDescription>Complete audit trail of all actions performed on this evidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l">
                    {evidence.chainOfCustody.map((event, index) => (
                      <div key={index} className="mb-8 relative">
                        <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <History className="h-5 w-5 text-primary" />
                        </div>
                        <div className="pt-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <p className="font-medium">{event.action}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-sm mb-1">By: {event.actor}</p>
                          <p className="text-sm text-muted-foreground">{event.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Custody Log
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Available actions for this evidence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Evidence
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleVerify}
                disabled={verifying || verified}
              >
                {verifying ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : verified ? (
                  <>
                    <Check className="h-4 w-4" />
                    Verified
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Verify Integrity
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View on Etherscan
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View on IPFS Gateway
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Evidence</CardTitle>
              <CardDescription>Other evidence from the same case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/dashboard/evidence/EVD-002" className="block p-3 rounded-lg border hover:bg-accent">
                <div className="flex items-center gap-2 mb-1">
                  <FileDigit className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">Network Traffic Logs</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">EVD-002</p>
                  <Badge variant="outline" className="text-xs">
                    Verified
                  </Badge>
                </div>
              </Link>

              <Link href="/dashboard/evidence/EVD-006" className="block p-3 rounded-lg border hover:bg-accent">
                <div className="flex items-center gap-2 mb-1">
                  <FileDigit className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">Browser History Export</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">EVD-006</p>
                  <Badge variant="outline" className="text-xs">
                    Verified
                  </Badge>
                </div>
              </Link>

              <Link href="/dashboard/evidence/EVD-008" className="block p-3 rounded-lg border hover:bg-accent">
                <div className="flex items-center gap-2 mb-1">
                  <FileDigit className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">System Registry Snapshot</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">EVD-008</p>
                  <Badge variant="outline" className="text-xs">
                    Pending
                  </Badge>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

