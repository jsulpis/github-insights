import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchUser from "lambdas/fetchUser";
import userApi from "pages/api/[username]";

jest.mock("lambdas/fetchUser");

describe("User api", () => {
  it("should return a user", async () => {
    // Given
    const MOCK_USER = {
      profileUrl: "https://api.github.com/users/jsulpis",
      username: "jsulpis",
      avatarUrl: "https://avatars2.githubusercontent.com/u/22420399?v=4",
      bio: "Full stack developer at @Zenika.\r\nPlaying with web technologies, computer graphics and electronics.",
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
    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve(MOCK_USER));

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await userApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchUser).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_USER);
  });

  it("should forward errors", async () => {
    (fetchUser as jest.Mock).mockImplementation(() =>
      Promise.reject({ status: 403, message: "Forbidden" })
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await userApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchUser).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual("Forbidden");
  });
});
