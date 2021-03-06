import { Language } from "./Language";

export interface ContributionsPerRepo {
  repoName: string;
  primaryLanguage: Language;
  contributions: number;
}

export interface ContributionsPerMonth {
  month: string;
  contributions: number;
}
