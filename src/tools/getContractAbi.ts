import { z } from "zod";
import { type ToolMetadata, type InferSchema } from "xmcp";
import { isAddress, getAddress } from "viem";
import { etherscanFetch, getChainId } from "../utils/etherscan";

export const schema = {
  address: z.string().describe("An EVM address"),
  chain: z
    .string()
    .describe(
      "The chain name (e.g., 'ethereum', 'polygon') or chain ID (e.g., 1, 137)",
    ),
};

export const metadata: ToolMetadata = {
  name: "getContractAbi",
  description:
    "Given an EVM contract address and a chain name or chain id, return the contract abi",
  annotations: {
    title: "Get Contract ABI",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getContractAbi({
  address,
  chain,
}: InferSchema<typeof schema>) {
  // Validate address format using viem
  if (!isAddress(address)) {
    throw new Error(
      "Invalid contract address format. Address must be a valid EVM address.",
    );
  }

  // Normalize address to checksum format
  const normalizedAddress = getAddress(address);

  // Get chain ID from chain name or validate chain ID
  const chainId = getChainId(chain);

  const abiString = await etherscanFetch<string>({
    chainid: chainId,
    module: "contract",
    action: "getabi",
    address: normalizedAddress,
  });

  // Parse the ABI to validate it's valid JSON
  let parsedAbi;
  try {
    parsedAbi = JSON.parse(abiString);
  } catch (parseError) {
    throw new Error("Invalid ABI format received from Etherscan API");
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(parsedAbi, null, 2),
      },
    ],
  };
}
