import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined)),
    RPC_URL: z.string().url().optional(),
    DATABASE_URL: z.string().optional(),
    REDIS_URL: z.string().optional(),
    JWT_SECRET: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    PORT: data.PORT ?? 3001,
  }));

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  rpcUrl: parsed.data.RPC_URL,
  databaseUrl: parsed.data.DATABASE_URL,
  redisUrl: parsed.data.REDIS_URL,
  jwtSecret: parsed.data.JWT_SECRET,
};

export const isProduction = env.nodeEnv === "production";
