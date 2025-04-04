"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, Shield, User, Settings, Key, Lock, LogOut, File, FileText, FileUp, Database, BarChart3, FileDigit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthGuard } from "@/components/AuthGuard"
import { DashboardLayout } from "@/components/DashboardLayout"
import { usePermissions } from "@/hooks/usePermissions"

export default function ProfilePage() {
  const { currentUser } = usePermissions()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [organization, setOrganization] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {
    // Populate form with user data
    if (currentUser) {
      setName(currentUser.name || '')
      setEmail(currentUser.email || '')
      setOrganization(currentUser.organization || '')
    }
  }, [currentUser])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Update localStorage with new data
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          name,
          email,
          organization
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
      setIsSaving(false)
      alert("Profile updated successfully")
    }, 1000)
  }
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match")
      return
    }
    
    setIsChangingPassword(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsChangingPassword(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      alert("Password changed successfully")
    }, 1000)
  }

  const sidebarNav = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard"
    },
    {
      href: "/profile",
      icon: User,
      label: "Profile"
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
      href: "/settings",
      icon: Settings,
      label: "Settings"
    }
  ]

  return (
    <AuthGuard>
      <DashboardLayout
        sidebarNav={sidebarNav}
        pageTitle="Profile"
        pageDescription="Manage your account details and preferences"
      >
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general" className="text-sm">General</TabsTrigger>
            <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
            <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <Card>
              <form onSubmit={handleProfileUpdate}>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input 
                      id="role" 
                      value={currentUser?.role ? currentUser.role.replace('_', ' ') : ''} 
                      readOnly 
                      disabled 
                    />
                    <p className="text-xs text-muted-foreground">Your role cannot be changed. Contact an administrator for role changes.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input 
                      id="organization" 
                      value={organization} 
                      onChange={(e) => setOrganization(e.target.value)} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications about evidence updates</p>
                    </div>
                    <div className="h-6 w-11 cursor-pointer rounded-full bg-primary p-1">
                      <div className="h-4 w-4 rounded-full bg-white translate-x-5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications" className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text messages for critical alerts</p>
                    </div>
                    <div className="h-6 w-11 cursor-pointer rounded-full bg-muted p-1">
                      <div className="h-4 w-4 rounded-full bg-muted-foreground"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <form onSubmit={handlePasswordChange}>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                  </div>
                  <Button variant="outline" className="gap-1">
                    <Lock className="h-4 w-4" />
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage devices where you're currently logged in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Computer className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Current Browser</p>
                        <p className="text-xs text-muted-foreground">Windows • Chrome • IP {getRandomIP()}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-green-500">Active Now</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-destructive" size="sm">
                  Sign Out All Other Devices
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your account activity history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generateActivityItems()}
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">
                  View Full Activity Log
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </AuthGuard>
  )
}

// Icon component for activity log
function Computer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )
}

// Helper function to generate a random IP address for demo purposes
function getRandomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

// Helper function to generate activity items for the profile page
function generateActivityItems() {
  const activities = [
    { 
      icon: <LogOut className="h-4 w-4" />, 
      action: "Logged in", 
      time: "Just now", 
      details: "Chrome on Windows" 
    },
    { 
      icon: <FileUp className="h-4 w-4" />, 
      action: "Uploaded evidence", 
      time: "2 hours ago", 
      details: "network_logs_case123.pcap" 
    },
    { 
      icon: <FileDigit className="h-4 w-4" />, 
      action: "Viewed evidence", 
      time: "Yesterday", 
      details: "image_evidence_case456.jpg" 
    },
    { 
      icon: <File className="h-4 w-4" />, 
      action: "Generated report", 
      time: "3 days ago", 
      details: "Case #789 Summary" 
    },
    { 
      icon: <Lock className="h-4 w-4" />, 
      action: "Changed password", 
      time: "1 week ago", 
      details: "" 
    }
  ]
  
  return activities.map((item, index) => (
    <div key={index} className="flex items-center gap-4">
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        {item.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{item.action}</p>
          <span className="text-xs text-muted-foreground">{item.time}</span>
        </div>
        {item.details && <p className="text-sm text-muted-foreground">{item.details}</p>}
      </div>
    </div>
  ))
} 