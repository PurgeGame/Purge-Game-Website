import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { apiRouter } from "./routes";
import { env } from "./config/env";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Unexpected server error" });
});

app.listen(env.port, () => {
  console.log(`API server listening on port ${env.port}`);
});
