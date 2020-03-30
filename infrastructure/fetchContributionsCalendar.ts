import graphql from "lib/graphql";
import { ContributionsPerMonth } from "models/Contributions";
import TimelineData from "models/TimelineData";
import {
  GraphQLContributionCalendarResponse,
  Week
} from "./dto/graphql/contributionsCalendarDTOs";

export default function fetchContributionsCalendar(
  username: string
): Promise<TimelineData> {
  return graphql(`query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`).then((res: GraphQLContributionCalendarResponse) => {
    const calendar = res.data.user.contributionsCollection.contributionCalendar;
    return {
      totalContributions: calendar.totalContributions,
      contributionsPerMonth: countContributionsPerMonth(calendar.weeks)
    };
  });
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
