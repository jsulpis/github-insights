import { render, wait } from "@testing-library/react";
import { Language } from "../../../models/Language";
import LanguagesCharts from "../Languages/LanguagesCharts";

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
    const { container } = render(
      <LanguagesCharts languages={languages} repos={[]} />
    );

    await wait(() => {
      expect(container.querySelector("h5").textContent).toBe(
        "6 most used languages, by amount of code"
      );
    });
  });

  it("should display a generic message if 6 languages or less", async () => {
    const languages: Map<Language, number> = new Map([
      [{ name: "Javascript", color: "" }, 100],
      [{ name: "Python", color: "" }, 200],
      [{ name: "Java", color: "" }, 300],
      [{ name: "HTML", color: "" }, 99],
      [{ name: "CSS", color: "" }, 10],
      [{ name: "Typescript", color: "" }, 51]
    ]);
    const { container } = render(
      <LanguagesCharts languages={languages} repos={[]} />
    );

    await wait(() => {
      expect(container.querySelector("h5").textContent).toBe(
        "By amount of code"
      );
    });
  });
});
