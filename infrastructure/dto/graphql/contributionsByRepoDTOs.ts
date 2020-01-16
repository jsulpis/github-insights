export interface ContributionByRepo {
  contributions: {
    totalCount: number;
  };
  repository: {
    name: string;
  };
}

export interface GraphQLContributionsByRepoResponse {
  data: {
    user: {
      contributionsCollection: {
        commitContributionsByRepository: ContributionByRepo[];
      };
    };
  };
}
