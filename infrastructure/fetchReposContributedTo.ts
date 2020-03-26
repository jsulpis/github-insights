import { RepositoryContributedTo } from "models/Repository";
import httpPost from "../lib/httpPost";
import {
  GraphQLRepositoriesContributedToResponse,
  RepositoryNode
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
                  nodes {
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
            }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLRepositoriesContributedToResponse) =>
      toRepositories(res.data.user.repositoriesContributedTo.nodes)
  );
}

function toRepositories(
  repositoryEdges: RepositoryNode[]
): RepositoryContributedTo[] {
  return repositoryEdges.map(repoNode => {
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
