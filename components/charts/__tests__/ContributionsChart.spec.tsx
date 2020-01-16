import { render, wait } from "@testing-library/react";
import { ContributionsPerMonth } from "models/ContributionsPerMonth";
import React from "react";
import ContributionsChart from "../Contributions/ContributionsChart";

describe("ContributionsChart", () => {
  it("displays the total number of contributions", async () => {
    const contributions: ContributionsPerMonth[] = [
      { month: "Jan", contributions: 12 },
      { month: "Feb", contributions: 10 },
      { month: "Mar", contributions: 5 }
    ];
    const { container } = render(
      <ContributionsChart contributions={contributions} />
    );

    await wait(() => {
      expect(container.querySelector("h5").textContent).toBe(
        "27 contributions in the last year"
      );
    });
  });
});
