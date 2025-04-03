import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function RecentTransactions() {
  const transactions = [
    {
      id: "0x1234...abcd",
      type: "Evidence Upload",
      status: "confirmed",
      time: "10 minutes ago",
      block: 12345678,
    },
    {
      id: "0xabcd...5678",
      type: "Verification",
      status: "confirmed",
      time: "2 hours ago",
      block: 12345670,
    },
    {
      id: "0x5678...efgh",
      type: "Evidence Upload",
      status: "confirmed",
      time: "5 hours ago",
      block: 12345665,
    },
    {
      id: "0xefgh...9012",
      type: "Chain of Custody Update",
      status: "confirmed",
      time: "1 day ago",
      block: 12345600,
    },
    {
      id: "0x9012...ijkl",
      type: "Evidence Upload",
      status: "confirmed",
      time: "2 days ago",
      block: 12345550,
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{tx.type}</p>
              <p className="text-xs text-muted-foreground">
                {tx.time} • Block #{tx.block}
              </p>
            </div>
          </div>
          <div className="ml-auto font-mono text-xs">
            <Link href="#" className="flex items-center gap-1 hover:text-primary">
              {tx.id}
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Link
          href="/dashboard/transactions"
          className="text-sm text-muted-foreground hover:text-primary hover:underline"
        >
          View all transactions
        </Link>
      </div>
    </div>
  )
}

