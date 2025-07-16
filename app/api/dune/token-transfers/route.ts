import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration - replace with actual Dune API integration
const generateMockTokenTransfers = (contractAddress: string, filterAddress: string) => {
  const transfers = []
  const tokens = [
    { symbol: "USDC", name: "USD Coin", decimals: 6 },
    { symbol: "USDT", name: "Tether USD", decimals: 6 },
    { symbol: "WETH", name: "Wrapped Ether", decimals: 18 },
    { symbol: "DAI", name: "Dai Stablecoin", decimals: 18 },
    { symbol: "UNI", name: "Uniswap", decimals: 18 },
  ]

  for (let i = 0; i < 15; i++) {
    const token = tokens[Math.floor(Math.random() * tokens.length)]
    const amount = Math.random() * 1000000
    const isOutgoing = Math.random() > 0.5

    transfers.push({
      transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      from_address: isOutgoing ? filterAddress : `0x${Math.random().toString(16).substr(2, 40)}`,
      to_address: isOutgoing ? `0x${Math.random().toString(16).substr(2, 40)}` : filterAddress,
      token_address: `0x${Math.random().toString(16).substr(2, 40)}`,
      token_symbol: token.symbol,
      token_name: token.name,
      amount: (amount * Math.pow(10, token.decimals)).toFixed(0),
      decimals: token.decimals,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      usd_value: (amount * (token.symbol === "WETH" ? 2000 : 1)).toFixed(2),
    })
  }

  return transfers.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const contractAddress = searchParams.get("contract")
  const filterAddress = searchParams.get("from")

  if (!contractAddress || !filterAddress) {
    return NextResponse.json({ error: "Contract address and filter address are required" }, { status: 400 })
  }

  try {
    // In a real implementation, you would query Dune for token transfer events
    // filtered by the contract address and from_address

    const transfers = generateMockTokenTransfers(contractAddress, filterAddress)

    return NextResponse.json({
      transfers,
      total: transfers.length,
      contract_address: contractAddress,
      filter_address: filterAddress,
    })
  } catch (error) {
    console.error("Error fetching token transfers:", error)
    return NextResponse.json({ error: "Failed to fetch token transfers" }, { status: 500 })
  }
}
