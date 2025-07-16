import { type NextRequest, NextResponse } from "next/server"

// Mock leaderboard data generator
const generateMockLeaderboards = (contractAddress: string, filterAddress: string) => {
  const generatePlayer = (rank: number, previousRank?: number): any => {
    const gamesPlayed = Math.floor(Math.random() * 1000) + 50
    const gamesWon = Math.floor(gamesPlayed * (Math.random() * 0.4 + 0.4)) // 40-80% win rate
    const winRate = (gamesWon / gamesPlayed) * 100
    const experience = Math.floor(Math.random() * 50000) + 1000

    return {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      rank,
      previousRank: previousRank || rank + Math.floor(Math.random() * 10) - 5,
      displayName: Math.random() > 0.7 ? `Player${rank}` : undefined,
      gamesPlayed,
      gamesWon,
      winRate,
      totalEarnings: (Math.random() * 100 + 10).toFixed(4),
      averageGameTime: Math.floor(Math.random() * 300) + 120, // 2-7 minutes
      streak: Math.floor(Math.random() * 20),
      lastActive: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Last 24 hours
      level: Math.floor(experience / 1000) + 1,
      experience,
      achievements: Math.floor(Math.random() * 50) + 5,
    }
  }

  // Generate different leaderboard categories
  const topPlayers = Array.from({ length: 20 }, (_, i) => generatePlayer(i + 1))
    .sort((a, b) => b.gamesWon - a.gamesWon)
    .map((player, index) => ({ ...player, rank: index + 1 }))

  const topEarners = Array.from({ length: 20 }, (_, i) => generatePlayer(i + 1))
    .sort((a, b) => Number.parseFloat(b.totalEarnings) - Number.parseFloat(a.totalEarnings))
    .map((player, index) => ({ ...player, rank: index + 1 }))

  const mostActive = Array.from({ length: 20 }, (_, i) => generatePlayer(i + 1))
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
    .map((player, index) => ({ ...player, rank: index + 1 }))

  const bestWinRate = Array.from({ length: 20 }, (_, i) => generatePlayer(i + 1))
    .filter((player) => player.gamesPlayed >= 10) // Minimum 10 games
    .sort((a, b) => b.winRate - a.winRate)
    .map((player, index) => ({ ...player, rank: index + 1 }))

  const longestStreaks = Array.from({ length: 20 }, (_, i) => generatePlayer(i + 1))
    .map((player) => ({ ...player, streak: Math.floor(Math.random() * 50) + 1 }))
    .sort((a, b) => b.streak - a.streak)
    .map((player, index) => ({ ...player, rank: index + 1 }))

  const recentlyActive = Array.from({ length: 20 }, (_, i) => generatePlayer(i + 1))
    .map((player) => ({
      ...player,
      lastActive: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Last hour
    }))
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
    .map((player, index) => ({ ...player, rank: index + 1 }))

  // Rising stars - players with biggest rank improvements
  const rising = Array.from({ length: 20 }, (_, i) => {
    const currentRank = i + 1
    const previousRank = currentRank + Math.floor(Math.random() * 50) + 10 // They were much lower
    return generatePlayer(currentRank, previousRank)
  }).sort((a, b) => b.previousRank - b.rank - (a.previousRank - a.rank))

  return {
    topPlayers: topPlayers.slice(0, 15),
    topEarners: topEarners.slice(0, 15),
    mostActive: mostActive.slice(0, 15),
    bestWinRate: bestWinRate.slice(0, 15),
    longestStreaks: longestStreaks.slice(0, 15),
    recentlyActive: recentlyActive.slice(0, 15),
    rising: rising.slice(0, 15),
    lastUpdated: new Date().toISOString(),
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const contractAddress = searchParams.get("contract")
  const filterAddress = searchParams.get("from")

  if (!contractAddress || !filterAddress) {
    return NextResponse.json({ error: "Contract address and filter address are required" }, { status: 400 })
  }

  try {
    // In a real implementation, you would:
    // 1. Query Dune for player statistics and rankings
    // 2. Calculate different leaderboard categories
    // 3. Track rank changes over time
    // 4. Filter and sort players by various metrics

    const leaderboards = generateMockLeaderboards(contractAddress, filterAddress)

    return NextResponse.json({
      leaderboards,
      contract_address: contractAddress,
      filter_address: filterAddress,
      generated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching leaderboards:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboards" }, { status: 500 })
  }
}
