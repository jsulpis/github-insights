import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchLanguages from "infrastructure/fetchLanguages";
import languageApi from "pages/api/languages";

jest.mock("infrastructure/fetchLanguages");

describe("Languages api", () => {
  it("should return a list of languages", async () => {
    // Given
    const MOCK_LANGUAGES = {
      Vue: 60718,
      JavaScript: 11555,
      CSS: 452,
      Python: 23651
    };
    (fetchLanguages as jest.Mock).mockImplementation(() =>
      Promise.resolve(MOCK_LANGUAGES)
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await languageApi(null, res);

    // Then
    expect(fetchLanguages).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_LANGUAGES);
  });
});
