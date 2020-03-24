import { render, wait } from "@testing-library/react";
import { Language } from "../../../models/Language";
import LanguagesCharts from "./LanguagesCharts";

jest.mock("react-chartjs-2");

describe("LanguagesCharts", () => {
  it("should display a message if more than 6 languages", async () => {
    const languages: Map<Language, number> = new Map([
      [{ name: "Javascript", color: "" }, 100],
      [{ name: "Python", color: "" }, 200],
      [{ name: "Java", color: "" }, 300],
      [{ name: "PHP", color: "" }, 150],
      [{ name: "HTML", color: "" }, 99],
      [{ name: "CSS", color: "" }, 10],
      [{ name: "Typescript", color: "" }, 51]
    ]);
    const { findByText } = render(
      <LanguagesCharts languages={languages} repos={[]} />
    );

    expect(await findByText("(6 most used languages only)")).toBeTruthy();
  });

  it("should display a message if more than 6 repo languages", async () => {
    const languages: Map<Language, number> = new Map([]);
    const repos = [
      { primaryLanguage: { name: "java", color: "" } },
      { primaryLanguage: { name: "python", color: "" } },
      { primaryLanguage: { name: "javascript", color: "" } },
      { primaryLanguage: { name: "typescript", color: "" } },
      { primaryLanguage: { name: "css", color: "" } },
      { primaryLanguage: { name: "html", color: "" } },
      { primaryLanguage: { name: "shell", color: "" } }
    ];

    const { findByText } = render(
      // @ts-ignore
      <LanguagesCharts languages={languages} repos={repos} />
    );

    expect(await findByText("(6 most used languages only)")).toBeTruthy();
  });

  it("should not display a message if 6 languages or less", async () => {
    const languages: Map<Language, number> = new Map([]);
    const repos = [
      { primaryLanguage: { name: "java", color: "" } },
      { primaryLanguage: { name: "python", color: "" } },
      { primaryLanguage: { name: "javascript", color: "" } },
      { primaryLanguage: { name: "typescript", color: "" } },
      { primaryLanguage: { name: "css", color: "" } },
      { primaryLanguage: { name: "html", color: "" } }
    ];

    const { container } = render(
      // @ts-ignore
      <LanguagesCharts languages={languages} repos={repos} />
    );

    await wait(() => {
      expect(container.querySelector(".languages-subtitle")).toBeFalsy();
    });
  });
});
