export type Affirmation = {
  id: string;
  text: string;
  createdAt: string; // ISO string
  sourceType: 'daily' | 'custom';
  tags?: string[];
};

export type DailyCache = {
  date: string; // YYYY-MM-DD (local date)
  affirmation: Affirmation;
};
