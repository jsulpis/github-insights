import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchUser from "infrastructure/fetchUser";
import userApi from "pages/api/user";

jest.mock("infrastructure/fetchUser");

describe("User api", () => {
  it("should return a user", () => {
    // Given
    const MOCK_USER = {
      profileUrl: "https://api.github.com/users/jsulpis",
      username: "jsulpis",
      avatarUrl: "https://avatars2.githubusercontent.com/u/22420399?v=4",
      bio:
        "Full stack developer at @Zenika.\r\nPlaying with web technologies, computer graphics and electronics.",
      company: "@Zenika",
      website: "www.juliensulpis.fr",
      location: "Lyon, France",
      email: null,
      hireable: null,
      name: "Julien Sulpis",
      followers: 4,
      followersUrl: "https://api.github.com/users/jsulpis/followers",
      gists: 2,
      gistsUrl: "https://api.github.com/users/jsulpis/gists{/gist_id}"
    };
    (fetchUser as jest.Mock).mockImplementation(() => MOCK_USER);

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    userApi(null, res);

    // Then
    expect(fetchUser).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_USER);
  });
});
