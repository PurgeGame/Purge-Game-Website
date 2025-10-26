type JackpotStats = {
  poolValue: number;
  lastWinner: string | null;
  updatedAt: string;
};

const defaultStats: JackpotStats = {
  poolValue: 0,
  lastWinner: null,
  updatedAt: new Date().toISOString(),
};

// TODO: Replace with Redis/database backed implementation.
let inMemoryStats = { ...defaultStats };

export const jackpotService = {
  getCurrentJackpot(): JackpotStats {
    return inMemoryStats;
  },

  updateJackpot(nextStats: Partial<JackpotStats>) {
    inMemoryStats = {
      ...inMemoryStats,
      ...nextStats,
      updatedAt: new Date().toISOString(),
    };
  },

  reset() {
    inMemoryStats = { ...defaultStats, updatedAt: new Date().toISOString() };
  },
};
