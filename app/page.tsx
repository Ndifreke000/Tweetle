import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import GameAnalytics from "@/components/game-analytics"
import TransactionsList from "@/components/transactions-list"
import TokenTransfers from "@/components/token-transfers"
import ContractAnalytics from "@/components/contract-analytics"
import RealTimeUpdates from "@/components/real-time-updates"
import MobileMenu from "@/components/mobile-menu"
import SwipeableTabsWrapper from "@/components/swipeable-tabs-wrapper"
import { Activity, BarChart3, Wallet, TrendingUp, Trophy, Twitter } from "lucide-react"
import Leaderboards from "@/components/leaderboards"

const CONTRACT_ADDRESS = "sim_akbAOGhwbBB8ENZsLnAS20RIN5pQ1iww"
const FILTER_ADDRESS = "0x0188167902e1e0bdc56e32fa394ba3446a4a6cd3768536425f8dd50f5d20a8ca"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Mobile Menu */}
        <MobileMenu />

        {/* Header with Tweetle Branding */}
        <div className="text-center space-y-4 py-4 md:py-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <div className="bg-blue-500 p-2 md:p-3 rounded-full">
              <Twitter className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Tweetle
            </h1>
          </div>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            The Twitter-inspired word guessing game on blockchain. Guess the daily word in 6 tries or less!
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6 px-4">
            <Badge variant="outline" className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 bg-white border-blue-200">
              🎮 Daily Word Puzzle
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 bg-white border-blue-200">
              🏆 Compete & Earn
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 bg-white border-blue-200">
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

        {/* Swipeable Navigation Tabs */}
        <SwipeableTabsWrapper>
          <Tabs defaultValue="leaderboards" className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 md:p-2">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-transparent gap-1 md:gap-2 h-auto">
                <TabsTrigger
                  value="leaderboards"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium h-auto"
                >
                  <Trophy className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Leaders</span>
                </TabsTrigger>
                <TabsTrigger
                  value="detailed-analytics"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium h-auto"
                >
                  <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium h-auto"
                >
                  <Activity className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Transactions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="transfers"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium h-auto"
                >
                  <Wallet className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Transfers</span>
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium h-auto col-span-2 md:col-span-1"
                >
                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Insights</span>
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
                        <Badge className="bg-purple-100 text-purple-800 text-sm px-3 py-1">
                          8:00 AM - 12:00 PM UTC
                        </Badge>
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
        </SwipeableTabsWrapper>

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
