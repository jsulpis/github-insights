import httpPost from "../../lib/httpPost";
import { Language } from "../../models/Language";
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
    const languagesMap = new Map<Language, number>();
    languagesMap.set({ name: "Java", color: "#b07219" }, 75172);
    languagesMap.set({ name: "JavaScript", color: "#f1e05a" }, 1336);
    languagesMap.set({ name: "CSS", color: "#563d7c" }, 1556);

    expect(httpPost).toHaveBeenCalledTimes(1);
    expect(httpPost).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.anything(),
      { Authorization: expect.stringContaining("bearer ") }
    );
    expect(languages).toEqual(languagesMap);
  });
});
