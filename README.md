# Etherscan MCP Server for Developer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with xmcp](https://img.shields.io/badge/Built%20with-xmcp-blue.svg)](https://xmcp.dev)

A powerful Model Context Protocol (MCP) server that brings Etherscan's blockchain data directly to your AI tools like Claude Code and Cursor! 🚀

## Overview 🌟

This MCP server is **specifically designed for dApp and smart contract developers**! 👨‍💻 It supercharges your AI assistant with essential blockchain development tools by providing direct access to Etherscan's data:

- 📄 **Smart Contract ABIs** - Fetch contract interfaces instantly for integration
- 🔍 **Contract Details** - Get comprehensive contract information including source code
- 🌐 **Multi-Chain Support** - Works across all major EVM networks

**Optimized for developers:** Only includes the most essential tools to keep context consumption small

Built with the awesome [xmcp framework](https://xmcp.dev/) for maximum developer happiness! ✨

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- pnpm
- An Etherscan API key (get yours at [etherscan.io](https://etherscan.io/apis))

### Installation & Setup

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd etherscan-mcp-for-dev
   pnpm install
   ```

2. **Development Server**
   ```bash
   pnpm dev
   ```

   This fires up the MCP server with hot reloading! 🔥

3. **Build for Production**
   ```bash
   pnpm build
   ```

## 🏗️ Project Structure

This project follows the xmcp structured approach where tools live in the `src/tools` directory and are automatically discovered:

```
src/
├── tools/
│   ├── getContractAbi.ts        # 📋 Fetch contract ABIs
│   ├── getContractDetail.ts     # 🔍 Get detailed contract info
│   └── getSupportedChains.ts    # 🌐 List supported chains
└── ...
```

Each tool follows this pattern:

```typescript
import { z } from "zod";
import { type InferSchema } from "xmcp";

// 📝 Define parameters with Zod validation
export const schema = {
  address: z.string().describe("Contract address"),
  chain: z.string().describe("Chain name or ID"),
};

// 🏷️ Tool metadata
export const metadata = {
  name: "getContractAbi",
  description: "Fetch smart contract ABI from Etherscan",
  annotations: {
    title: "Get Contract ABI",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

// ⚡ Implementation
export default async function getContractAbi({ address, chain }: InferSchema<typeof schema>) {
  // Your awesome logic here!
  return {
    content: [{ type: "text", text: "Contract ABI data..." }],
  };
}
```

## 🛠️ Available Tools

### `getContractAbi` 📋
Fetches the Application Binary Interface (ABI) for any verified smart contract.

**Example Claude query:**
> "Can you get the ABI for the 0xdac17f958d2ee523a2206206994597c13d831ec7 on ethereum?"

### `getContractDetail` 🔍
Retrieves comprehensive contract information including source code, compiler version, and proxy details.

**Example Claude query:**
> "Show me the source code for contract 0xdac17f958d2ee523a2206206994597c13d831ec7 on ethereum"

### `getSupportedChains` 🌐
Lists all supported blockchain networks and their chain IDs.

**Example Claude query:**
> "What blockchains does etherscan support?"

## 🏃‍♂️ Running the Server

### Development
```bash
pnpm dev  # Hot reloading goodness ⚡
```

### Production
```bash
# Build first
pnpm build

# Then run with STDIO transport:
pnpm start
```


## 🔧 Integration with AI Tools

1. **Open Your AI Tools MCP configuration file:**
   - Cursor: `~/.cursor/mcp.json`
   - Windsurf: `~/.codeium/windsurf/mcp_config.json`
   - Cline: `~/.cline/mcp_config.json`
   - Claude: `~/.claude/mcp_config.json`


2. **Add configuration:**
   ```json
   {
     "mcpServers": {
       "etherscan-mcp": {
         "command": "npx",
         "args": ["-y", "etherscan-mcp-for-dev@latest"],
         "env": {
           "ETHERSCAN_API_KEY": "your_api_key_here"
         }
       }
     }
   }
   ```

## 📚 Learn More

- [xmcp Documentation](https://xmcp.dev/docs) - Framework docs
- [MCP Specification](https://modelcontextprotocol.io/) - Protocol details
- [Etherscan API](https://docs.etherscan.io/) - Data source docs

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ using [xmcp](https://xmcp.dev/)**
