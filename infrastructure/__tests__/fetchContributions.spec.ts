import httpPost from "../../lib/httpPost";
import fetchContributions from "../fetchContributions";

jest.mock("lib/httpPost");

describe("fetchContributions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return contributions for a user", async () => {
    // Given
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockContributions.json"))
    );

    // When
    const contributions = await fetchContributions("jsulpis");

    // Then
    const expectedContributions = [
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

    expect(httpPost).toHaveBeenCalled();
    expect(contributions).toEqual(expectedContributions);
  });
});
