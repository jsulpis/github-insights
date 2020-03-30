import graphql from "lib/graphql";
import { ContributionsPerRepo } from "models/ContributionsPerRepo";
import fetchContributionsPerRepo from "../fetchContributionsPerRepo";

jest.mock("lib/graphql");

describe("fetchContributionsPerRepo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return contributions for a user", async () => {
    // Given
    (graphql as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockContributionsPerRepo.json"))
    );

    // When
    const contributions = await fetchContributionsPerRepo("jsulpis");

    // Then
    const expectedContributions: ContributionsPerRepo[] = [
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
      },
      {
        repoName: "readme-templates",
        primaryLanguage: { name: "None", color: "" },
        contributions: 1
      }
    ];

    expect(graphql).toHaveBeenCalled();
    expect(contributions).toEqual(expectedContributions);
  });
});
