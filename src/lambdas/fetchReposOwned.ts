import graphql from "lib/graphql";
import { RepositoryOwned } from "models/Repository";
import {
  GraphQLOwnedRepositoriesResponse,
  RepositoryNode
} from "./dto/graphql/reposDTOs";

export default function fetchReposOwned(username: string): Promise<RepositoryOwned[]> {
  return graphql(`query {
    user(login:"${username}") {
      repositories(first: 100, ownerAffiliations: [OWNER], orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
        nodes {
          name,
          isFork,
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
  }`).then((res: GraphQLOwnedRepositoriesResponse) =>
    toRepositories(res.data.user.repositories.nodes)
  );
}

function toRepositories(repositories: RepositoryNode[]): RepositoryOwned[] {
  return repositories
    .filter(repo => !repo.isFork)
    .map(repoNode => {
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
