import httpPost from "lib/httpPost";
import { ContributionsPerMonth } from "models/Contributions";
import fetchContributionsCalendar from "../fetchContributionsCalendar";
import TimelineData from "models/TimelineData";

jest.mock("lib/httpPost");

fdescribe("fetchContributionsCalendar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return contributions for a user", async () => {
    // Given
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockContributionsCalendar.json"))
    );

    // When
    const timelineData = await fetchContributionsCalendar("jsulpis");

    // Then
    const expectedContributions: ContributionsPerMonth[] = [
      { month: "Dec", contributions: 0 },
      { month: "Jan", contributions: 30 },
      { month: "Feb", contributions: 0 },
      { month: "Mar", contributions: 5 },
      { month: "Apr", contributions: 26 },
      { month: "May", contributions: 59 },
      { month: "Jun", contributions: 42 },
      { month: "Jul", contributions: 18 },
      { month: "Aug", contributions: 61 },
      { month: "Sep", contributions: 13 },
      { month: "Oct", contributions: 3 },
      { month: "Nov", contributions: 4 },
      { month: "Dec", contributions: 7 }
    ];
    const expectedOutput: TimelineData = {
      totalContributions: 251,
      contributionsPerMonth: expectedContributions
    };

    expect(httpPost).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.anything(),
      { Authorization: expect.stringContaining("bearer ") }
    );
    expect(timelineData).toEqual(expectedOutput);
  });
});
