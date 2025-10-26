import { Router } from "express";
import { z } from "zod";
import { blockchainService } from "../services/blockchainService";

const router = Router();

const mintRequestSchema = z.object({
  walletAddress: z.string().min(1, "walletAddress is required"),
  mintAmount: z.number().int().positive().max(10, "mintAmount exceeds limit"),
});

router.post("/", async (req, res, next) => {
  try {
    const payload = mintRequestSchema.parse(req.body);
    const result = await blockchainService.requestMint(payload);
    res.status(202).json(result);
  } catch (error) {
    next(error);
  }
});

export const mintRouter = router;
