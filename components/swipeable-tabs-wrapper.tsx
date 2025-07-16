"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface SwipeableTabsWrapperProps {
  children: React.ReactNode
}

export default function SwipeableTabsWrapper({ children }: SwipeableTabsWrapperProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      // Get current active tab
      const activeTab = document.querySelector('[data-state="active"]')
      const tabsList = document.querySelectorAll('[role="tab"]')

      if (activeTab && tabsList.length > 0) {
        const currentIndex = Array.from(tabsList).indexOf(activeTab as Element)
        let nextIndex = currentIndex

        if (isLeftSwipe && currentIndex < tabsList.length - 1) {
          nextIndex = currentIndex + 1
        } else if (isRightSwipe && currentIndex > 0) {
          nextIndex = currentIndex - 1
        }

        if (nextIndex !== currentIndex) {
          const nextTab = tabsList[nextIndex] as HTMLElement
          nextTab.click()

          // Add haptic feedback if available
          if ("vibrate" in navigator) {
            navigator.vibrate(50)
          }
        }
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("touchstart", onTouchStart, { passive: true })
    container.addEventListener("touchmove", onTouchMove, { passive: true })
    container.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("touchstart", onTouchStart)
      container.removeEventListener("touchmove", onTouchMove)
      container.removeEventListener("touchend", onTouchEnd)
    }
  }, [touchStart, touchEnd])

  return (
    <div ref={containerRef} className="relative">
      {children}
      {/* Swipe indicator for mobile */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span>←</span>
          <span>Swipe to navigate</span>
          <span>→</span>
        </div>
      </div>
    </div>
  )
}
