import { render, waitFor } from "@testing-library/react";
import { UserProfile } from "components/main/UserProfile/UserProfile";
import { RepositoryOwned } from "models/Repository";
import User from "models/User";

jest.mock("lambdas/fetchUser");

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

  const MOCK_REPOS: RepositoryOwned[] = [
    {
      name: "android-modules",
      forkCount: 3,
      starCount: 1,
      primaryLanguage: { name: "Java", color: "#b07219" },
      languages: [
        {
          name: "Java",
          color: "#b07219",
          amountOfCodeInBytes: 100
        }
      ]
    },
    {
      name: "blender-addons",
      forkCount: 1,
      starCount: 2,
      primaryLanguage: { name: "Python", color: "#3572A5" },
      languages: [
        {
          name: "Python",
          color: "#3572A5",
          amountOfCodeInBytes: 250
        }
      ]
    },
    {
      name: "blender-addons",
      forkCount: 1,
      starCount: 2,
      primaryLanguage: { name: "Python", color: "#3572A5" },
      languages: [
        {
          name: "Python",
          color: "#3572A5",
          amountOfCodeInBytes: 250
        }
      ]
    }
  ];

  it("shows information about the user", async () => {
    const { getByLabelText, getByRole } = render(
      <UserProfile user={MOCK_USER} repos={MOCK_REPOS} />
    );

    expect(getByLabelText("full name").textContent).toBe(MOCK_USER.name);
    expect(getByRole("link", { name: "github profile" }).textContent).toBe(
      "@" + MOCK_USER.username
    );
    expect(getByRole("link", { name: "github profile" }).getAttribute("href")).toBe(
      MOCK_USER.profileUrl
    );
    expect(getByLabelText("company").textContent).toBe(MOCK_USER.company);
    expect(getByLabelText("location").textContent).toBe(MOCK_USER.location);
    expect(getByRole("link", { name: "website" }).textContent).toBe(MOCK_USER.website);
    expect(getByRole("link", { name: "website" }).getAttribute("href")).toBe(
      "https://" + MOCK_USER.website
    );
    expect(getByRole("img", { name: "profile picture" }).getAttribute("src")).toBe(
      MOCK_USER.avatarUrl
    );
    expect(getByLabelText("description").textContent).toBe(MOCK_USER.bio);
    expect(getByLabelText("Followers").textContent).toBe(`${MOCK_USER.followers}`);
  });

  it("shows information about the repos", async () => {
    const { getByLabelText } = render(<UserProfile user={MOCK_USER} repos={MOCK_REPOS} />);

    expect(getByLabelText("Public Repos").textContent).toBe(`${MOCK_USER.repos}`);
    expect(getByLabelText("Total Stars").textContent).toBe("5");
    expect(getByLabelText("Total Forks").textContent).toBe("5");
    expect(getByLabelText("Main languages").textContent).toBe("2");
  });
});
