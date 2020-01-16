import httpPost from "lib/httpPost";
import { ContributionsPerRepo } from "models/ContributionsPerRepo";
import fetchContributionsPerRepo from "../fetchContributionsPerRepo";

jest.mock("lib/httpPost");

describe("fetchContributionsPerRepo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return contributions for a user", async () => {
    // Given
    (httpPost as jest.Mock).mockImplementation(() =>
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

    expect(httpPost).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.anything(),
      { Authorization: expect.stringContaining("bearer ") }
    );
    expect(contributions).toEqual(expectedContributions);
  });
});
