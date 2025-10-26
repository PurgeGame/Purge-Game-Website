# Purge Games Web Stack

Monorepo that holds the web surface for Purge Games. It ships a Next.js frontend for NFT minting and live jackpot displays plus a TypeScript/Express backend that talks to the blockchain and your databases.

## Repository Layout

- `frontend/` – Next.js (App Router) UI with Tailwind 4, ready for Vercel. Fetches jackpot data from the API and outlines the mint/jackpot flow.
- `backend/` – Express + TypeScript API with Zod validation. Includes placeholder services for blockchain mint relays and jackpot state (swap to Postgres/Redis when ready).
- `.github/` – Workflow and Copilot instructions; extend with CI later.
- `.env.example` files – Copy to `.env` / `.env.local` and fill in the real secrets before running locally or deploying.

## Getting Started

Requirements: Node.js 18+ (or Bun 1.1+ if you prefer), npm or pnpm, and Redis/Postgres running locally when you wire them up.

```bash
git clone <your-repo-url>
cd purge-game-website

# Frontend
cp frontend/.env.example frontend/.env.local
cd frontend
npm install
npm run dev
# -> http://localhost:3000

# Backend (in a second terminal)
cp backend/.env.example backend/.env
cd backend
npm install
npm run dev
# -> http://localhost:3001/api/health
```

Update the backend `.env` with your blockchain RPC URL, Postgres, and Redis credentials. When you hook up ethers/viem, use `blockchainService.requestMint` as the entry point for custom logic.

## Deploying

- **Frontend** – push the repo to GitHub and import the `frontend` directory into Vercel. Set `NEXT_PUBLIC_API_URL=https://api.purge.games`.
- **Backend** – deploy `backend` to Render/Railway/Fly as a Node service. Provision managed Postgres + Redis and map the environment variables. Expose it via `https://api.purge.games`.
- Put Cloudflare in front of Namecheap for DNS + SSL. Point `purge.games` (and `www`) to Vercel; point `api.purge.games` to the backend host. Enable proxying/WAF.

## Next Steps

1. Swap the in-memory jackpot service for Redis or Postgres state and add worker scripts for blockchain ingestion.
2. Integrate wagmi/RainbowKit on the frontend and wire wallet auth to `POST /api/mint`.
3. Add automated tests (Vitest + supertest for the API, Playwright for UI smoke tests) and CI workflows in `.github/workflows/`.
4. Configure observability (Logtail/Sentry/Datadog) and add GitHub Actions to auto-deploy main → staging → production.
