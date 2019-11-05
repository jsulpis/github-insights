import Repository from "../../models/Repository";

export default class RepositoryDTO {
  public "name": "android-modules";
  public "description": "A set of common Android components.";
  public "html_url": "https://github.com/jsulpis/android-modules";
  public "private": false;
  public "fork": false;
  public "languages_url": string;
  public "commits_url": string;
  public "created_at": Date;
  public "updated_at": Date;
  public "size": number;
  public "stargazers_count": number;
  public "forks_count": number;
  public "language": string;
  public "archived": boolean;
  public "disabled": boolean;
  public "license": { spdx_id: string };

  constructor(obj) {
    return Object.assign(this, obj);
  }

  public toModel(): Repository {
    return new Repository(
      this.name,
      this.html_url,
      this.description,
      this.created_at,
      this.updated_at,
      this.language,
      this.size,
      this.license.spdx_id,
      this.forks_count,
      this.stargazers_count,
      this.fork,
      this.archived
    );
  }
}
