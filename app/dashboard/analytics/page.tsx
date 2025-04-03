"use client"

import Link from "next/link"
import { BarChart, Database, FileDigit, PieChart, Shield, TrendingUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
              >
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Transactions</span>
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-accent transition-all"
              >
                <BarChart className="h-4 w-4" />
                <span className="text-sm font-medium">Analytics</span>
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
                <p className="text-muted-foreground">View detailed statistics about evidence and chain activity.</p>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Tabs defaultValue="overview">
                    <div className="flex flex-col gap-6 w-full">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <TabsList>
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="evidence">Evidence</TabsTrigger>
                          <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        </TabsList>
                        
                        <div className="flex items-center gap-2">
                          <Select defaultValue="30d">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select Period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7d">Last 7 days</SelectItem>
                              <SelectItem value="30d">Last 30 days</SelectItem>
                              <SelectItem value="90d">Last 90 days</SelectItem>
                              <SelectItem value="1y">Last year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Total Evidence</CardTitle>
                              <FileDigit className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">2,853</div>
                              <p className="text-xs text-muted-foreground">
                                +12% from last month
                              </p>
                              {/* Mock Bar Chart */}
                              <div className="mt-4 h-16 w-full rounded-md bg-gradient-to-r from-muted/70 to-primary/30 opacity-80"></div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                              <Database className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">124</div>
                              <p className="text-xs text-muted-foreground">
                                +4% from last month
                              </p>
                              {/* Mock Line Chart */}
                              <div className="mt-4 h-16 w-full rounded-md bg-gradient-to-r from-muted/70 via-primary/40 to-primary/30 opacity-80"></div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Blockchain Transactions</CardTitle>
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">12,543</div>
                              <p className="text-xs text-muted-foreground">
                                +18% from last month
                              </p>
                              {/* Mock Bar Chart */}
                              <div className="mt-4 h-16 w-full rounded-md bg-gradient-to-r from-muted/70 to-primary/30 opacity-80"></div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                              <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">86</div>
                              <p className="text-xs text-muted-foreground">
                                +2% from last month
                              </p>
                              {/* Mock Line Chart */}
                              <div className="mt-4 h-16 w-full rounded-md bg-gradient-to-r from-muted/70 via-primary/40 to-primary/30 opacity-80"></div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card className="col-span-1">
                            <CardHeader>
                              <CardTitle>Evidence Growth</CardTitle>
                              <CardDescription>
                                Monthly evidence uploads over time
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                              {/* Mock Line Chart */}
                              <div className="aspect-[4/3] w-full rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                            </CardContent>
                          </Card>
                          <Card className="col-span-1">
                            <CardHeader>
                              <CardTitle>Evidence Types</CardTitle>
                              <CardDescription>
                                Distribution by type of evidence
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                              {/* Mock Pie Chart */}
                              <div className="aspect-square w-full max-w-xs rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80 rounded-full"></div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                          <Card className="col-span-4">
                            <CardHeader>
                              <CardTitle>Transaction Volume</CardTitle>
                              <CardDescription>
                                Daily blockchain transaction volume
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                              {/* Mock Bar Chart */}
                              <div className="aspect-[16/9] w-full rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                            </CardContent>
                          </Card>
                          <Card className="col-span-3">
                            <CardHeader>
                              <CardTitle>Chain Health</CardTitle>
                              <CardDescription>
                                System performance metrics
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Network Latency</span>
                                    <span className="font-medium">45ms</span>
                                  </div>
                                  <div className="h-2 w-full rounded-full bg-muted">
                                    <div className="h-2 w-1/5 rounded-full bg-primary"></div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Block Generation</span>
                                    <span className="font-medium">12.5s</span>
                                  </div>
                                  <div className="h-2 w-full rounded-full bg-muted">
                                    <div className="h-2 w-3/5 rounded-full bg-primary"></div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Verification Time</span>
                                    <span className="font-medium">2.3s</span>
                                  </div>
                                  <div className="h-2 w-full rounded-full bg-muted">
                                    <div className="h-2 w-4/5 rounded-full bg-primary"></div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Node Availability</span>
                                    <span className="font-medium">99.98%</span>
                                  </div>
                                  <div className="h-2 w-full rounded-full bg-muted">
                                    <div className="h-2 w-[99.98%] rounded-full bg-primary"></div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="evidence" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <Card className="col-span-2">
                            <CardHeader>
                              <CardTitle>Evidence Upload Trends</CardTitle>
                              <CardDescription>
                                Monthly upload volume by evidence type
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                              {/* Mock Stacked Bar Chart */}
                              <div className="aspect-[16/9] w-full rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardTitle>Evidence by Size</CardTitle>
                              <CardDescription>
                                Distribution by storage requirements
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              {/* Mock Donut Chart */}
                              <div className="aspect-square w-full max-w-[200px] mx-auto rounded-full border-8 border-muted bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                              <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/80"></div>
                                    <span className="text-sm">Under 1GB</span>
                                  </div>
                                  <span className="text-sm font-medium">42%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/60"></div>
                                    <span className="text-sm">1GB - 10GB</span>
                                  </div>
                                  <span className="text-sm font-medium">28%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/40"></div>
                                    <span className="text-sm">10GB - 100GB</span>
                                  </div>
                                  <span className="text-sm font-medium">18%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                                    <span className="text-sm">Over 100GB</span>
                                  </div>
                                  <span className="text-sm font-medium">12%</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Evidence Access Patterns</CardTitle>
                            <CardDescription>
                              Number of accesses by evidence type over time
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pl-2">
                            {/* Mock Line Chart */}
                            <div className="aspect-[21/9] w-full rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="transactions" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle>Transaction Types</CardTitle>
                              <CardDescription>
                                Distribution by transaction category
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              {/* Mock Pie Chart */}
                              <div className="aspect-square w-full max-w-[200px] mx-auto rounded-full bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                              <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/80"></div>
                                    <span className="text-sm">Upload</span>
                                  </div>
                                  <span className="text-sm font-medium">35%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/60"></div>
                                    <span className="text-sm">Access</span>
                                  </div>
                                  <span className="text-sm font-medium">28%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/40"></div>
                                    <span className="text-sm">Verification</span>
                                  </div>
                                  <span className="text-sm font-medium">22%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                                    <span className="text-sm">Other</span>
                                  </div>
                                  <span className="text-sm font-medium">15%</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardTitle>Transaction Volume</CardTitle>
                              <CardDescription>
                                Daily transaction count
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                              {/* Mock Bar Chart */}
                              <div className="aspect-[4/3] w-full rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Transaction Performance</CardTitle>
                            <CardDescription>
                              Processing time and confirmation metrics
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-8">
                              <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-medium">Average Confirmation Time</h3>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">13.4s</span>
                                    <span className="text-xs text-green-500">-2.3s</span>
                                  </div>
                                  {/* Mock Sparkline */}
                                  <div className="h-10 w-32 rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-medium">Transaction Success Rate</h3>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">99.8%</span>
                                    <span className="text-xs text-green-500">+0.3%</span>
                                  </div>
                                  {/* Mock Sparkline */}
                                  <div className="h-10 w-32 rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-medium">Gas Usage</h3>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">0.0021 ETH</span>
                                    <span className="text-xs text-red-500">+0.0002</span>
                                  </div>
                                  {/* Mock Sparkline */}
                                  <div className="h-10 w-32 rounded-md bg-gradient-to-r from-muted/70 via-primary/20 to-primary/40 opacity-80"></div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 