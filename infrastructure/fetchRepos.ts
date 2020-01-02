import httpGet from "lib/httpGet";
import Repository from "models/Repository";
import RepositoryDTO from "./dto/RepositoryDTO";

export default function fetchRepos(username: string): Promise<Repository[]> {
  return httpGet(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((payload: any[]) => payload.map(repo => new RepositoryDTO(repo)))
    .then((repositoryDtos: RepositoryDTO[]) =>
      repositoryDtos.map(repositoryDto => repositoryDto.toModel())
    );
}
