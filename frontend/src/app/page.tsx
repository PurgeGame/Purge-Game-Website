import Link from "next/link";
import { fetchJackpot } from "@/lib/api";

export const revalidate = 5;

export default async function Home() {
  const jackpot = await fetchJackpot();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <span className="text-lg font-semibold tracking-tight">Purge Games</span>
          <nav className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-slate-300">
            <Link className="hover:text-white transition-colors" href="#mint">
              Mint
            </Link>
            <Link className="hover:text-white transition-colors" href="#jackpot">
              Jackpot
            </Link>
            <Link className="hover:text-white transition-colors" href="#games">
              Side Games
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-16">
        <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-400">Season One</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Mint your Purge avatar and play for the nightly jackpot.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-slate-300">
              Connect your wallet, mint a Purge NFT, and join high-voltage side games that feed the
              community jackpot. When the timer hits zero, one survivor takes it all.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#mint"
                className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-sky-400"
              >
                Start Minting
              </Link>
              <Link
                href="#jackpot"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-sky-400/60 hover:text-sky-300"
              >
                View Jackpot
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Jackpot Total</p>
            <p className="mt-4 text-5xl font-semibold">
              {jackpot ? `$${jackpot.poolValue.toLocaleString()}` : "Loading..."}
            </p>
            <dl className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt>Last Winner</dt>
                <dd>{jackpot?.lastWinner ?? "TBD"}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Updated</dt>
                <dd>{jackpot ? new Date(jackpot.updatedAt).toLocaleTimeString() : "—"}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-slate-400">
              Jackpots refresh automatically from the chain every few seconds.
            </p>
          </div>
        </section>

        <section id="mint" className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-10">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-sky-400">Minting</p>
            <h2 className="text-3xl font-semibold">Secure mint flow designed for degen-proofing</h2>
            <p className="text-slate-300">
              Wallet connection and mint transactions are relayed through our backend so we can add
              anti-bot logic, allow lists, and jackpot contribution tracking.
            </p>
          </header>
          <ol className="space-y-4 text-sm text-slate-200">
            <li>
              1. Connect supported wallets (MetaMask, Rainbow, Coinbase) using wagmi/RainbowKit on
              the frontend.
            </li>
            <li>
              2. Request a signed mint from the backend API, which validates eligibility and relays
              the on-chain transaction.
            </li>
            <li>3. Jackpot and side-game balances update instantly once the mint is confirmed.</li>
          </ol>
          <p className="text-xs text-slate-400">
            Hook this section up to your wallet provider when you are ready; the API route
            `/api/mint` already accepts payload validation.
          </p>
        </section>

        <section
          id="jackpot"
          className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-sky-900/60 p-10"
        >
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-sky-400">Jackpot Engine</p>
            <h2 className="text-3xl font-semibold">Powered by your chain events</h2>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-lg font-semibold text-white">Chain ingestion</p>
              <p className="mt-2 text-sm text-slate-200">
                Workers listen for mint and game events, mirror them into Postgres, and publish live
                totals to Redis so the API responds in under 50ms.
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Fair picks</p>
              <p className="mt-2 text-sm text-slate-200">
                Deterministic jackpot drawings anchored by verifiable random functions and signed
                proofs saved for audits.
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Player trust</p>
              <p className="mt-2 text-sm text-slate-200">
                Transparent history and payout receipts keep your community focused on the thrill,
                not the math.
              </p>
            </div>
          </div>
        </section>

        <section
          id="games"
          className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 md:grid-cols-2"
        >
          <header className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.4em] text-sky-400">Side Games</p>
            <h2 className="mt-2 text-3xl font-semibold">Mini-games that power the purge</h2>
            <p className="mt-2 text-slate-300">
              Build each game as a micro-frontend or in-engine webview and wire it into the backend
              via authenticated sockets or HTTP.
            </p>
          </header>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/30 p-6">
            <p className="text-lg font-semibold text-white">Survival Rounds</p>
            <p className="text-sm text-slate-200">
              Timed elimination minigames; last wallet standing pushes 5% of the pot into the main
              jackpot.
            </p>
          </div>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/30 p-6">
            <p className="text-lg font-semibold text-white">Loot Raids</p>
            <p className="text-sm text-slate-200">
              Rapid-fire decision games with daily leaderboards backed by Postgres materialized
              views.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Purge Games. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://twitter.com" className="hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="mailto:founders@purge.games" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
