import { render, wait } from "@testing-library/react";
import { ContributionsPerMonth } from "models/ContributionsPerMonth";
import { ContributionsPerRepo } from "models/ContributionsPerRepo";
import React from "react";
import ContributionsChart from "../Contributions/ContributionsChart";

describe("ContributionsChart", () => {
  it("displays the total number of contributions", async () => {
    const contributionsPerMonth: ContributionsPerMonth[] = [
      { month: "Jan", contributions: 12 },
      { month: "Feb", contributions: 10 },
      { month: "Mar", contributions: 5 }
    ];
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
    const { container } = render(
      <ContributionsChart
        contributionsPerMonth={contributionsPerMonth}
        contributionsPerRepo={contributionsPerRepo}
      />
    );

    await wait(() => {
      expect(container.querySelector("h5").textContent).toBe(
        "27 contributions in the last year"
      );
    });
  });
});
