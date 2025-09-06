// Supported chains mapping from the Etherscan documentation
export const SUPPORTED_CHAINS = {
  // Ethereum
  ethereum: 1,
  "ethereum mainnet": 1,
  sepolia: 11155111,
  "sepolia testnet": 11155111,
  holesky: 17000,
  "holesky testnet": 17000,
  "hoodi testnet": 560048,

  // Abstract
  abstract: 2741,
  "abstract mainnet": 2741,
  "abstract sepolia": 11124,
  "abstract sepolia testnet": 11124,

  // ApeChain
  "apechain curtis testnet": 33111,
  apechain: 33139,
  "apechain mainnet": 33139,

  // Arbitrum
  "arbitrum nova": 42170,
  "arbitrum nova mainnet": 42170,
  arbitrum: 42161,
  "arbitrum one": 42161,
  "arbitrum one mainnet": 42161,
  "arbitrum sepolia": 421614,
  "arbitrum sepolia testnet": 421614,

  // Avalanche
  avalanche: 43114,
  "avalanche c-chain": 43114,
  "avalanche fuji": 43113,
  "avalanche fuji testnet": 43113,

  // Base
  base: 8453,
  "base mainnet": 8453,
  "base sepolia": 84532,
  "base sepolia testnet": 84532,

  // Berachain
  berachain: 80094,
  "berachain mainnet": 80094,
  "berachain bepolia": 80069,
  "berachain bepolia testnet": 80069,

  // BitTorrent
  bittorrent: 199,
  "bittorrent chain": 199,
  "bittorrent chain mainnet": 199,
  "bittorrent chain testnet": 1028,

  // Blast
  blast: 81457,
  "blast mainnet": 81457,
  "blast sepolia": 168587773,
  "blast sepolia testnet": 168587773,

  // BNB Smart Chain
  bnb: 56,
  bsc: 56,
  "bnb smart chain": 56,
  "bnb smart chain mainnet": 56,
  "bnb smart chain testnet": 97,
  "bsc testnet": 97,

  // Celo
  "celo alfajores": 44787,
  "celo alfajores testnet": 44787,
  celo: 42220,
  "celo mainnet": 42220,

  // Cronos
  cronos: 25,
  "cronos mainnet": 25,

  // Fraxtal
  fraxtal: 252,
  "fraxtal mainnet": 252,
  "fraxtal testnet": 2522,

  // Gnosis
  gnosis: 100,

  // HyperEVM
  hyperevm: 999,

  // Linea
  linea: 59144,
  "linea mainnet": 59144,
  "linea sepolia": 59141,
  "linea sepolia testnet": 59141,

  // Mantle
  mantle: 5000,
  "mantle mainnet": 5000,
  "mantle sepolia": 5003,
  "mantle sepolia testnet": 5003,

  // Memecore
  memecore: 4352,
  "memecore mainnet": 4352,
  "memecore testnet": 43521,

  // Moonbeam ecosystem
  "moonbase alpha": 1287,
  "moonbase alpha testnet": 1287,
  "monad testnet": 10143,
  moonbeam: 1284,
  "moonbeam mainnet": 1284,
  moonriver: 1285,
  "moonriver mainnet": 1285,

  // Optimism
  optimism: 10,
  "op mainnet": 10,
  "optimism mainnet": 10,
  "op sepolia": 11155420,
  "optimism sepolia": 11155420,
  "op sepolia testnet": 11155420,

  // Polygon
  "polygon amoy": 80002,
  "polygon amoy testnet": 80002,
  polygon: 137,
  "polygon mainnet": 137,

  // Katana (formerly Polygon zkEVM)
  katana: 747474,
  "katana mainnet": 747474,

  // Sei
  sei: 1329,
  "sei mainnet": 1329,
  "sei testnet": 1328,

  // Scroll
  scroll: 534352,
  "scroll mainnet": 534352,
  "scroll sepolia": 534351,
  "scroll sepolia testnet": 534351,

  // Sonic
  "sonic blaze testnet": 57054,
  sonic: 146,
  "sonic mainnet": 146,

  // Sophon
  sophon: 50104,
  "sophon mainnet": 50104,
  "sophon sepolia": 531050104,
  "sophon sepolia testnet": 531050104,

  // Swellchain
  swellchain: 1923,
  "swellchain mainnet": 1923,
  "swellchain testnet": 1924,

  // Taiko
  "taiko hekla": 167009,
  "taiko hekla testnet": 167009,
  taiko: 167000,
  "taiko mainnet": 167000,

  // Unichain
  unichain: 130,
  "unichain mainnet": 130,
  "unichain sepolia": 1301,
  "unichain sepolia testnet": 1301,

  // World
  world: 480,
  "world mainnet": 480,
  "world sepolia": 4801,
  "world sepolia testnet": 4801,

  // Wemix
  wemix: 1111,
  "wemix mainnet": 1111,
  "wemix testnet": 1112,

  // XDC
  "xdc apothem": 51,
  "xdc apothem testnet": 51,
  xdc: 50,
  "xdc mainnet": 50,

  // zkSync
  zksync: 324,
  "zksync mainnet": 324,
  "zksync sepolia": 300,
  "zksync sepolia testnet": 300,

  // opBNB
  opbnb: 204,
  "opbnb mainnet": 204,
  "opbnb testnet": 5611,
} as const;

