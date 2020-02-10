import { Language } from "models/Language";

export interface RepositoryNode {
  name: string;
  updatedAt: string;
  diskUsage: number;
  forkCount: number;
  stargazers: { totalCount: number };
  primaryLanguage: Language;
  defaultBranchRef: {
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

export interface GraphQLRepositoriesResponse {
  data: {
    user: {
      repositoriesContributedTo: {
        edges: RepositoryEdge[];
      };
    };
  };
}
