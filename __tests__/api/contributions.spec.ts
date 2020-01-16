import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import contributionsApi from "pages/api/[username]/timeline";
import fetchContributionsCalendar from "../../infrastructure/fetchContributionsCalendar";

jest.mock("infrastructure/fetchContributionsCalendar");

describe("User api", () => {
  it("should return a user", async () => {
    // Given
    const MOCK_CONTRIBS = [
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
      { month: "Nov", contributions: 4 }
    ];

    (fetchContributionsCalendar as jest.Mock).mockImplementation(() =>
      Promise.resolve(MOCK_CONTRIBS)
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await contributionsApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchContributionsCalendar).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_CONTRIBS);
  });

  it("should forward errors", async () => {
    (fetchContributionsCalendar as jest.Mock).mockImplementation(() =>
      Promise.reject({ status: 401, message: "Unauthorized" })
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await contributionsApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchContributionsCalendar).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual("Unauthorized");
  });
});
