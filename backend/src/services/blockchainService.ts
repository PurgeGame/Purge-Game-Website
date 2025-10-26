import axios from "axios";
import { env } from "../config/env";

export type MintRequestPayload = {
  walletAddress: string;
  mintAmount: number;
};

class MissingRpcUrlError extends Error {
  constructor() {
    super("RPC_URL is not configured. Set it in your backend .env file.");
  }
}

export const blockchainService = {
  async ensureRpcConnectivity() {
    if (!env.rpcUrl) {
      throw new MissingRpcUrlError();
    }
    // Basic health check hitting the RPC node; replace with provider SDK if preferred.
    await axios.post(
      env.rpcUrl,
      {
        jsonrpc: "2.0",
        method: "web3_clientVersion",
        params: [],
        id: 1,
      },
      { timeout: 5_000 }
    );
  },

  async requestMint(_payload: MintRequestPayload) {
    if (!env.rpcUrl) {
      throw new MissingRpcUrlError();
    }

    // TODO: integrate with your smart contract using ethers.js or viem.
    // This placeholder demonstrates where to orchestrate off-chain validation
    // (signatures, allowlists, jackpot balance checks, etc.).
    return { transactionHash: "0xplaceholder" };
  },
};
