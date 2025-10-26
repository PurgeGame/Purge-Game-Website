import { Router } from "express";
import { env } from "../config/env";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

export const healthRouter = router;
