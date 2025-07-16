"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Menu, Twitter, Trophy, BarChart3, Activity, Wallet, TrendingUp, Info, ExternalLink } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Trophy, label: "Leaderboards", description: "Top players and rankings", href: "#leaderboards" },
    { icon: BarChart3, label: "Analytics", description: "Detailed game statistics", href: "#analytics" },
    { icon: Activity, label: "Transactions", description: "Blockchain activity", href: "#transactions" },
    { icon: Wallet, label: "Token Transfers", description: "STRK movements", href: "#transfers" },
    { icon: TrendingUp, label: "Insights", description: "Game patterns & health", href: "#insights" },
  ]

  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm shadow-lg">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Twitter className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Tweetle
              </span>
            </SheetTitle>
            <SheetDescription>Navigate through the Tweetle analytics dashboard</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* Quick Stats */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Status</span>
                  <Badge className="bg-green-500 text-white text-xs">Live</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Players Online</span>
                  <Badge variant="outline" className="text-xs">
                    2,847
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Success Rate</span>
                  <Badge variant="outline" className="text-xs">
                    94.2%
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Navigation Menu */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">Navigation</h3>
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false)
                    // Scroll to section or handle navigation
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <item.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>

            <Separator />

            {/* Game Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-gray-600" />
                <h3 className="font-semibold text-gray-900">About Tweetle</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                A Twitter-inspired word guessing game on Starknet. Guess the daily word in 6 tries or less and earn STRK
                rewards!
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Daily Puzzles
                </Badge>
                <Badge variant="outline" className="text-xs">
                  STRK Rewards
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Leaderboards
                </Badge>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
