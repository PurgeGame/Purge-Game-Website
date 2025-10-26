import { Router } from "express";
import { jackpotService } from "../services/jackpotService";

const router = Router();

router.get("/", (_req, res) => {
  const current = jackpotService.getCurrentJackpot();
  res.json(current);
});

export const jackpotRouter = router;
