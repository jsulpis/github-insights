import { render, wait } from "@testing-library/react";
import { RepositoryOwned } from "models/Repository";
import LanguagesCharts from "./LanguagesCharts";

jest.mock("react-chartjs-2");

describe("LanguagesCharts", () => {
  it("should display a message if more than 6 languages", async () => {
    const repos = [
      makeRepoWithLanguage(["Python"]),
      makeRepoWithLanguage(["Javascript", "HTML", "CSS"]),
      makeRepoWithLanguage(["Java", "XML"]),
      makeRepoWithLanguage(["Typescript"])
    ];

    const { findByText } = render(<LanguagesCharts repos={repos} />);

    expect(await findByText("(6 most used languages only)")).toBeTruthy();
  });

  it("should not display a message if 6 languages or less", async () => {
    const repos = [
      makeRepoWithLanguage(["Python"]),
      makeRepoWithLanguage(["Typescript"])
    ];

    const { container } = render(<LanguagesCharts repos={repos} />);

    await wait(() => {
      expect(container.querySelector(".languages-subtitle")).toBeFalsy();
    });
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
