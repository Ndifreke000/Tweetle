"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, Play, Pause, Activity } from "lucide-react"

export default function RealTimeUpdates() {
  const [isConnected, setIsConnected] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [updateCount, setUpdateCount] = useState(0)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setLastUpdate(new Date())
        setUpdateCount((prev) => prev + 1)
        // Simulate occasional connection issues
        setIsConnected(Math.random() > 0.05)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isPaused])

  const toggleUpdates = () => {
    setIsPaused(!isPaused)
  }

  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isConnected && !isPaused ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="font-medium">Real-time Status</span>
            </div>

            <Badge variant={isConnected && !isPaused ? "default" : "secondary"}>
              {isPaused ? "Paused" : isConnected ? "Live" : "Reconnecting..."}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Updates: {updateCount}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleUpdates}
              className="flex items-center gap-2 bg-transparent"
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              )}
            </Button>
          </div>
        </div>

        {!isPaused && (
          <div className="mt-2 text-xs text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
        )}
      </CardContent>
    </Card>
  )
}
