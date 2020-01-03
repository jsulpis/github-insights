import httpGet from "lib/httpGet";
import fetchUser from "../fetchUser";

jest.mock("lib/httpGet");

describe("fetchUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a user", async () => {
    // Given
    (httpGet as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockUser.json"))
    );

    // When
    const user = await fetchUser("jsulpis");

    // Then
    const expectedUser = {
      profileUrl: "https://github.com/jsulpis",
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
      gistsUrl: "https://api.github.com/users/jsulpis/gists{/gist_id}",
      repos: 15
    };

    expect(httpGet).toHaveBeenCalledWith(
      "https://api.github.com/users/jsulpis"
    );
    expect(user).toEqual(expectedUser);
  });

  it("should have a username as argument", async () => {
    await fetchUser("toto");
    expect(httpGet).toHaveBeenCalledWith("https://api.github.com/users/toto");
  });
});
