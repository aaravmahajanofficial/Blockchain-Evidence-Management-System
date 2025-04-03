"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronDown, Database, Download, Filter, FileDigit, Info, Search, Shield, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    type: true,
    status: true,
    date: true,
    evidence: true,
    user: true,
    hash: true,
  })

  // Mock transactions data
  const allTransactions = [
    {
      id: "TX-1289",
      type: "upload",
      status: "confirmed",
      date: "2023-07-15 14:32:45",
      evidence: "Hard Drive Image #HD-1234",
      user: { name: "John Doe", avatar: "/avatars/john.png", initials: "JD" },
      hash: "0x7ab8d9e2f3c1a5b6d0e9f8g7h6j5k4l3m2n1p0",
      gas: "0.0024 ETH",
      notes: "Initial evidence upload for Case #A1289"
    },
    {
      id: "TX-1290",
      type: "access",
      status: "confirmed",
      date: "2023-07-14 10:15:22",
      evidence: "Memory Dump #MD-5678",
      user: { name: "Alice Smith", avatar: "/avatars/alice.png", initials: "AS" },
      hash: "0x8bc9e0f3g4d2a6c7e0f9g8h7j6k5l4m3n2p1q0",
      gas: "0.0018 ETH",
      notes: "Access granted to Detective Team"
    },
    {
      id: "TX-1291",
      type: "verification",
      status: "pending",
      date: "2023-07-14 09:45:12",
      evidence: "Network Logs #NL-9012",
      user: { name: "Bob Johnson", avatar: "/avatars/bob.png", initials: "BJ" },
      hash: "0x9cd0e1f4g5e3b7d8f0g9h8i7j6k5l4m3n2p1q0",
      gas: "0.0021 ETH",
      notes: "Verification of log integrity"
    },
    {
      id: "TX-1292",
      type: "transfer",
      status: "confirmed",
      date: "2023-07-13 15:28:36",
      evidence: "Mobile Device Image #MD-3456",
      user: { name: "Carol Miller", avatar: "/avatars/carol.png", initials: "CM" },
      hash: "0x0de1f2g3h4i5j6k7l8m9n0p1q2r3s4t5u6v7w8",
      gas: "0.0019 ETH",
      notes: "Transfer of evidence to external lab"
    },
    {
      id: "TX-1293",
      type: "upload",
      status: "confirmed",
      date: "2023-07-12 11:42:18",
      evidence: "Email Archive #EA-7890",
      user: { name: "John Doe", avatar: "/avatars/john.png", initials: "JD" },
      hash: "0x1ef2g3h4i5j6k7l8m9n0p1q2r3s4t5u6v7w8x9",
      gas: "0.0031 ETH",
      notes: "Upload of encrypted email archives"
    },
    {
      id: "TX-1294",
      type: "modification",
      status: "failed",
      date: "2023-07-11 16:09:53",
      evidence: "Hard Drive Image #HD-1234",
      user: { name: "Dave Wilson", avatar: "/avatars/dave.png", initials: "DW" },
      hash: "0x2fg3h4i5j6k7l8m9n0p1q2r3s4t5u6v7w8x9y0",
      gas: "0.0015 ETH",
      notes: "Attempted metadata correction"
    },
    {
      id: "TX-1295",
      type: "access",
      status: "confirmed",
      date: "2023-07-10 08:54:27",
      evidence: "Mobile Device Image #MD-3456",
      user: { name: "Eve Adams", avatar: "/avatars/eve.png", initials: "EA" },
      hash: "0x3gh4i5j6k7l8m9n0p1q2r3s4t5u6v7w8x9y0z1",
      gas: "0.0017 ETH",
      notes: "Access by case prosecutor"
    },
    {
      id: "TX-1296",
      type: "verification",
      status: "confirmed",
      date: "2023-07-09 14:36:05",
      evidence: "Email Archive #EA-7890",
      user: { name: "Frank Thomas", avatar: "/avatars/frank.png", initials: "FT" },
      hash: "0x4hi5j6k7l8m9n0p1q2r3s4t5u6v7w8x9y0z1a2",
      gas: "0.0020 ETH",
      notes: "Periodic integrity verification"
    },
    {
      id: "TX-1297",
      type: "upload",
      status: "pending",
      date: "2023-07-08 09:27:41",
      evidence: "Cloud Storage Dump #CS-1234",
      user: { name: "Grace Lee", avatar: "/avatars/grace.png", initials: "GL" },
      hash: "0x5ij6k7l8m9n0p1q2r3s4t5u6v7w8x9y0z1a2b3",
      gas: "0.0028 ETH",
      notes: "New evidence for Case #B4567"
    },
    {
      id: "TX-1298",
      type: "transfer",
      status: "confirmed",
      date: "2023-07-07 13:19:32",
      evidence: "Disk Image #DI-5678",
      user: { name: "Henry Brown", avatar: "/avatars/henry.png", initials: "HB" },
      hash: "0x6jk7l8m9n0p1q2r3s4t5u6v7w8x9y0z1a2b3c4",
      gas: "0.0022 ETH",
      notes: "Transfer to secure archive"
    }
  ]

  // Filter transactions based on search and filters
  const filteredTransactions = allTransactions.filter(tx => {
    const matchesSearch = searchQuery === "" || 
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.evidence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.notes && tx.notes.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    const matchesType = typeFilter === "all" || tx.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  // Status badge style
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Type badge style
  const getTypeBadge = (type: string) => {
    switch(type) {
      case "upload":
        return <Badge variant="secondary">Upload</Badge>
      case "access":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Access</Badge>
      case "verification":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Verification</Badge>
      case "transfer":
        return <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">Transfer</Badge>
      case "modification":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Modification</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">ForensicChain</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Database className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-12 items-center gap-2 px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
            <nav className="grid gap-1 px-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
              >
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Overview</span>
              </Link>
              <Link
                href="/dashboard/evidence"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
              >
                <FileDigit className="h-4 w-4" />
                <span className="text-sm font-medium">Evidence</span>
              </Link>
              <Link
                href="/dashboard/transactions"
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-accent transition-all"
              >
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Transactions</span>
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
              >
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Analytics</span>
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <div className="flex flex-col">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Blockchain Transactions</h1>
                <p className="text-muted-foreground">View and verify all evidence chain transactions.</p>
              </div>
              
              <Tabs defaultValue="all" className="mt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All Transactions</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span className="text-xs">Export</span>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span>Status</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[140px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span>Type</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="upload">Upload</SelectItem>
                        <SelectItem value="access">Access</SelectItem>
                        <SelectItem value="verification">Verification</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="modification">Modification</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-1">
                          <span>Columns</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.id}
                          onCheckedChange={(value) => setVisibleColumns({...visibleColumns, id: value})}
                        >
                          ID
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.type}
                          onCheckedChange={(value) => setVisibleColumns({...visibleColumns, type: value})}
                        >
                          Type
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.status}
                          onCheckedChange={(value) => setVisibleColumns({...visibleColumns, status: value})}
                        >
                          Status
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.date}
                          onCheckedChange={(value) => setVisibleColumns({...visibleColumns, date: value})}
                        >
                          Date
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.evidence}
                          onCheckedChange={(value) => setVisibleColumns({...visibleColumns, evidence: value})}
                        >
                          Evidence
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.user}
                          onCheckedChange={(value) => setVisibleColumns({...visibleColumns, user: value})}
                        >
                          User
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.hash}
                          onCheckedChange={(value) => setVisibleColumns({...visibleColumns, hash: value})}
                        >
                          Hash
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <TabsContent value="all" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {visibleColumns.id && <TableHead>Transaction ID</TableHead>}
                            {visibleColumns.type && <TableHead>Type</TableHead>}
                            {visibleColumns.status && <TableHead>Status</TableHead>}
                            {visibleColumns.date && <TableHead>Date</TableHead>}
                            {visibleColumns.evidence && <TableHead>Evidence</TableHead>}
                            {visibleColumns.user && <TableHead>User</TableHead>}
                            {visibleColumns.hash && <TableHead>Hash</TableHead>}
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedTransactions.map((tx) => (
                            <TableRow key={tx.id}>
                              {visibleColumns.id && <TableCell className="font-medium">{tx.id}</TableCell>}
                              {visibleColumns.type && <TableCell>{getTypeBadge(tx.type)}</TableCell>}
                              {visibleColumns.status && <TableCell>{getStatusBadge(tx.status)}</TableCell>}
                              {visibleColumns.date && <TableCell>{tx.date}</TableCell>}
                              {visibleColumns.evidence && <TableCell>{tx.evidence}</TableCell>}
                              {visibleColumns.user && (
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={tx.user.avatar} alt={tx.user.name} />
                                      <AvatarFallback>{tx.user.initials}</AvatarFallback>
                                    </Avatar>
                                    <span>{tx.user.name}</span>
                                  </div>
                                </TableCell>
                              )}
                              {visibleColumns.hash && (
                                <TableCell>
                                  <div className="flex items-center">
                                    <span className="truncate max-w-[140px]">{tx.hash}</span>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                            <Info className="h-3.5 w-3.5" />
                                            <span className="sr-only">Transaction Details</span>
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="font-mono text-xs">{tx.hash}</p>
                                          <p className="text-xs mt-1">Gas: {tx.gas}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </TableCell>
                              )}
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {paginatedTransactions.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="h-24 text-center">
                                No transactions found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t p-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {Math.min(filteredTransactions.length, (currentPage - 1) * itemsPerPage + 1)} - {Math.min(filteredTransactions.length, currentPage * itemsPerPage)} of {filteredTransactions.length} transactions
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recent" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Transactions from the last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {allTransactions.slice(0, 5).map((tx, index) => (
                          <div key={tx.id}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="rounded-full bg-primary/10 p-2">
                                  <Database className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{tx.id}</span>
                                    {getTypeBadge(tx.type)}
                                    {getStatusBadge(tx.status)}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{tx.date}</span>
                                    <span>•</span>
                                    <span>{tx.evidence}</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                            {index < 4 && <Separator className="my-4" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pending" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Transactions</CardTitle>
                      <CardDescription>Transactions awaiting confirmation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {allTransactions
                          .filter(tx => tx.status === "pending")
                          .map((tx, index, array) => (
                            <div key={tx.id}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="rounded-full bg-yellow-100 p-2">
                                    <Database className="h-4 w-4 text-yellow-700" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{tx.id}</span>
                                      {getTypeBadge(tx.type)}
                                      {getStatusBadge(tx.status)}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <span>{tx.date}</span>
                                      <span>•</span>
                                      <span>{tx.evidence}</span>
                                    </div>
                                    {tx.notes && (
                                      <p className="mt-1 text-sm text-muted-foreground">{tx.notes}</p>
                                    )}
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">Verify</Button>
                              </div>
                              {index < array.length - 1 && <Separator className="my-4" />}
                            </div>
                          ))}
                        {allTransactions.filter(tx => tx.status === "pending").length === 0 && (
                          <div className="flex h-24 items-center justify-center text-center text-muted-foreground">
                            No pending transactions.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 