import httpPost from "lib/httpPost";
import { ContributionsPerRepo } from "models/ContributionsPerRepo";
import fetchContributionsByRepo from "../fetchContributionsByRepo";

jest.mock("lib/httpPost");

describe("fetchContributionsByRepo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return contributions for a user", async () => {
    // Given
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockContributionsByRepo.json"))
    );

    // When
    const contributions = await fetchContributionsByRepo("jsulpis");

    // Then
    const expectedContributions: ContributionsPerRepo[] = [
      { repoName: "personal-website", contributions: 50 },
      { repoName: "daily-recap", contributions: 48 },
      { repoName: "java-study", contributions: 48 },
      { repoName: "github-stats", contributions: 27 }
    ];

    expect(httpPost).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.anything(),
      { Authorization: expect.stringContaining("bearer ") }
    );
    expect(contributions).toEqual(expectedContributions);
  });
});
