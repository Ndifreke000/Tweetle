"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, ExternalLink, Clock, Hash, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Transaction {
  hash: string
  from_address: string
  to_address: string
  value: string
  gas_used: string
  gas_price: string
  timestamp: string
  status: string
  method: string
  block_number: string
}

interface TransactionsListProps {
  contractAddress: string
  filterAddress: string
}

export default function TransactionsList({ contractAddress, filterAddress }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/dune/transactions?contract=${contractAddress}&from=${filterAddress}`)
      const data = await response.json()
      setTransactions(data.transactions || [])
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
    const interval = setInterval(fetchTransactions, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [contractAddress, filterAddress])

  const formatValue = (value: string) => {
    const num = Number.parseFloat(value)
    if (num === 0) return "0"
    if (num < 0.001) return "<0.001"
    return num.toFixed(6)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last updated: {formatDistanceToNow(lastUpdated, { addSuffix: true })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchTransactions}
          disabled={loading}
          className="flex items-center gap-2 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading && transactions.length === 0 ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">No transactions found for the specified filter.</p>
              </CardContent>
            </Card>
          ) : (
            transactions.map((tx) => (
              <Card key={tx.hash} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{formatAddress(tx.hash)}</code>
                        <Badge variant={tx.status === "success" ? "default" : "destructive"}>{tx.status}</Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono bg-muted px-2 py-1 rounded">{formatAddress(tx.from_address)}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono bg-muted px-2 py-1 rounded">{formatAddress(tx.to_address)}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Value:</span>
                          <p className="font-medium">{formatValue(tx.value)} ETH</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gas Used:</span>
                          <p className="font-medium">{Number.parseInt(tx.gas_used).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Method:</span>
                          <p className="font-medium">{tx.method || "Transfer"}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Block:</span>
                          <p className="font-medium">#{tx.block_number}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
