"use client"

import { useState, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Settings, LogOut, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePermissions } from "@/hooks/usePermissions"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
  sidebarNav: {
    href: string
    icon: typeof Shield
    label: string
    permission?: string
  }[]
  pageTitle: string
  pageDescription?: string
}

export function DashboardLayout({ 
  children, 
  sidebarNav, 
  pageTitle,
  pageDescription
}: DashboardLayoutProps) {
  const router = useRouter()
  const { currentUser } = usePermissions()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">ForensicChain</span>
            {currentUser?.role && (
              <span className="text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground capitalize">
                {currentUser.role.replace('_', ' ')}
              </span>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
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
        {/* Mobile sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-muted/40 transition-transform md:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-full flex-col gap-2 p-4 pt-20">
            <nav className="grid gap-1 px-2">
              {sidebarNav.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto grid gap-1 px-2">
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
                onClick={() => setIsSidebarOpen(false)}
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-12 items-center gap-2 px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">{pageTitle}</span>
            </div>
            <nav className="grid gap-1 px-2">
              {sidebarNav.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
              {pageDescription && (
                <p className="text-muted-foreground">{pageDescription}</p>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 