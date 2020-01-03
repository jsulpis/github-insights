import { render } from "@testing-library/react";
import User from "models/User";
import UserPage from "pages/[username]";
import React from "react";
import apiGet from "../../lib/apiGet";

jest.mock("lib/apiGet");

describe("User Page", () => {
  const USER: User = {
    profileUrl: "https://api.github.com/users/jsulpis",
    username: "jsulpis",
    avatarUrl: "https://avatars2.githubusercontent.com/u/22420399?v=4",
    bio: "Full stack developer at @Zenika.",
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

  const MOCK_REPOS = [
    {
      archived: false,
      creationDate: "2018-06-01T15:10:08Z",
      description: "A set of common Android components.",
      forked: false,
      forks: 0,
      language: "Java",
      license: "MIT",
      name: "android-modules",
      size: 279,
      stars: 0,
      updateDate: "2018-10-25T12:18:19Z",
      url: "https://github.com/jsulpis/android-modules"
    }
  ];

  beforeEach(() => {
    (apiGet as jest.Mock).mockImplementation((path: string) => {
      if (path.includes("/")) {
        return Promise.resolve(MOCK_REPOS);
      } else if (path.includes("/" + USER.username)) {
        return Promise.resolve(USER);
      } else {
        return Promise.reject();
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data using the API", () => {
    const username = USER.username;
    let mockRouter = { query: {} };
    const { rerender } = render(<UserPage router={mockRouter} />);

    mockRouter = { query: { username } };
    rerender(<UserPage router={mockRouter} />);

    expect(apiGet).toHaveBeenCalledWith("/" + username);
    expect(apiGet).toHaveBeenCalledWith("/" + username + "/repos");
  });

  it("should display a spinner when loading", () => {
    let mockRouter = { query: {} };
    const { container, rerender } = render(<UserPage router={mockRouter} />);

    mockRouter = { query: { username: "wrong" } };
    rerender(<UserPage router={mockRouter} />);

    expect(container.querySelector(".sk-chase")).toBeTruthy();
  });
});
