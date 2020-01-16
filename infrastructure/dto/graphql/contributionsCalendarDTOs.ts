export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface Week {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  weeks: Week[];
}

export interface GraphQLContributionCalendarResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar;
      };
    };
  };
}
