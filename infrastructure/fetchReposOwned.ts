import { RepositoryOwned } from "models/Repository";
import httpPost from "../lib/httpPost";
import {
  GraphQLOwnedRepositoriesResponse,
  RepositoryNode
} from "./dto/graphql/reposDTOs";

export default function fetchReposOwned(
  username: string
): Promise<RepositoryOwned[]> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const body = {
    query: `query {
              user(login:"${username}") {
                repositories(first: 100, ownerAffiliations: [OWNER], orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
                  nodes {
                    name,
                    forkCount,
                    stargazers {
                      totalCount
                    },
                    primaryLanguage {
                      name,
                      color
                    },
                    languages(first:100) {
                      edges {
                        size,
                        node {
                          name,
                          color
                        }
                      }
                    }
                  }
                }
              }
            }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLOwnedRepositoriesResponse) =>
      toRepositories(res.data.user.repositories.nodes)
  );
}

function toRepositories(repositoryEdges: RepositoryNode[]): RepositoryOwned[] {
  return repositoryEdges.map(repoNode => {
    return {
      name: repoNode.name,
      primaryLanguage: repoNode.primaryLanguage,
      languages: repoNode.languages.edges.map(languageEdge => ({
        name: languageEdge.node.name,
        color: languageEdge.node.color,
        amountOfCodeInBytes: languageEdge.size
      })),
      starCount: repoNode.stargazers ? repoNode.stargazers.totalCount : null,
      forkCount: repoNode.forkCount
    };
  });
}
