import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchContributionsPerRepo from "lambdas/fetchContributionsPerRepo";
import { ContributionsPerRepo } from "models/Contributions";
import contributionsApi from "pages/api/[username]/contributions";

jest.mock("lambdas/fetchContributionsPerRepo");

describe("Contributions api", () => {
  it("should return the number of contributions per repository", async () => {
    // Given
    const MOCK_CONTRIBUTIONS: ContributionsPerRepo[] = [
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

    (fetchContributionsPerRepo as jest.Mock).mockImplementation(() =>
      Promise.resolve(MOCK_CONTRIBUTIONS)
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await contributionsApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchContributionsPerRepo).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_CONTRIBUTIONS);
  });

  it("should forward errors", async () => {
    (fetchContributionsPerRepo as jest.Mock).mockImplementation(() =>
      Promise.reject({ status: 401, message: "Unauthorized" })
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await contributionsApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchContributionsPerRepo).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual("Unauthorized");
  });
});
