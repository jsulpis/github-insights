import { Language } from "./Language";

export interface RepositoryOwned {
  name: string;
  forkCount: number;
  starCount: number;
  primaryLanguage: Language;
  languages: Array<Language & { amountOfCodeInBytes: number }>;
}

export interface RepositoryContributedTo {
  nameWithOwner: string;
  diskUsage: number;
  commitCount: number;
  primaryLanguage: Language;
}
