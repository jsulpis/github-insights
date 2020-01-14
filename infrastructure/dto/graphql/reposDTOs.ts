import { Language } from "models/Language";

export interface RepositoryNode {
  name: string;
  description: string;
  url: string;
  isPrivate: boolean;
  isFork: false;
  isArchived: boolean;
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
  diskUsage: number;
  forkCount: number;
  stargazers: { totalCount: number };
  primaryLanguage: Language;
  licenseInfo: { spdxId: string };
}

export interface RepositoryEdge {
  node: RepositoryNode;
}

export interface GraphQLRepositoriesResponse {
  data: {
    user: {
      repositories: {
        edges: RepositoryEdge[];
      };
    };
  };
}
