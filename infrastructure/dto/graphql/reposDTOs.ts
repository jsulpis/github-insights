import { Language } from "models/Language";

export interface RepositoryNode {
  name: string;
  primaryLanguage: Language;
  forkCount?: number;
  stargazers?: { totalCount: number };
  diskUsage?: number;
  defaultBranchRef?: {
    target: {
      history: {
        totalCount: number;
      };
    };
  };
}

export interface RepositoryEdge {
  node: RepositoryNode;
}

export interface GraphQLRepositoriesContributedToResponse {
  data: {
    user: {
      repositoriesContributedTo: {
        edges: RepositoryEdge[];
      };
    };
  };
}

export interface GraphQLOwnedRepositoriesResponse {
  data: {
    user: {
      repositories: {
        edges: RepositoryEdge[];
      };
    };
  };
}
