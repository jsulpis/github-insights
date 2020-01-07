import { render, wait } from "@testing-library/react";
import { Languages } from "../../../infrastructure/fetchLanguages";
import LanguagesCharts from "../Languages/LanguagesCharts";

describe("LanguagesCharts", () => {
  it("should display a message if more than 6 languages", async () => {
    const languages: Languages = {
      Javascript: 100,
      Python: 200,
      Java: 300,
      PHP: 150,
      HTML: 99,
      CSS: 10,
      Typescript: 51
    };
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
    const languages: Languages = {
      Javascript: 100,
      Python: 200,
      Java: 300,
      HTML: 99,
      CSS: 10,
      Typescript: 51
    };
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
