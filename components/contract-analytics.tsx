"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, DollarSign, Users, Zap, TrendingUp, Clock } from "lucide-react"

interface AnalyticsData {
  totalTransactions: number
  totalVolume: string
  uniqueAddresses: number
  averageGasUsed: string
  successRate: number
  dailyTransactions: Array<{ date: string; count: number }>
  topMethods: Array<{ method: string; count: number }>
  gasEfficiency: number
}

interface ContractAnalyticsProps {
  contractAddress: string
  filterAddress: string
}

export default function ContractAnalytics({ contractAddress, filterAddress }: ContractAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/dune/analytics?contract=${contractAddress}&from=${filterAddress}`)
        const data = await response.json()
        setAnalytics(data.analytics)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
    const interval = setInterval(fetchAnalytics, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [contractAddress, filterAddress])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Unable to load analytics data.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From filtered address</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Number.parseFloat(analytics.totalVolume).toFixed(4)} ETH</div>
            <p className="text-xs text-muted-foreground">Cumulative transaction value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Addresses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueAddresses}</div>
            <p className="text-xs text-muted-foreground">Interacted with contract</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.successRate.toFixed(1)}%</div>
            <Progress value={analytics.successRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Gas Efficiency
            </CardTitle>
            <CardDescription>Average gas usage and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Average Gas Used</span>
              <Badge variant="secondary">{Number.parseInt(analytics.averageGasUsed).toLocaleString()}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Gas Efficiency Score</span>
              <Badge variant={analytics.gasEfficiency > 80 ? "default" : "secondary"}>{analytics.gasEfficiency}%</Badge>
            </div>
            <Progress value={analytics.gasEfficiency} className="mt-2" />
            <p className="text-xs text-muted-foreground">Based on optimal gas usage patterns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Top Methods
            </CardTitle>
            <CardDescription>Most frequently called contract methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topMethods.slice(0, 5).map((method, index) => (
                <div key={method.method} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-sm font-medium">{method.method || "Transfer"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{method.count}</span>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(method.count / analytics.topMethods[0].count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Transaction Activity</CardTitle>
          <CardDescription>Transaction volume over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.dailyTransactions.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm font-medium">{day.date}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{day.count} txns</span>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(day.count / Math.max(...analytics.dailyTransactions.map((d) => d.count))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
