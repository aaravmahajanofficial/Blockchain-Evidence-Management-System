"use client"

import Link from "next/link"
import { ArrowLeft, BadgeCheck, Calendar, FileDigit, Mail, MapPin, MessageSquare, Phone, Shield, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  // Mock user data
  const user = {
    id: "1234",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/profile-avatar.png",
    department: "Digital Forensics",
    location: "New York, USA",
    phone: "+1 (555) 123-4567",
    verified: true,
    joinDate: "January 2022",
    bio: "Senior Digital Forensics Investigator with over 8 years of experience in criminal investigations and evidence handling. Specializing in digital evidence acquisition and chain of custody management.",
    skills: ["Digital Forensics", "Evidence Handling", "Chain of Custody", "Data Recovery", "Malware Analysis"],
    stats: {
      evidenceUploaded: 127,
      casesWorked: 42,
      teamMembers: 8,
      certificationsEarned: 5
    },
    badges: [
      { name: "Evidence Expert", date: "2023-08-15", level: "Advanced" },
      { name: "Chain Master", date: "2023-05-20", level: "Expert" },
      { name: "Blockchain Certified", date: "2022-11-08", level: "Intermediate" }
    ],
    recentActivity: [
      { type: "upload", description: "Uploaded hard drive image for Case #A1289", date: "2023-07-15" },
      { type: "case", description: "Joined Case #B4567 as lead investigator", date: "2023-07-10" },
      { type: "comment", description: "Added comment on Evidence #45678", date: "2023-07-05" },
      { type: "access", description: "Granted access to Detective Smith for Evidence #12345", date: "2023-07-01" }
    ]
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">ForensicChain</span>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto">
        <div className="container p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Profile Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  {user.verified && (
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{user.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <Button variant="outline">Message</Button>
                <Link href="/settings">
                  <Button>Edit Profile</Button>
                </Link>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="badges">Badges & Certifications</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{user.bio}</p>
                      <div className="mt-6">
                        <h3 className="mb-2 font-medium">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map(skill => (
                            <div key={skill} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                        <CardDescription>Overview of your activity</CardDescription>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{user.stats.evidenceUploaded}</p>
                          <p className="text-xs text-muted-foreground">Evidence Uploaded</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{user.stats.casesWorked}</p>
                          <p className="text-xs text-muted-foreground">Cases Worked</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{user.stats.teamMembers}</p>
                          <p className="text-xs text-muted-foreground">Team Members</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{user.stats.certificationsEarned}</p>
                          <p className="text-xs text-muted-foreground">Certifications</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Alice Smith</p>
                            <p className="text-xs text-muted-foreground">Digital Forensics</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>BJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Bob Johnson</p>
                            <p className="text-xs text-muted-foreground">Evidence Specialist</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>CM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Carol Miller</p>
                            <p className="text-xs text-muted-foreground">Data Analyst</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.recentActivity.map((activity, index) => (
                        <div key={index}>
                          <div className="flex items-start gap-4">
                            <div className="mt-1 rounded-md bg-primary/10 p-2">
                              {activity.type === "upload" && <FileDigit className="h-4 w-4 text-primary" />}
                              {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-primary" />}
                              {activity.type === "case" && <Users className="h-4 w-4 text-primary" />}
                              {activity.type === "access" && <Shield className="h-4 w-4 text-primary" />}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                          {index < user.recentActivity.length - 1 && <Separator className="my-4" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Badges Tab */}
              <TabsContent value="badges">
                <Card>
                  <CardHeader>
                    <CardTitle>Badges & Certifications</CardTitle>
                    <CardDescription>Your achieved accolades and qualifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.badges.map((badge, index) => (
                        <div key={index} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-primary/10 p-3">
                              <BadgeCheck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{badge.name}</h3>
                              <p className="text-sm text-muted-foreground">Earned on {badge.date}</p>
                            </div>
                          </div>
                          <div className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                            {badge.level}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="mb-4 text-lg font-medium">Available Certifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <h4 className="font-medium">Advanced Forensic Analysis</h4>
                            <p className="text-sm text-muted-foreground">Complete 10 more cases to earn</p>
                          </div>
                          <Button variant="outline">Start</Button>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <h4 className="font-medium">Blockchain Evidence Expert</h4>
                            <p className="text-sm text-muted-foreground">Validate 20 more evidence items</p>
                          </div>
                          <Button variant="outline">Start</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
} 