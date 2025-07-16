import { type NextRequest, NextResponse } from "next/server"

// Mock gaming data generator
const generateMockGameMetrics = (contractAddress: string, filterAddress: string) => {
  const topPlayers = []
  for (let i = 0; i < 10; i++) {
    topPlayers.push({
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      gamesPlayed: Math.floor(Math.random() * 500) + 100,
      winRate: Math.random() * 40 + 60, // 60-100% win rate
    })
  }
  topPlayers.sort((a, b) => b.gamesPlayed - a.gamesPlayed)

  const gameTypes = [
    { type: "Daily Challenge", count: 18420, percentage: 52.1 },
    { type: "Practice Mode", count: 8930, percentage: 25.3 },
    { type: "Speed Round", count: 4670, percentage: 13.2 },
    { type: "Hard Mode", count: 2890, percentage: 8.2 },
    { type: "Custom Words", count: 420, percentage: 1.2 },
  ]

  const hourlyActivity = []
  for (let hour = 0; hour < 24; hour++) {
    // Simulate realistic gaming patterns (higher activity in evening hours)
    let baseActivity = 50
    if (hour >= 18 && hour <= 23) baseActivity = 200 // Evening peak
    if (hour >= 12 && hour <= 17) baseActivity = 120 // Afternoon
    if (hour >= 6 && hour <= 11) baseActivity = 80 // Morning

    hourlyActivity.push({
      hour,
      games: Math.floor(baseActivity + Math.random() * 50),
    })
  }

  const totalGames = 35420
  const registeredPlayers = 12847
  const uniqueWallets = 8934

  return {
    totalGamesPlayed: totalGames,
    totalContractInteractions: totalGames * 3.2, // Average 3.2 interactions per game
    uniqueWalletsInteracted: uniqueWallets,
    playsPerPlayer: totalGames / registeredPlayers,
    registeredPlayers: registeredPlayers,
    dailyActiveUsers: Math.floor(registeredPlayers * 0.23), // 23% daily active rate
    weeklyGrowth: Math.random() * 10 + 5, // 5-15% weekly growth
    topPlayers,
    gameTypeDistribution: gameTypes,
    hourlyActivity,
    averageGuesses: 4.1,
    successRate: 94.2,
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
    // 1. Query Dune for gaming-specific metrics
    // 2. Calculate player statistics and engagement metrics
    // 3. Aggregate game data and player behavior

    const metrics = generateMockGameMetrics(contractAddress, filterAddress)

    return NextResponse.json({
      metrics,
      contract_address: contractAddress,
      filter_address: filterAddress,
      generated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching game metrics:", error)
    return NextResponse.json({ error: "Failed to fetch game metrics" }, { status: 500 })
  }
}
