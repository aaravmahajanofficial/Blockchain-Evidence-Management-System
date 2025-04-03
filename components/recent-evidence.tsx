import { Check, Clock, FileDigit } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function RecentEvidence() {
  const recentEvidence = [
    {
      id: "EVD-005",
      title: "Mobile Device Extraction",
      caseNumber: "CASE-2024-003",
      dateUploaded: "2024-04-05",
      status: "verified",
      investigator: "Michael Brown",
    },
    {
      id: "EVD-004",
      title: "Email Correspondence Backup",
      caseNumber: "CASE-2024-003",
      dateUploaded: "2024-04-04",
      status: "verified",
      investigator: "Sarah Johnson",
    },
    {
      id: "EVD-003",
      title: "Memory Dump - Server B",
      caseNumber: "CASE-2024-002",
      dateUploaded: "2024-04-03",
      status: "pending",
      investigator: "John Doe",
    },
    {
      id: "EVD-002",
      title: "Network Traffic Logs",
      caseNumber: "CASE-2024-001",
      dateUploaded: "2024-04-02",
      status: "verified",
      investigator: "Jane Smith",
    },
    {
      id: "EVD-001",
      title: "Hard Drive Image - Suspect A",
      caseNumber: "CASE-2024-001",
      dateUploaded: "2024-04-01",
      status: "verified",
      investigator: "John Doe",
    },
  ]

  return (
    <div className="space-y-8">
      {recentEvidence.map((evidence) => (
        <div key={evidence.id} className="flex items-start gap-4">
          <div className="rounded-md bg-primary/10 p-2">
            <FileDigit className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/evidence/${evidence.id}`} className="font-medium hover:underline">
                {evidence.title}
              </Link>
              <Badge
                variant={evidence.status === "verified" ? "default" : "outline"}
                className="ml-auto flex items-center gap-1"
              >
                {evidence.status === "verified" ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                <span className="capitalize">{evidence.status}</span>
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {evidence.id} • Case: {evidence.caseNumber}
            </div>
            <div className="text-sm text-muted-foreground">
              Uploaded on {evidence.dateUploaded} by {evidence.investigator}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Link href="/dashboard/evidence" className="text-sm text-muted-foreground hover:text-primary hover:underline">
          View all evidence
        </Link>
      </div>
    </div>
  )
}

