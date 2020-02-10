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
                repositoriesContributedTo(first: 100, includeUserRepositories: true, contributionTypes:[COMMIT,ISSUE, PULL_REQUEST, PULL_REQUEST_REVIEW]) {
                  edges {
                    node {
                      name,
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
    (res: GraphQLRepositoriesResponse) =>
      toRepositories(res.data.user.repositoriesContributedTo.edges)
  );
}

function toRepositories(repositoryEdges: RepositoryEdge[]): Repository[] {
  return repositoryEdges.map(repoEdge => {
    const repoNode = repoEdge.node;
    return new Repository(
      repoNode.name,
      new Date(repoNode.updatedAt),
      repoNode.diskUsage,
      repoNode.forkCount,
      repoNode.stargazers ? repoNode.stargazers.totalCount : null,
      repoNode.primaryLanguage,
      repoNode.defaultBranchRef
        ? repoNode.defaultBranchRef.target.history.totalCount
        : null
    );
  });
}
