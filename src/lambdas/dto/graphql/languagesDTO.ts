export interface LanguageNode {
  name: string;
  color: string;
}

export interface LanguageEdge {
  size: number;
  node: LanguageNode;
}

export interface RepositoryEdge {
  node: {
    languages: {
      edges: LanguageEdge[];
    };
  };
}

export interface GraphQLLanguagesResponse {
  data: {
    user: {
      repositories: {
        edges: RepositoryEdge[];
      };
    };
  };
}
