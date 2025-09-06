import { type ToolMetadata } from "xmcp";
import { getSupportedChains } from "../utils/etherscan";

export const metadata: ToolMetadata = {
  name: "getSupportedChainConfig",
  description:
    "Return a list of supported chain name and its id for etherscan api",
  annotations: {
    title: "Get Supported Chain Configuration",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default function getSupportedChainConfig() {
  const chains = getSupportedChains();

  // Group chains by their unique chain ID to remove duplicates
  const uniqueChains = chains.reduce(
    (acc, chain) => {
      if (!acc[chain.chainId]) {
        acc[chain.chainId] = chain;
      }
      return acc;
    },
    {} as Record<number, { name: string; chainId: number }>,
  );

  // Convert back to array and sort by chain ID
  const sortedChains = Object.values(uniqueChains).sort(
    (a, b) => a.chainId - b.chainId,
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            success: true,
            totalChains: sortedChains.length,
            chains: sortedChains,
          },
          null,
          2,
        ),
      },
    ],
  };
}
