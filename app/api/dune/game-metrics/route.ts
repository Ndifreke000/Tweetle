import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const contractAddress = searchParams.get("contract")
  const filterAddress = searchParams.get("from")

  try {
    // Mock data for demonstration - replace with actual Dune API calls
    const mockMetrics = {
      totalGamesPlayed: 47823,
      totalContractInteractions: 156789,
      uniqueWalletsInteracted: 8934,
      playsPerPlayer: 5.4,
      registeredPlayers: 12456,
      dailyActiveUsers: 2847,
      weeklyGrowth: 12.3,
      averageGuesses: 4.1,
      successRate: 94.2,
      topPlayers: [
        {
          address: "0x1234567890abcdef1234567890abcdef12345678",
          gamesPlayed: 847,
          winRate: 85.4,
        },
        {
          address: "0x2345678901bcdef12345678901bcdef123456789",
          gamesPlayed: 692,
          winRate: 83.5,
        },
        {
          address: "0x3456789012cdef123456789012cdef1234567890",
          gamesPlayed: 534,
          winRate: 83.3,
        },
        {
          address: "0x4567890123def1234567890123def12345678901",
          gamesPlayed: 478,
          winRate: 81.4,
        },
        {
          address: "0x5678901234ef12345678901234ef123456789012",
          gamesPlayed: 423,
          winRate: 80.9,
        },
      ],
      gameTypeDistribution: [
        { type: "Daily Challenge", count: 28694, percentage: 60.0 },
        { type: "Practice Mode", count: 11469, percentage: 24.0 },
        { type: "Speed Round", count: 4782, percentage: 10.0 },
        { type: "Hard Mode", count: 2878, percentage: 6.0 },
      ],
      hourlyActivity: [
        { hour: 0, games: 234 },
        { hour: 1, games: 189 },
        { hour: 2, games: 156 },
        { hour: 3, games: 123 },
        { hour: 4, games: 145 },
        { hour: 5, games: 178 },
        { hour: 6, games: 267 },
        { hour: 7, games: 345 },
        { hour: 8, games: 456 },
        { hour: 9, games: 523 },
        { hour: 10, games: 589 },
        { hour: 11, games: 634 },
        { hour: 12, games: 678 },
        { hour: 13, games: 645 },
        { hour: 14, games: 598 },
        { hour: 15, games: 567 },
        { hour: 16, games: 534 },
        { hour: 17, games: 489 },
        { hour: 18, games: 445 },
        { hour: 19, games: 398 },
        { hour: 20, games: 356 },
        { hour: 21, games: 312 },
        { hour: 22, games: 278 },
        { hour: 23, games: 245 },
      ],
    }

    return NextResponse.json({
      success: true,
      metrics: mockMetrics,
    })
  } catch (error) {
    console.error("Error fetching game metrics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch game metrics" }, { status: 500 })
  }
}