// Reverse mapping for chain ID to name
export const CHAIN_ID_TO_NAME: Record<number, string> = Object.entries(
  SUPPORTED_CHAINS,
).reduce(
  (acc, [name, id]) => {
    if (!acc[id]) {
      acc[id] = name;
    }
    return acc;
  },
  {} as Record<number, string>,
);

// Etherscan V2 API base URL
const ETHERSCAN_API_BASE = "https://api.etherscan.io/v2/api";

// Get API key from environment
function getApiKey(): string {
  const apiKey = process.env.ETHERSCAN_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "ETHERSCAN_API_KEY environment variable is not set or empty",
    );
  }

  return apiKey.trim();
}

// Convert chain name to chain ID
export function getChainId(chainInput: string): number {
  const trimmedInput = chainInput.trim();

  // Try to convert string to number first
  const numericValue = Number(trimmedInput);
  if (!isNaN(numericValue) && Number.isInteger(numericValue)) {
    // If it's a valid number, validate it's supported
    if (!CHAIN_ID_TO_NAME[numericValue]) {
      throw new Error(`Unsupported chain ID: ${numericValue}`);
    }
    return numericValue;
  }

  // Convert string to lowercase for case-insensitive matching
  const chainName = trimmedInput.toLowerCase();
  const chainId = SUPPORTED_CHAINS[chainName as keyof typeof SUPPORTED_CHAINS];

  if (!chainId) {
    throw new Error(
      `Unsupported chain: ${chainInput}. Use getSupportedChainConfig to see all supported chains.`,
    );
  }

  return chainId;
}

// Etherscan API response interface
interface EtherscanResponse<T = any> {
  status: "0" | "1";
  message: string;
  result: T;
}

// Fetch wrapper for Etherscan API calls
export async function etherscanFetch<T = any>(
  params: Record<string, string | number>,
): Promise<T> {
  const apiKey = getApiKey();

  // Build URL with parameters
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });
  searchParams.append("apikey", apiKey);

  const url = `${ETHERSCAN_API_BASE}?${searchParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: EtherscanResponse<T> = await response.json();

    if (data.status === "0") {
      throw new Error(`Etherscan API Error: ${data.message}`);
    }

    return data.result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from Etherscan API: ${error.message}`);
    }
    throw new Error("Unknown error occurred while fetching from Etherscan API");
  }
}

// Get all supported chains as an array
export function getSupportedChains(): Array<{ name: string; chainId: number }> {
  return Object.entries(SUPPORTED_CHAINS).map(([name, chainId]) => ({
    name,
    chainId,
  }));
}
