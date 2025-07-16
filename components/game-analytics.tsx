"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Twitter,
  Users,
  Activity,
  UserCheck,
  PlayCircle,
  TrendingUp,
  Calendar,
  RefreshCw,
  Trophy,
  Target,
  MessageSquare,
  Hash,
} from "lucide-react"

interface GameMetrics {
  totalGamesPlayed: number
  totalContractInteractions: number
  uniqueWalletsInteracted: number
  playsPerPlayer: number
  registeredPlayers: number
  dailyActiveUsers: number
  weeklyGrowth: number
  averageGuesses: number
  successRate: number
  topPlayers: Array<{ address: string; gamesPlayed: number; winRate: number }>
  gameTypeDistribution: Array<{ type: string; count: number; percentage: number }>
  hourlyActivity: Array<{ hour: number; games: number }>
}

interface GameAnalyticsProps {
  contractAddress: string
  filterAddress: string
}

export default function GameAnalytics({ contractAddress, filterAddress }: GameAnalyticsProps) {
  const [metrics, setMetrics] = useState<GameMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchGameMetrics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/dune/game-metrics?contract=${contractAddress}&from=${filterAddress}`)
      const data = await response.json()
      setMetrics(data.metrics)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching game metrics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGameMetrics()
    const interval = setInterval(fetchGameMetrics, 30000)
    return () => clearInterval(interval)
  }, [contractAddress, filterAddress])

  if (loading && !metrics) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600">Loading Tweetle metrics...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!metrics) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-gray-500">Unable to load Tweetle gaming metrics.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Gaming Metrics */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium text-blue-700">Total Games Played</CardTitle>
              <div className="bg-blue-500 p-1.5 md:p-2 rounded-lg">
                <Twitter className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl md:text-3xl font-bold text-blue-800 mb-1">
              {metrics.totalGamesPlayed.toLocaleString()}
            </div>
            <p className="text-xs md:text-sm text-blue-600">Daily word puzzles solved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium text-green-700">Contract Interactions</CardTitle>
              <div className="bg-green-500 p-1.5 md:p-2 rounded-lg">
                <Activity className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl md:text-3xl font-bold text-green-800 mb-1">
              {metrics.totalContractInteractions.toLocaleString()}
            </div>
            <p className="text-xs md:text-sm text-green-600">Blockchain transactions</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium text-purple-700">Unique Players</CardTitle>
              <div className="bg-purple-500 p-1.5 md:p-2 rounded-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl md:text-3xl font-bold text-purple-800 mb-1">
              {metrics.uniqueWalletsInteracted.toLocaleString()}
            </div>
            <p className="text-xs md:text-sm text-purple-600">Distinct wallet addresses</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium text-orange-700">Games Per Player</CardTitle>
              <div className="bg-orange-500 p-1.5 md:p-2 rounded-lg">
                <PlayCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl md:text-3xl font-bold text-orange-800 mb-1">
              {metrics.playsPerPlayer.toFixed(1)}
            </div>
            <p className="text-xs md:text-sm text-orange-600">Average engagement</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-red-100">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium text-red-700">Registered Players</CardTitle>
              <div className="bg-red-500 p-1.5 md:p-2 rounded-lg">
                <UserCheck className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl md:text-3xl font-bold text-red-800 mb-1">
              {metrics.registeredPlayers.toLocaleString()}
            </div>
            <p className="text-xs md:text-sm text-red-600">Active accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Daily Active Users</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-800 mb-2">{metrics.dailyActiveUsers.toLocaleString()}</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-sm text-green-600">+{metrics.weeklyGrowth.toFixed(1)}% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-800 mb-2">{metrics.successRate.toFixed(1)}%</div>
            <Progress value={metrics.successRate} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Players who solve the puzzle</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Average Guesses</CardTitle>
              <Hash className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-800 mb-2">{metrics.averageGuesses.toFixed(1)}</div>
            <p className="text-xs text-gray-500">Out of 6 attempts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Last Updated</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchGameMetrics}
                disabled={loading}
                className="h-8 w-8 p-0 hover:bg-blue-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""} text-blue-500`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm font-medium text-gray-800">{lastUpdated.toLocaleTimeString()}</div>
            <p className="text-xs text-gray-500 mt-1">Real-time sync</p>
          </CardContent>
        </Card>
      </div>

      {/* Game Insights */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Trophy className="h-5 w-5" />
              Top Tweetle Players
            </CardTitle>
            <CardDescription className="text-blue-100">Most successful word puzzle solvers</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 md:space-y-4">
              {metrics.topPlayers.slice(0, 5).map((player, index) => (
                <div
                  key={player.address}
                  className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <Badge
                      variant="outline"
                      className={`w-6 h-6 md:w-8 md:h-8 p-0 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                          : index === 1
                            ? "bg-gray-100 text-gray-800 border-gray-300"
                            : index === 2
                              ? "bg-orange-100 text-orange-800 border-orange-300"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      #{index + 1}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-800 text-sm md:text-base truncate">
                        {player.address.slice(0, 6)}...{player.address.slice(-4)}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">Win rate: {player.winRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-800 text-sm md:text-base">{player.gamesPlayed}</p>
                    <p className="text-xs text-gray-500">games</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5" />
              Game Mode Popularity
            </CardTitle>
            <CardDescription className="text-green-100">How players engage with Tweetle</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {metrics.gameTypeDistribution.map((gameType) => (
                <div key={gameType.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{gameType.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{gameType.count.toLocaleString()}</span>
                      <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">
                        {gameType.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={gameType.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
