import { LanguageNode } from "./languagesDTO";

export interface ContributionPerRepo {
  contributions: {
    totalCount: number;
  };
  repository: {
    name: string;
    primaryLanguage: LanguageNode;
  };
}

export interface GraphQLContributionsPerRepoResponse {
  data: {
    user: {
      contributionsCollection: {
        commitContributionsByRepository: ContributionPerRepo[];
      };
    };
  };
}
