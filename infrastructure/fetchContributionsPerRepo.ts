import httpPost from "lib/httpPost";
import { ContributionsPerRepo } from "models/ContributionsPerRepo";
import { Language } from "models/Language";
import {
  ContributionPerRepo,
  GraphQLContributionsPerRepoResponse
} from "./dto/graphql/contributionsByRepoDTOs";

export default function fetchContributionsPerRepo(
  username: string
): Promise<ContributionsPerRepo[]> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              contributionsCollection {
                commitContributionsByRepository {
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
          }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLContributionsPerRepoResponse) => {
      return formatResonse(
        res.data.user.contributionsCollection.commitContributionsByRepository
      );
    }
  );
}

const formatResonse = (
  response: ContributionPerRepo[]
): ContributionsPerRepo[] => {
  return response.map(contributionsByRepoDto => {
    const emptyLanguage: Language = { name: "None", color: "" };
    const language =
      contributionsByRepoDto.repository.primaryLanguage || emptyLanguage;
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