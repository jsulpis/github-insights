import httpGet from "../../lib/httpGet";
import fetchUser from "../fetchUser";

jest.mock("lib/httpGet");

describe("User api", () => {
  it("should return a user", async () => {
    // Given
    (httpGet as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockUser.json"))
    );

    // When
    const user = await fetchUser();

    // Then
    const expectedUser = {
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
      organisationsUrl: "https://api.github.com/users/jsulpis/orgs",
      reposUrl: "https://api.github.com/users/jsulpis/repos",
      followers: 4,
      followersUrl: "https://api.github.com/users/jsulpis/followers",
      gists: 2,
      gistsUrl: "https://api.github.com/users/jsulpis/gists{/gist_id}"
    };
    expect(user).toEqual(expectedUser);
  });
});
