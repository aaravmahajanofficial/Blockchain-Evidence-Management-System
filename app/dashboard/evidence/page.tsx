"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Clock, Download, ExternalLink, FileDigit, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample evidence data
const evidenceData = [
  {
    id: "EVD-001",
    title: "Hard Drive Image - Suspect A",
    caseNumber: "CASE-2024-001",
    dateUploaded: "2024-04-01",
    status: "verified",
    type: "disk-image",
    investigator: "John Doe",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    ipfsCid: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
  },
  {
    id: "EVD-002",
    title: "Network Traffic Logs",
    caseNumber: "CASE-2024-001",
    dateUploaded: "2024-04-02",
    status: "verified",
    type: "log-file",
    investigator: "Jane Smith",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    ipfsCid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  },
  {
    id: "EVD-003",
    title: "Memory Dump - Server B",
    caseNumber: "CASE-2024-002",
    dateUploaded: "2024-04-03",
    status: "pending",
    type: "memory-dump",
    investigator: "John Doe",
    txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    ipfsCid: "QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V",
  },
  {
    id: "EVD-004",
    title: "Email Correspondence Backup",
    caseNumber: "CASE-2024-003",
    dateUploaded: "2024-04-04",
    status: "verified",
    type: "email-archive",
    investigator: "Sarah Johnson",
    txHash: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc",
    ipfsCid: "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn",
  },
  {
    id: "EVD-005",
    title: "Mobile Device Extraction",
    caseNumber: "CASE-2024-003",
    dateUploaded: "2024-04-05",
    status: "verified",
    type: "mobile-extraction",
    investigator: "Michael Brown",
    txHash: "0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
    ipfsCid: "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A",
  },
]

export default function EvidencePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter evidence based on search term and filters
  const filteredEvidence = evidenceData.filter((evidence) => {
    const matchesSearch =
      evidence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evidence.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evidence.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || evidence.status === statusFilter
    const matchesType = typeFilter === "all" || evidence.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

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
          <FileDigit className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Evidence Management</h1>
          <p className="text-muted-foreground">View and manage all digital evidence files</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evidence Records</CardTitle>
          <CardDescription>Browse and search through all evidence files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title, case number, or ID..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Filter:</span>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="disk-image">Disk Image</SelectItem>
                  <SelectItem value="log-file">Log File</SelectItem>
                  <SelectItem value="memory-dump">Memory Dump</SelectItem>
                  <SelectItem value="email-archive">Email Archive</SelectItem>
                  <SelectItem value="mobile-extraction">Mobile Extraction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Case Number</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Investigator</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvidence.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No evidence found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvidence.map((evidence) => (
                    <TableRow key={evidence.id}>
                      <TableCell className="font-medium">{evidence.id}</TableCell>
                      <TableCell>{evidence.title}</TableCell>
                      <TableCell>{evidence.caseNumber}</TableCell>
                      <TableCell>{evidence.dateUploaded}</TableCell>
                      <TableCell>
                        <Badge
                          variant={evidence.status === "verified" ? "default" : "outline"}
                          className="flex w-fit items-center gap-1"
                        >
                          {evidence.status === "verified" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          <span className="capitalize">{evidence.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{evidence.investigator}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/evidence/${evidence.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

