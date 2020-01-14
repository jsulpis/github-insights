import Repository from "models/Repository";
import httpPost from "../lib/httpPost";
import {
  GraphQLRepositoriesResponse,
  RepositoryEdge
} from "./dto/graphql/reposDTOs";

export default function fetchRepos(username: string): Promise<Repository[]> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const body = {
    query: `query {
              user(login:"${username}") {
                repositories(first: 100 ownerAffiliations:OWNER) {
                  edges {
                    node {
                      name,
                      description,
                      url,
                      isPrivate,
                      isFork,
                      isArchived,
                      isDisabled,
                      createdAt,
                      updatedAt,
                      diskUsage,
                      forkCount,
                      stargazers {
                        totalCount
                      },
                      primaryLanguage {
                        name,
                        color
                      },
                      licenseInfo {
                        spdxId
                      }
                    }
                  }
                }
              }
            }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLRepositoriesResponse) =>
      toRepositories(res.data.user.repositories.edges)
  );
}

function toRepositories(repositoryEdges: RepositoryEdge[]): Repository[] {
  return repositoryEdges.map(repoEdge => {
    const repoNode = repoEdge.node;
    return new Repository(
      repoNode.name,
      repoNode.description,
      repoNode.url,
      repoNode.isFork,
      repoNode.isArchived,
      new Date(repoNode.createdAt),
      new Date(repoNode.updatedAt),
      repoNode.diskUsage,
      repoNode.forkCount,
      repoNode.stargazers ? repoNode.stargazers.totalCount : null,
      repoNode.primaryLanguage,
      repoNode.licenseInfo ? repoNode.licenseInfo.spdxId : null
    );
  });
}
