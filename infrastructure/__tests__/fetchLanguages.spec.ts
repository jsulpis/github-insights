import httpPost from "../../lib/httpPost";
import fetchLanguages from "../fetchLanguages";

jest.mock("lib/httpPost");

describe("fetchLanguages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of languages with a size", async () => {
    // Given
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockLanguages.json"))
    );

    // When
    const languages = await fetchLanguages("jsulpis");

    // Then
    const expectedLanguages = {
      CSS: 1556,
      Java: 75172,
      JavaScript: 1336
    };

    expect(httpPost).toHaveBeenCalledTimes(1);
    expect(httpPost).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.anything(),
      { Authorization: expect.stringContaining("bearer ") }
    );
    expect(languages).toEqual(expectedLanguages);
  });
});
