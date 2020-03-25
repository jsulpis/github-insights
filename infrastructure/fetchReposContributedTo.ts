import { RepositoryContributedTo } from "models/Repository";
import httpPost from "../lib/httpPost";
import {
  GraphQLRepositoriesContributedToResponse,
  RepositoryEdge
} from "./dto/graphql/reposDTOs";

export default function fetchReposContributedTo(
  username: string
): Promise<RepositoryContributedTo[]> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const body = {
    query: `query {
              user(login:"${username}") {
                repositoriesContributedTo(first: 100, includeUserRepositories: true, contributionTypes:[COMMIT, PULL_REQUEST, PULL_REQUEST_REVIEW, REPOSITORY]) {
                  edges {
                    node {
                      name,
                      diskUsage,
                      primaryLanguage {
                        name,
                        color
                      },
                      defaultBranchRef {
                        target {
                          ... on Commit {
                            history(first: 0) {
                              totalCount
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLRepositoriesContributedToResponse) =>
      toRepositories(res.data.user.repositoriesContributedTo.edges)
  );
}

function toRepositories(
  repositoryEdges: RepositoryEdge[]
): RepositoryContributedTo[] {
  return repositoryEdges.map(repoEdge => {
    const repoNode = repoEdge.node;
    return {
      name: repoNode.name,
      diskUsage: repoNode.diskUsage,
      primaryLanguage: repoNode.primaryLanguage,
      commitCount: repoNode.defaultBranchRef
        ? repoNode.defaultBranchRef.target.history.totalCount
        : null
    };
  });
}
