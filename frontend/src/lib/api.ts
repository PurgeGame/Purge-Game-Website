export type JackpotResponse = {
  poolValue: number;
  lastWinner: string | null;
  updatedAt: string;
};

const DEFAULT_API_BASE_URL = "http://localhost:3001";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL;

export async function fetchJackpot(): Promise<JackpotResponse | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/api/jackpot`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      console.error("Failed to fetch jackpot", res.statusText);
      return null;
    }
    return (await res.json()) as JackpotResponse;
  } catch (error) {
    console.error("Failed to reach API", error);
    return null;
  }
}
