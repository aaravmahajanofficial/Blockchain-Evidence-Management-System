import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  Database, 
  FileDigit, 
  Lock, 
  Shield, 
  Search, 
  Clock, 
  LucideIcon,
  CheckCircle2,
  BookOpenCheck,
  BarChartHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
      <CardHeader className="space-y-1">
        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ForensicChain</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link href="#workflow" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] z-0"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background z-10"></div>
          
          <div className="container px-4 md:px-6 relative z-20">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  <span>Blockchain-Powered</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Digital Forensics <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Evidence Management</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Secure, immutable, and transparent management of digital forensic evidence using blockchain
                    technology. Designed for law enforcement and forensic investigators.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 gap-1">
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
                <div className="relative w-full h-[350px] overflow-hidden rounded-lg border border-border/50 shadow-xl bg-gradient-to-br from-background/80 to-background">
                  {/* Abstract blockchain visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-8">
                      <div className="flex flex-col items-center justify-center p-4 bg-primary/5 backdrop-blur-sm rounded-lg shadow-sm border border-primary/10 hover:border-primary/30 transition-all">
                        <FileDigit className="h-10 w-10 mb-2 text-primary" />
                        <span className="text-sm font-medium">Secure Evidence</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-primary/5 backdrop-blur-sm rounded-lg shadow-sm border border-primary/10 hover:border-primary/30 transition-all">
                        <Database className="h-10 w-10 mb-2 text-primary" />
                        <span className="text-sm font-medium">IPFS Storage</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-primary/5 backdrop-blur-sm rounded-lg shadow-sm border border-primary/10 hover:border-primary/30 transition-all">
                        <Lock className="h-10 w-10 mb-2 text-primary" />
                        <span className="text-sm font-medium">Immutable Records</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-primary/5 backdrop-blur-sm rounded-lg shadow-sm border border-primary/10 hover:border-primary/30 transition-all">
                        <Shield className="h-10 w-10 mb-2 text-primary" />
                        <span className="text-sm font-medium">Chain of Custody</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose ForensicChain?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines the security of blockchain technology with the ease of use needed for digital
                  forensics investigations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <FeatureCard 
                icon={Lock}
                title="Secure Evidence Storage"
                description="All evidence is cryptographically hashed and stored on IPFS with blockchain verification for tamper-proof security."
              />
              <FeatureCard 
                icon={Database}
                title="Decentralized Architecture"
                description="Leveraging Ethereum and IPFS for a truly decentralized evidence management system with no single point of failure."
              />
              <FeatureCard 
                icon={Shield}
                title="Immutable Audit Trail"
                description="Every action is recorded on the blockchain, creating an immutable chain of custody that cannot be altered."
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">Benefits</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Transform Your Evidence Management</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ForensicChain provides significant advantages over traditional evidence management systems.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left benefit cards */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Court-Admissible Evidence</h3>
                    <p className="text-muted-foreground">Blockchain timestamping and cryptographic verification ensure evidence is admissible in court.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Time-stamped Evidence</h3>
                    <p className="text-muted-foreground">Each piece of evidence is immutably time-stamped on the blockchain, providing irrefutable proof of when it was collected.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Advanced Search Capabilities</h3>
                    <p className="text-muted-foreground">Quickly locate and retrieve evidence with our powerful search tools and metadata indexing.</p>
                  </div>
                </div>
              </div>
              
              {/* Right benefit cards */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChartHorizontal className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Comprehensive Analytics</h3>
                    <p className="text-muted-foreground">Gain insights into evidence patterns and case progress with built-in analytics and reporting tools.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpenCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Regulatory Compliance</h3>
                    <p className="text-muted-foreground">Built with compliance in mind, helping organizations meet legal and regulatory requirements for evidence handling.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Granular Access Control</h3>
                    <p className="text-muted-foreground">Role-based permissions ensure only authorized personnel can access, modify, or view specific evidence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="workflow" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Streamlined Evidence Management</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our intuitive workflow ensures secure, transparent evidence management from collection to courtroom.
                </p>
              </div>
            </div>
            
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2"></div>
              
              {/* Timeline items */}
              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="md:flex md:justify-end mb-8 md:mb-0 relative">
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6 max-w-md hover:border-primary/20 hover:shadow-md transition-all">
                      <div className="absolute -left-4 md:left-auto md:-right-12 top-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">1</div>
                      <h3 className="text-xl font-bold mb-2">Evidence Collection</h3>
                      <p className="text-muted-foreground">Investigators collect digital evidence following standardized protocols to maintain integrity.</p>
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
                
                {/* Step 2 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="hidden md:block"></div>
                  <div className="relative">
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6 max-w-md hover:border-primary/20 hover:shadow-md transition-all">
                      <div className="absolute -left-4 top-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">2</div>
                      <h3 className="text-xl font-bold mb-2">Secure Upload</h3>
                      <p className="text-muted-foreground">Evidence is uploaded to the platform, where it's encrypted, hashed, and stored on IPFS.</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="md:flex md:justify-end mb-8 md:mb-0 relative">
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6 max-w-md hover:border-primary/20 hover:shadow-md transition-all">
                      <div className="absolute -left-4 md:left-auto md:-right-12 top-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">3</div>
                      <h3 className="text-xl font-bold mb-2">Blockchain Verification</h3>
                      <p className="text-muted-foreground">Evidence hashes and metadata are recorded on the blockchain to ensure immutability and transparency.</p>
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
                
                {/* Step 4 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="hidden md:block"></div>
                  <div className="relative">
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6 max-w-md hover:border-primary/20 hover:shadow-md transition-all">
                      <div className="absolute -left-4 top-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">4</div>
                      <h3 className="text-xl font-bold mb-2">Chain of Custody</h3>
                      <p className="text-muted-foreground">Every access and transfer is logged, creating an unbreakable chain of custody for court admissibility.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Securing Your Evidence
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your Evidence Management?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mx-auto">
                  Join law enforcement agencies and forensic investigators worldwide who trust ForensicChain.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 gap-1">
                    Get Started Today
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
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/30">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ForensicChain</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Secure, immutable, and transparent management of digital forensic evidence using cutting-edge blockchain technology.
            </p>
          </div>
          <div className="ml-auto grid gap-8 sm:grid-cols-3">
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Platform</h3>
              <nav className="grid gap-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">
                  Features
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Security
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <nav className="grid gap-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Guides
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Support
                </Link>
              </nav>
            </div>
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <nav className="grid gap-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2024 ForensicChain. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

