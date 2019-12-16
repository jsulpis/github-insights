import { render } from "@testing-library/react";
import fetchRepos from "infrastructure/fetchRepos";
import fetchUser from "infrastructure/fetchUser";
import User from "models/User";
import HomePage from "pages";
import React from "react";

jest.mock("lib/httpGet");
jest.mock("infrastructure/fetchUser");
jest.mock("infrastructure/fetchRepos");

describe("Home Page", () => {
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

  const mockFetchUser = jest.fn(() => Promise.resolve(USER));
  const mockFetchRepos = jest.fn(() => Promise.resolve(MOCK_REPOS));

  beforeEach(() => {
    (fetchUser as jest.Mock).mockImplementation(mockFetchUser);
    (fetchRepos as jest.Mock).mockImplementation(mockFetchRepos);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should query for a user", () => {
    const { container } = render(<HomePage date={""} />);
    expect(container).toBeTruthy();

    expect(mockFetchUser).toHaveBeenCalledWith("jsulpis");
  });

  it("should query for the user repos", () => {
    const { container } = render(<HomePage date={""} />);
    expect(container).toBeTruthy();

    expect(mockFetchRepos).toHaveBeenCalledWith("jsulpis");
  });
});
