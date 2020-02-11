import { render, wait } from "@testing-library/react";
import UserProfile from "components/main/UserProfile/UserProfile";
import Repository from "models/Repository";
import User from "models/User";
import React from "react";

jest.mock("infrastructure/fetchUser");

describe("UserProfile", () => {
  const MOCK_USER: User = {
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
    gistsUrl: "https://api.github.com/users/jsulpis/gists{/gist_id}",
    repos: 15
  };

  const MOCK_REPOS: Repository[] = [
    {
      name: "android-modules",
      description: "A set of common Android components.",
      url: "https://github.com/jsulpis/android-modules",
      isForked: false,
      isArchived: false,
      creationDate: new Date("2018-06-01T15:10:08Z"),
      updateDate: new Date("2018-10-25T12:18:19Z"),
      diskUsage: 279,
      forkCount: 3,
      starCount: 1,
      primaryLanguage: { name: "Java", color: "#b07219" },
      license: "MIT"
    },
    {
      name: "blender-addons",
      description: "My repository of add-ons for Blender.",
      url: "https://github.com/jsulpis/blender-addons",
      isForked: false,
      isArchived: false,
      creationDate: new Date("2018-01-25T21:00:53Z"),
      updateDate: new Date("2019-06-10T15:26:14Z"),
      diskUsage: 1076,
      forkCount: 1,
      starCount: 2,
      primaryLanguage: { name: "Python", color: "#3572A5" },
      license: "GPL-3.0"
    },
    {
      name: "blender-addons",
      description: "My repository of add-ons for Blender.",
      url: "https://github.com/jsulpis/blender-addons",
      isForked: false,
      isArchived: false,
      creationDate: new Date("2018-01-25T21:00:53Z"),
      updateDate: new Date("2019-06-10T15:26:14Z"),
      diskUsage: 1076,
      forkCount: 1,
      starCount: 2,
      primaryLanguage: { name: "Python", color: "#3572A5" },
      license: "GPL-3.0"
    }
  ];

  it("shows information about the user", async () => {
    const { container } = render(
      <UserProfile user={MOCK_USER} repos={MOCK_REPOS} />
    );

    await wait(() => {
      expect(getContentByClass(container, ".fullname")).toBe(MOCK_USER.name);
      expect(getContentByClass(container, ".username")).toBe(
        "@" + MOCK_USER.username
      );
      expect(getAttributeValueByClass(container, ".username", "href")).toBe(
        MOCK_USER.profileUrl
      );
      expect(getContentByClass(container, ".description")).toBe(MOCK_USER.bio);
      expect(getAttributeValueByClass(container, ".avatar", "src")).toBe(
        MOCK_USER.avatarUrl
      );
      expect(getContentByClass(container, ".location")).toBe(
        MOCK_USER.location
      );
      expect(getContentByClass(container, ".company")).toBe(MOCK_USER.company);
      expect(getContentByClass(container, ".website")).toBe(MOCK_USER.website);
      expect(getAttributeValueByClass(container, ".website", "href")).toBe(
        "https://" + MOCK_USER.website
      );
      expect(getContentByClass(container, ".followers")).toBe(
        `${MOCK_USER.followers}`
      );
      expect(container.querySelector(".message-many-repos")).not.toBeTruthy();
    });
  });

  it("displays a message when there are to many repos", async () => {
    const userWithManyRepos = Object.assign({}, MOCK_USER);
    userWithManyRepos.repos = 300;
    const { container } = render(
      <UserProfile user={userWithManyRepos} repos={MOCK_REPOS} />
    );

    await wait(() => {
      expect(container.querySelector(".message-many-repos")).toBeTruthy();
    });
  });

  it("shows information about the repos", async () => {
    const { container } = render(
      <UserProfile user={MOCK_USER} repos={MOCK_REPOS} />
    );

    await wait(() => {
      expect(getContentByClass(container, ".repos")).toBe(`${MOCK_USER.repos}`);
      expect(getContentByClass(container, ".stars")).toBe(`5`);
      expect(getContentByClass(container, ".forks")).toBe(`5`);
      expect(getContentByClass(container, ".languages")).toBe(`2`);
    });
  });

  const getContentByClass = (container, className) =>
    container.querySelector(className).textContent;
  const getAttributeValueByClass = (container, className, attribute) =>
    container.querySelector(className).attributes.getNamedItem(attribute).value;
});
