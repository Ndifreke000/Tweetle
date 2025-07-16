"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Coins, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TokenTransfer {
  transaction_hash: string
  from_address: string
  to_address: string
  token_address: string
  token_symbol: string
  token_name: string
  amount: string
  decimals: number
  timestamp: string
  usd_value: string
}

interface TokenTransfersProps {
  contractAddress: string
  filterAddress: string
}

export default function TokenTransfers({ contractAddress, filterAddress }: TokenTransfersProps) {
  const [transfers, setTransfers] = useState<TokenTransfer[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchTransfers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/dune/token-transfers?contract=${contractAddress}&from=${filterAddress}`)
      const data = await response.json()
      setTransfers(data.transfers || [])
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching token transfers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransfers()
    const interval = setInterval(fetchTransfers, 45000) // Update every 45 seconds
    return () => clearInterval(interval)
  }, [contractAddress, filterAddress])

  const formatAmount = (amount: string, decimals: number) => {
    const num = Number.parseFloat(amount) / Math.pow(10, decimals)
    if (num < 0.001) return "<0.001"
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getTransferDirection = (transfer: TokenTransfer) => {
    return transfer.from_address.toLowerCase() === filterAddress.toLowerCase() ? "out" : "in"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Coins className="h-4 w-4" />
          Last updated: {formatDistanceToNow(lastUpdated, { addSuffix: true })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchTransfers}
          disabled={loading}
          className="flex items-center gap-2 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading && transfers.length === 0 ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {transfers.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">No token transfers found for the specified filter.</p>
              </CardContent>
            </Card>
          ) : (
            transfers.map((transfer, index) => {
              const direction = getTransferDirection(transfer)
              return (
                <Card key={`${transfer.transaction_hash}-${index}`} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          {direction === "out" ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          )}
                          <Badge variant={direction === "out" ? "destructive" : "default"}>
                            {direction === "out" ? "Outgoing" : "Incoming"}
                          </Badge>
                          <span className="text-sm font-medium">{transfer.token_symbol}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-mono bg-muted px-2 py-1 rounded">
                            {formatAddress(transfer.from_address)}
                          </span>
                          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono bg-muted px-2 py-1 rounded">
                            {formatAddress(transfer.to_address)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <p className="font-medium">
                              {formatAmount(transfer.amount, transfer.decimals)} {transfer.token_symbol}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">USD Value:</span>
                            <p className="font-medium">${Number.parseFloat(transfer.usd_value || "0").toFixed(2)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Token:</span>
                            <p className="font-medium">{transfer.token_name}</p>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <span>Tx: </span>
                          <code className="bg-muted px-1 py-0.5 rounded">
                            {formatAddress(transfer.transaction_hash)}
                          </code>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(transfer.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
