import { render } from "@testing-library/react";
import { RepositoryOwned } from "models/Repository";
import { LanguagesCharts } from "./LanguagesCharts";

jest.mock("react-chartjs-2");

describe("LanguagesCharts", () => {
  it("should display a message if more than 6 languages", async () => {
    const repos = [
      makeRepoWithLanguage(["Python"]),
      makeRepoWithLanguage(["Javascript", "HTML", "CSS"]),
      makeRepoWithLanguage(["Java", "XML"]),
      makeRepoWithLanguage(["Typescript"])
    ];

    const { getByText } = render(<LanguagesCharts repos={repos} />);

    expect(getByText("(6 most used languages only)")).toBeVisible();
  });

  it("should not display a message if 6 languages or less", async () => {
    const repos = [makeRepoWithLanguage(["Python"]), makeRepoWithLanguage(["Typescript"])];

    const { queryByText } = render(<LanguagesCharts repos={repos} />);

    expect(queryByText("(6 most used languages only)")).not.toBeInTheDocument();
  });
});

const makeRepoWithLanguage = (languages: string[]): RepositoryOwned => ({
  name: "lang",
  starCount: 0,
  forkCount: 0,
  primaryLanguage: null,
  languages: languages.map((lang: string) => ({
    name: lang,
    color: "black",
    amountOfCodeInBytes: 12
  }))
});
