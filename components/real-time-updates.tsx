"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, Play, Pause, Clock, RefreshCw } from "lucide-react"

export default function RealTimeUpdates() {
  const [isConnected, setIsConnected] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)

  // Pull to refresh functionality
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      setIsPulling(true)
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isPulling && window.scrollY === 0) {
        const touch = e.touches[0]
        const distance = Math.max(0, touch.clientY - 100) // Start pull from top
        setPullDistance(Math.min(distance, 100)) // Max pull distance
      }
    },
    [isPulling],
  )

  const handleTouchEnd = useCallback(async () => {
    if (isPulling && pullDistance > 60) {
      setIsRefreshing(true)

      // Simulate refresh
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setLastUpdate(new Date())

      // Add haptic feedback if available
      if ("vibrate" in navigator) {
        navigator.vibrate([50, 100, 50])
      }

      setIsRefreshing(false)
    }

    setIsPulling(false)
    setPullDistance(0)
  }, [isPulling, pullDistance])

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setLastUpdate(new Date())
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  return (
    <>
      {/* Pull to refresh indicator */}
      {isPulling && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-transform duration-200 md:hidden"
          style={{ transform: `translateY(${Math.max(0, pullDistance - 60)}px)` }}
        >
          <div className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="text-sm">
              {isRefreshing ? "Refreshing..." : pullDistance > 60 ? "Release to refresh" : "Pull to refresh"}
            </span>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <Badge
                  variant={isConnected ? "default" : "destructive"}
                  className={`text-xs ${isConnected ? "bg-green-500" : ""}`}
                >
                  {isConnected ? "Live" : "Disconnected"}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                <span>Updated {lastUpdate.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center gap-1 md:gap-2 text-xs flex-1 sm:flex-none"
              >
                {isPaused ? (
                  <>
                    <Play className="h-3 w-3 md:h-4 md:w-4" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-3 w-3 md:h-4 md:w-4" />
                    Pause
                  </>
                )}
              </Button>
              <Badge variant="outline" className="text-xs px-2 py-1">
                Auto-refresh: 30s
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
