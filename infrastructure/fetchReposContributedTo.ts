import graphql from "lib/graphql";
import { RepositoryContributedTo } from "models/Repository";
import {
  GraphQLRepositoriesContributedToResponse,
  RepositoryNode
} from "./dto/graphql/reposDTOs";

export default function fetchReposContributedTo(
  username: string
): Promise<RepositoryContributedTo[]> {
  return graphql(`query {
    user(login:"${username}") {
      repositoriesContributedTo(first: 30, orderBy: {field: PUSHED_AT, direction: DESC}, includeUserRepositories: true, contributionTypes:[COMMIT, PULL_REQUEST, REPOSITORY]) {
        nodes {
          nameWithOwner,
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
  }`).then((res: GraphQLRepositoriesContributedToResponse) =>
    toRepositories(res.data.user.repositoriesContributedTo.nodes)
  );
}

function toRepositories(
  repositoryEdges: RepositoryNode[]
): RepositoryContributedTo[] {
  return repositoryEdges.map(repoNode => {
    return {
      nameWithOwner: repoNode.nameWithOwner,
      diskUsage: repoNode.diskUsage,
      primaryLanguage: repoNode.primaryLanguage,
      commitCount: repoNode.defaultBranchRef
        ? repoNode.defaultBranchRef.target.history.totalCount
        : null
    };
  });
}
