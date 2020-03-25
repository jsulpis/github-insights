import { RepositoryOwned } from "models/Repository";
import httpPost from "../lib/httpPost";
import {
  GraphQLOwnedRepositoriesResponse,
  RepositoryEdge
} from "./dto/graphql/reposDTOs";

export default function fetchOwnedRepos(
  username: string
): Promise<RepositoryOwned[]> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const body = {
    query: `query {
              user(login:"${username}") {
                repositories(first: 100, ownerAffiliations: [OWNER], privacy: PUBLIC) {
                  edges {
                    node {
                      name,
                      forkCount,
                      stargazers {
                        totalCount
                      },
                      primaryLanguage {
                        name,
                        color
                      }
                    }
                  }
                }
              }
            }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLOwnedRepositoriesResponse) =>
      toRepositories(res.data.user.repositories.edges)
  );
}

function toRepositories(repositoryEdges: RepositoryEdge[]): RepositoryOwned[] {
  return repositoryEdges.map(repoEdge => {
    const repoNode = repoEdge.node;
    return {
      name: repoNode.name,
      primaryLanguage: repoNode.primaryLanguage,
      starCount: repoNode.stargazers ? repoNode.stargazers.totalCount : null,
      forkCount: repoNode.forkCount
    };
  });
}
