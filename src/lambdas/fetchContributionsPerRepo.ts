import graphql from "lib/graphql";
import { ContributionsPerRepo } from "models/Contributions";
import { Language } from "models/Language";
import {
  ContributionPerRepo,
  GraphQLContributionsPerRepoResponse
} from "./dto/graphql/contributionsByRepoDTOs";

export default function fetchContributionsPerRepo(
  username: string
): Promise<ContributionsPerRepo[]> {
  return graphql(`query {
    user(login: "${username}") {
      contributionsCollection {
        commitContributionsByRepository(maxRepositories: 11) {
          contributions {
            totalCount
          },
          repository {
            name,
            primaryLanguage {
              name,
              color
            }
          }
        }
      }
    }
  }`).then((res: GraphQLContributionsPerRepoResponse) => {
    return formatResonse(
      res.data.user.contributionsCollection.commitContributionsByRepository
    );
  });
}

const formatResonse = (response: ContributionPerRepo[]): ContributionsPerRepo[] => {
  return response.map(contributionsByRepoDto => {
    const emptyLanguage: Language = { name: "None", color: "" };
    const language = contributionsByRepoDto.repository.primaryLanguage || emptyLanguage;
    return {
      repoName: contributionsByRepoDto.repository.name,
      primaryLanguage: {
        name: language.name,
        color: language.color
      },
      contributions: contributionsByRepoDto.contributions.totalCount
    };
  });
};
