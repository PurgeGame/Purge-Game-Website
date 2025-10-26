import { Router } from "express";
import { healthRouter } from "./health";
import { jackpotRouter } from "./jackpot";
import { mintRouter } from "./mint";

const router = Router();

router.use("/health", healthRouter);
router.use("/jackpot", jackpotRouter);
router.use("/mint", mintRouter);

export const apiRouter = router;
