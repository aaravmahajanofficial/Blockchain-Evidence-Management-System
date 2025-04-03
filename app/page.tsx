import Link from "next/link"
import { ArrowRight, Database, FileDigit, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">ForensicChain</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Blockchain-Based Digital Forensics Evidence Management
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Secure, immutable, and transparent management of digital forensic evidence using blockchain
                    technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[350px] bg-slate-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-8">
                      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                        <FileDigit className="h-10 w-10 mb-2 text-slate-800" />
                        <span className="text-sm font-medium">Secure Evidence</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                        <Database className="h-10 w-10 mb-2 text-slate-800" />
                        <span className="text-sm font-medium">IPFS Storage</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                        <Lock className="h-10 w-10 mb-2 text-slate-800" />
                        <span className="text-sm font-medium">Immutable Records</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                        <Shield className="h-10 w-10 mb-2 text-slate-800" />
                        <span className="text-sm font-medium">Chain of Custody</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose ForensicChain?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines the security of blockchain technology with the ease of use needed for digital
                  forensics.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                  <Lock className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure Evidence Storage</h3>
                  <p className="text-gray-500">
                    All evidence is cryptographically hashed and stored on IPFS with blockchain verification.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                  <Database className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Decentralized Architecture</h3>
                  <p className="text-gray-500">
                    Leveraging Ethereum and IPFS for a truly decentralized evidence management system.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Immutable Audit Trail</h3>
                  <p className="text-gray-500">
                    Every action is recorded on the blockchain, creating an immutable chain of custody.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="text-xl font-bold">ForensicChain</span>
            </div>
            <p className="text-sm text-gray-500">
              Secure, immutable, and transparent management of digital forensic evidence.
            </p>
          </div>
          <div className="ml-auto grid gap-8 sm:grid-cols-3">
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Platform</h3>
              <nav className="grid gap-2 text-sm text-gray-500">
                <Link href="#" className="hover:underline">
                  Features
                </Link>
                <Link href="#" className="hover:underline">
                  Security
                </Link>
                <Link href="#" className="hover:underline">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <nav className="grid gap-2 text-sm text-gray-500">
                <Link href="#" className="hover:underline">
                  Documentation
                </Link>
                <Link href="#" className="hover:underline">
                  Guides
                </Link>
                <Link href="#" className="hover:underline">
                  Support
                </Link>
              </nav>
            </div>
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <nav className="grid gap-2 text-sm text-gray-500">
                <Link href="#" className="hover:underline">
                  Privacy
                </Link>
                <Link href="#" className="hover:underline">
                  Terms
                </Link>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">© 2024 ForensicChain. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

