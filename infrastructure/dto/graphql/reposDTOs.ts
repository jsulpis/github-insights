export interface Languages {
  edges: LanguageEdge[];
}

export interface LanguageEdge {
  size: number;
  node: LanguageDTO;
}

export interface LanguageDTO {
  name: string;
  color: string;
}

export interface StargazersDTO {
  totalCount: number;
}

export interface RepositoryNode {
  name?: string;
  nameWithOwner?: string;
  isFork: boolean;
  forkCount?: number;
  stargazers?: StargazersDTO;
  primaryLanguage: LanguageDTO;
  languages?: Languages;
  diskUsage?: number;
  defaultBranchRef?: {
    target: {
      history: {
        totalCount: number;
      };
    };
  };
}

export interface GraphQLRepositoriesContributedToResponse {
  data: {
    user: {
      repositoriesContributedTo: {
        nodes: RepositoryNode[];
      };
    };
  };
}

export interface GraphQLOwnedRepositoriesResponse {
  data: {
    user: {
      repositories: {
        nodes: RepositoryNode[];
      };
    };
  };
}
