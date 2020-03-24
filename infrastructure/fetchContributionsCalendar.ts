import { ContributionsPerMonth } from "models/Contributions";
import httpPost from "../lib/httpPost";
import {
  GraphQLContributionCalendarResponse,
  Week
} from "./dto/graphql/contributionsCalendarDTOs";

export default function fetchContributionsCalendar(
  username: string
): Promise<ContributionsPerMonth[]> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLContributionCalendarResponse) => {
      return countContributionsPerMonth(
        res.data.user.contributionsCollection.contributionCalendar.weeks
      );
    }
  );
}

const countContributionsPerMonth = (weeks: Week[]): ContributionsPerMonth[] => {
  const contributionsPerMonth = [];

  let currentMonth = dateStringToMonthString(weeks[0].contributionDays[0].date);
  let currentMonthContributions = 0;

  for (const week of weeks) {
    for (const contributionDay of week.contributionDays) {
      const month = dateStringToMonthString(contributionDay.date);
      if (month === currentMonth) {
        currentMonthContributions += contributionDay.contributionCount;
      } else {
        contributionsPerMonth.push({
          month: currentMonth,
          contributions: currentMonthContributions
        });
        currentMonth = month;
        currentMonthContributions = contributionDay.contributionCount;
      }
    }
  }
  contributionsPerMonth.push({
    month: currentMonth,
    contributions: currentMonthContributions
  });
  return contributionsPerMonth;
};

const dateStringToMonthString = (date: string): string => {
  return new Date(date).toDateString().split(" ")[1];
};
