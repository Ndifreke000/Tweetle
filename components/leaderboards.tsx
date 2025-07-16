"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Crown,
  Medal,
  Gamepad2,
  DollarSign,
  Clock,
  Target,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  Zap,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Player {
  address: string
  rank: number
  previousRank: number
  displayName?: string
  gamesPlayed: number
  gamesWon: number
  winRate: number
  totalEarnings: string
  averageGameTime: number
  streak: number
  lastActive: string
  level: number
  experience: number
  achievements: number
}

interface LeaderboardData {
  topPlayers: Player[]
  topEarners: Player[]
  mostActive: Player[]
  bestWinRate: Player[]
  longestStreaks: Player[]
  recentlyActive: Player[]
  rising: Player[]
  lastUpdated: string
}

interface LeaderboardsProps {
  contractAddress: string
  filterAddress: string
}

export default function Leaderboards({ contractAddress, filterAddress }: LeaderboardsProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("top-players")

  const fetchLeaderboards = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/dune/leaderboards?contract=${contractAddress}&from=${filterAddress}`)
      const data = await response.json()
      setLeaderboardData(data.leaderboards)
    } catch (error) {
      console.error("Error fetching leaderboards:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboards()
    const interval = setInterval(fetchLeaderboards, 45000) // Update every 45 seconds
    return () => clearInterval(interval)
  }, [contractAddress, filterAddress])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (current > previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatEarnings = (earnings: string) => {
    const num = Number.parseFloat(earnings)
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toFixed(2)
  }

  const getPlayerLevel = (experience: number) => {
    return Math.floor(experience / 1000) + 1
  }

  const getExperienceProgress = (experience: number) => {
    return (experience % 1000) / 10
  }

  const PlayerCard = ({
    player,
    showEarnings = false,
    showWinRate = false,
    showActivity = false,
  }: {
    player: Player
    showEarnings?: boolean
    showWinRate?: boolean
    showActivity?: boolean
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              {getRankIcon(player.rank)}
              {getRankChange(player.rank, player.previousRank)}
            </div>

            <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs md:text-sm">
                {player.displayName ? player.displayName[0].toUpperCase() : formatAddress(player.address)[2]}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 md:gap-2 mb-1">
                <p className="font-medium text-sm md:text-base truncate">
                  {player.displayName || formatAddress(player.address)}
                </p>
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  Lvl {player.level}
                </Badge>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                <span className="truncate">{player.gamesPlayed} games</span>
                {player.streak > 0 && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span>{player.streak}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-right space-y-1 flex-shrink-0">
            {showEarnings && (
              <div className="flex items-center gap-1 justify-end">
                <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                <span className="font-bold text-xs md:text-sm">{formatEarnings(player.totalEarnings)} STRK</span>
              </div>
            )}
            {showWinRate && (
              <div className="flex items-center gap-1 justify-end">
                <Target className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                <span className="font-bold text-xs md:text-sm">{player.winRate.toFixed(1)}%</span>
              </div>
            )}
            {showActivity && (
              <div className="flex items-center gap-1 justify-end">
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-purple-500" />
                <span className="text-xs">{formatDistanceToNow(new Date(player.lastActive), { addSuffix: true })}</span>
              </div>
            )}

            <div className="w-16 md:w-24">
              <Progress value={getExperienceProgress(player.experience)} className="h-1" />
              <span className="text-xs text-muted-foreground">{player.experience % 1000}/1000 XP</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading && !leaderboardData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!leaderboardData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Unable to load leaderboard data.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
            Leaderboards
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">Top players and rankings across all game modes</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeaderboards}
          disabled={loading}
          className="flex items-center gap-2 bg-transparent w-full sm:w-auto"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Leaderboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 h-auto">
          <TabsTrigger value="top-players" className="flex flex-col items-center gap-1 text-xs p-2 h-auto">
            <Trophy className="h-3 w-3" />
            <span>Top</span>
          </TabsTrigger>
          <TabsTrigger value="top-earners" className="flex flex-col items-center gap-1 text-xs p-2 h-auto">
            <DollarSign className="h-3 w-3" />
            <span>Earners</span>
          </TabsTrigger>
          <TabsTrigger value="most-active" className="flex flex-col items-center gap-1 text-xs p-2 h-auto">
            <Gamepad2 className="h-3 w-3" />
            <span>Active</span>
          </TabsTrigger>
          <TabsTrigger value="best-winrate" className="flex flex-col items-center gap-1 text-xs p-2 h-auto">
            <Target className="h-3 w-3" />
            <span>Win Rate</span>
          </TabsTrigger>
          <TabsTrigger value="streaks" className="flex flex-col items-center gap-1 text-xs p-2 h-auto">
            <Zap className="h-3 w-3" />
            <span>Streaks</span>
          </TabsTrigger>
          <TabsTrigger value="rising" className="flex flex-col items-center gap-1 text-xs p-2 h-auto">
            <TrendingUp className="h-3 w-3" />
            <span>Rising</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex flex-col items-center gap-1 text-xs p-2 h-auto">
            <Clock className="h-3 w-3" />
            <span>Recent</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="top-players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Players by Games Won
              </CardTitle>
              <CardDescription>Players ranked by total victories and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.topPlayers.map((player) => (
                <PlayerCard key={player.address} player={player} showWinRate />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-earners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Top Earners
              </CardTitle>
              <CardDescription>Players with the highest total STRK earnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.topEarners.map((player) => (
                <PlayerCard key={player.address} player={player} showEarnings />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="most-active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-blue-500" />
                Most Active Players
              </CardTitle>
              <CardDescription>Players with the most games played</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.mostActive.map((player) => (
                <PlayerCard key={player.address} player={player} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-winrate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Best Win Rate
              </CardTitle>
              <CardDescription>Players with the highest win percentage (min. 10 games)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.bestWinRate.map((player) => (
                <PlayerCard key={player.address} player={player} showWinRate />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Longest Win Streaks
              </CardTitle>
              <CardDescription>Players with the most consecutive wins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.longestStreaks.map((player) => (
                <div key={player.address}>
                  <PlayerCard player={player} />
                  <div className="mt-2 ml-8 md:ml-16">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                      🔥 {player.streak} game win streak
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rising" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Rising Stars
              </CardTitle>
              <CardDescription>Players with the biggest rank improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.rising.map((player) => (
                <div key={player.address}>
                  <PlayerCard player={player} />
                  <div className="mt-2 ml-16">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      📈 +{player.previousRank - player.rank} positions this week
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Recently Active
              </CardTitle>
              <CardDescription>Players who have been active in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.recentlyActive.map((player) => (
                <PlayerCard key={player.address} player={player} showActivity />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        Last updated: {formatDistanceToNow(new Date(leaderboardData.lastUpdated), { addSuffix: true })}
      </div>
    </div>
  )
}
