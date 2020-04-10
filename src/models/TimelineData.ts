import { ContributionsPerMonth } from "./Contributions";

export default interface TimelineData {
  totalContributions: number;
  contributionsPerMonth: ContributionsPerMonth[];
}
