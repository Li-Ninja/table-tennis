export interface Player {
  id: number;
  name: string;
  score: number;
  resultCount: number;
  winningCount: number;
  latestResultDateTime?: string;
  updateDateTime?: string;
}
