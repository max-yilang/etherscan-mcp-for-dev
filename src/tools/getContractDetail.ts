import { z } from "zod";
import { type ToolMetadata, type InferSchema } from "xmcp";
import { isAddress, getAddress } from "viem";
import { etherscanFetch, getChainId } from "../utils/etherscan";

export const schema = {
  address: z.string().describe("The contract address"),
  chain: z
    .string()
    .describe(
      "The chain name (e.g., 'ethereum', 'polygon') or chain ID (e.g., 1, 137)",
    ),
};

export const metadata: ToolMetadata = {
  name: "getContractDetail",
  description:
    "Get detailed contract information including source code, proxy status, and proxy contract implementation",
  annotations: {
    title: "Get Contract Details",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

// Interface for Etherscan source code response
interface SourceCodeResult {
  SourceCode: string;
  ABI: string;
  ContractName: string;
  CompilerVersion: string;
  OptimizationUsed: string;
  Runs: string;
  ConstructorArguments: string;
  EVMVersion: string;
  Library: string;
  LicenseType: string;
  Proxy: string;
  Implementation: string;
  SwarmSource: string;
}

export default async function getContractDetail({
  address,
  chain,
}: InferSchema<typeof schema>) {
  if (!isAddress(address)) {
    throw new Error(
      "Invalid contract address format. Address must be a valid EVM address.",
    );
  }

  // Normalize address to checksum format
  const normalizedAddress = getAddress(address);

  // Get chain ID from chain name or validate chain ID
  const chainId = getChainId(chain);

  // Fetch source code from Etherscan V2 API
  const sourceCodeData = await etherscanFetch<SourceCodeResult[]>({
    chainid: chainId,
    module: "contract",
    action: "getsourcecode",
    address: normalizedAddress,
  });

  // The API returns an array with one element
  if (!sourceCodeData || sourceCodeData.length === 0) {
    throw new Error("No source code data found for this contract address");
  }

  const contractData = sourceCodeData[0];

  // Check if the contract is verified
  if (!contractData.SourceCode || contractData.SourceCode === "") {
    throw new Error("Contract source code is not verified or available");
  }

  const isProxy = contractData.Proxy === "1";
  const hasImplementation =
    contractData.Implementation && contractData.Implementation !== "";

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            address: normalizedAddress,
            chainId: chainId,
            contractName: contractData.ContractName,
            sourceCode: contractData.SourceCode,
            isProxy: isProxy,
            implementation: hasImplementation
              ? contractData.Implementation
              : null,
            compilerVersion: contractData.CompilerVersion,
            licenseType: contractData.LicenseType,
          },
          null,
          2,
        ),
      },
    ],
  };
}
