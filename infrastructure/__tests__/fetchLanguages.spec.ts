import fetchRepos from "infrastructure/fetchRepos";
import httpGet from "lib/httpGet";
import fetchLanguages from "../fetchLanguages";

jest.mock("infrastructure/fetchRepos");
jest.mock("lib/httpGet");

describe("fetchLanguages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of languages with a size", async () => {
    // Given
    const mockReposList = [
      { name: "personal-website" },
      { name: "blender-addons" }
    ];
    const REPO1_LANGUAGE_URL =
      "https://api.github.com/repos/jsulpis/personal-website/languages";
    const REPO2_LANGUAGE_URL =
      "https://api.github.com/repos/jsulpis/blender-addons/languages";
    const mockLanguagesRepo1 = {
      Vue: 60718,
      JavaScript: 11455,
      CSS: 452
    };
    const mockLanguagesRepo2 = {
      Python: 23651,
      JavaScript: 100
    };

    (fetchRepos as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockReposList)
    );

    (httpGet as jest.Mock).mockImplementation((url: string) => {
      if (url === REPO1_LANGUAGE_URL) {
        return Promise.resolve(mockLanguagesRepo1);
      } else if (url === REPO2_LANGUAGE_URL) {
        return Promise.resolve(mockLanguagesRepo2);
      }
    });

    // When
    const languages = await fetchLanguages("jsulpis");

    // Then
    const expectedLanguages = {
      Vue: 60718,
      JavaScript: 11555,
      CSS: 452,
      Python: 23651
    };

    expect(fetchRepos).toHaveBeenCalledWith("jsulpis");
    expect(httpGet).toHaveBeenCalledTimes(2);
    expect(httpGet).toHaveBeenNthCalledWith(1, REPO1_LANGUAGE_URL);
    expect(httpGet).toHaveBeenNthCalledWith(2, REPO2_LANGUAGE_URL);
    expect(languages).toEqual(expectedLanguages);
  });
});
