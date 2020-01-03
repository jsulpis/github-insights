export default class User {
  constructor(
    public profileUrl: string,
    public username: string,
    public name: string,
    public avatarUrl: string,
    public bio: string,
    public company: string,
    public website: string,
    public location: string,
    public email: string,
    public hireable: boolean,
    public followers: number,
    public followersUrl: string,
    public gists: number,
    public gistsUrl: string,
    public repos: number
  ) {}
}
