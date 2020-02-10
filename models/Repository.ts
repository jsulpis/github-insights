import { Language } from "./Language";

export default class Repository {
  constructor(
    public name: string,
    public updateDate: Date,
    public diskUsage: number,
    public forkCount: number,
    public starCount: number,
    public primaryLanguage: Language,
    public commitCount: number
  ) {}
}
