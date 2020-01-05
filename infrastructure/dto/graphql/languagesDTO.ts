export interface LanguageEdge {
  size: number;
  node: {
    name: string;
  };
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
