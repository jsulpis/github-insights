import { render } from "@testing-library/react";
import { ContributionsPerRepo } from "models/Contributions";
import React from "react";
import ContributionsChart from "./ContributionsChart";
import TimelineData from "models/TimelineData";

jest.mock("react-chartjs-2");

describe("ContributionsChart", () => {
  it("displays the total number of contributions", async () => {
    const timelineData: TimelineData = {
      totalContributions: 27,
      contributionsPerMonth: [
        { month: "Jan", contributions: 12 },
        { month: "Feb", contributions: 10 },
        { month: "Mar", contributions: 5 }
      ]
    };
    const contributionsPerRepo: ContributionsPerRepo[] = [
      {
        repoName: "personal-website",
        primaryLanguage: {
          name: "Vue",
          color: "#2c3e50"
        },
        contributions: 50
      },
      {
        repoName: "daily-recap",
        primaryLanguage: {
          name: "TypeScript",
          color: "#2b7489"
        },
        contributions: 48
      }
    ];
    const { findByText } = render(
      <ContributionsChart
        timelineData={timelineData}
        contributionsPerRepo={contributionsPerRepo}
      />
    );

    expect(await findByText("27 contributions in the last year")).toBeTruthy();
  });
});
