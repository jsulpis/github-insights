export default class Repository {
  constructor(
    public name: string,
    public url: string,
    public description: string,
    public creationDate: Date,
    public updateDate: Date,
    public language: string,
    public size: number,
    public license: string,
    public forks: number,
    public stars: number,
    public forked: boolean,
    public archived: boolean
  ) {}
}
