import httpPost from "lib/httpPost";
import { ContributionsPerRepo } from "models/ContributionsPerRepo";
import {
  ContributionByRepo,
  GraphQLContributionsByRepoResponse
} from "./dto/graphql/contributionsByRepoDTOs";

export default function fetchContributionsByRepo(
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
                    name
                  }
                }
              }
            }
          }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLContributionsByRepoResponse) => {
      return formatResonse(
        res.data.user.contributionsCollection.commitContributionsByRepository
      );
    }
  );
}

const formatResonse = (
  response: ContributionByRepo[]
): ContributionsPerRepo[] => {
  return response.map(contributionsByRepoDto => ({
    repoName: contributionsByRepoDto.repository.name,
    contributions: contributionsByRepoDto.contributions.totalCount
  }));
};
