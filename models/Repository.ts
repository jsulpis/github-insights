import { Language } from "./Language";

export default class Repository {
  constructor(
    public name: string,
    public diskUsage: number,
    public forkCount: number,
    public starCount: number,
    public primaryLanguage: Language,
    public languages: Array<Language & { amountOfCodeInBytes: number }>,
    public commitCount: number
  ) {}
}

export type RepositoryOwned = Pick<
  Repository,
  "name" | "forkCount" | "starCount" | "primaryLanguage" | "languages"
>;

export type RepositoryContributedTo = Pick<
  Repository,
  "name" | "diskUsage" | "primaryLanguage" | "commitCount"
>;
