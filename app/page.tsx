import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import GameAnalytics from "@/components/game-analytics"
import TransactionsList from "@/components/transactions-list"
import TokenTransfers from "@/components/token-transfers"
import ContractAnalytics from "@/components/contract-analytics"
import RealTimeUpdates from "@/components/real-time-updates"
import { Activity, BarChart3, Wallet, TrendingUp, Trophy, Twitter } from "lucide-react"
import Leaderboards from "@/components/leaderboards"

const CONTRACT_ADDRESS = "sim_akbAOGhwbBB8ENZsLnAS20RIN5pQ1iww"
const FILTER_ADDRESS = "0x0188167902e1e0bdc56e32fa394ba3446a4a6cd3768536425f8dd50f5d20a8ca"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header with Tweetle Branding */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Twitter className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Tweetle
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The Twitter-inspired word guessing game on blockchain. Guess the daily word in 6 tries or less!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="outline" className="text-sm px-4 py-2 bg-white border-blue-200">
              🎮 Daily Word Puzzle
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2 bg-white border-blue-200">
              🏆 Compete & Earn
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2 bg-white border-blue-200">
              📱 Social Gaming
            </Badge>
          </div>
        </div>

        {/* Real-time Status */}
        <RealTimeUpdates />

        {/* Gaming Analytics - Primary Content */}
        <Suspense
          fallback={
            <Card className="border-0 shadow-lg">
              <CardContent className="flex items-center justify-center p-12">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-600">Loading Tweetle analytics...</p>
                </div>
              </CardContent>
            </Card>
          }
        >
          <GameAnalytics contractAddress={CONTRACT_ADDRESS} filterAddress={FILTER_ADDRESS} />
        </Suspense>

        {/* Navigation Tabs */}
        <Tabs defaultValue="leaderboards" className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-transparent gap-2">
              <TabsTrigger
                value="leaderboards"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-3 px-4 text-sm font-medium"
              >
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Leaderboards</span>
                <span className="sm:hidden">Leaders</span>
              </TabsTrigger>
              <TabsTrigger
                value="detailed-analytics"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-3 px-4 text-sm font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-3 px-4 text-sm font-medium"
              >
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Transactions</span>
                <span className="sm:hidden">Txns</span>
              </TabsTrigger>
              <TabsTrigger
                value="transfers"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-3 px-4 text-sm font-medium"
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Transfers</span>
                <span className="sm:hidden">Tokens</span>
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-3 px-4 text-sm font-medium"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Insights</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="leaderboards" className="space-y-6">
            <Suspense
              fallback={
                <Card className="border-0 shadow-lg">
                  <CardContent className="flex items-center justify-center p-12">
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="text-gray-600">Loading leaderboards...</p>
                    </div>
                  </CardContent>
                </Card>
              }
            >
              <Leaderboards contractAddress={CONTRACT_ADDRESS} filterAddress={FILTER_ADDRESS} />
            </Suspense>
          </TabsContent>

          <TabsContent value="detailed-analytics" className="space-y-6">
            <Suspense
              fallback={
                <Card className="border-0 shadow-lg">
                  <CardContent className="flex items-center justify-center p-12">
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="text-gray-600">Loading detailed analytics...</p>
                    </div>
                  </CardContent>
                </Card>
              }
            >
              <ContractAnalytics contractAddress={CONTRACT_ADDRESS} filterAddress={FILTER_ADDRESS} />
            </Suspense>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Recent Game Transactions</CardTitle>
                <CardDescription className="text-blue-100">
                  Blockchain transactions from Tweetle gameplay
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  }
                >
                  <TransactionsList contractAddress={CONTRACT_ADDRESS} filterAddress={FILTER_ADDRESS} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Token Transfers</CardTitle>
                <CardDescription className="text-green-100">
                  Rewards and token movements from Tweetle games
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                  }
                >
                  <TokenTransfers contractAddress={CONTRACT_ADDRESS} filterAddress={FILTER_ADDRESS} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Game Patterns</CardTitle>
                  <CardDescription className="text-purple-100">
                    When and how players engage with Tweetle
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Peak Playing Hours</span>
                      <Badge className="bg-purple-100 text-purple-800 text-sm px-3 py-1">8:00 AM - 12:00 PM UTC</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Average Daily Players</span>
                      <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">~2,847 players</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Most Active Day</span>
                      <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">Tuesday</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Game Health</CardTitle>
                  <CardDescription className="text-orange-100">Overall Tweetle performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Success Rate</span>
                      <Badge className="bg-green-500 text-white text-sm px-3 py-1">94.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Average Guesses</span>
                      <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">4.1 attempts</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Game Status</span>
                      <Badge className="bg-green-500 text-white text-sm px-3 py-1">🟢 Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">Tweetle Analytics Dashboard • Real-time blockchain gaming data</p>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              Contract: {CONTRACT_ADDRESS.slice(0, 10)}...
            </Badge>
            <Badge variant="outline" className="text-xs">
              Filter: {FILTER_ADDRESS.slice(0, 10)}...
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
