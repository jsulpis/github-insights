import { Language } from "./Language";

export default class Repository {
  constructor(
    public name: string,
    public description: string,
    public url: string,
    public isForked: boolean,
    public isArchived: boolean,
    public creationDate: Date,
    public updateDate: Date,
    public diskUsage: number,
    public forkCount: number,
    public starCount: number,
    public primaryLanguage: Language,
    public license: string
  ) {}
}
