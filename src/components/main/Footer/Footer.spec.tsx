import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should display credits", async () => {
    const { getByRole } = render(<Footer />);

    const codeAuthor = getByRole("link", { name: "Julien Sulpis" });
    expect(codeAuthor).toBeVisible();

    const themeName = getByRole("link", { name: "Paper Dashboard React" });
    expect(themeName).toBeVisible();

    const templateAuthor = getByRole("link", { name: "Creative Tim" });
    expect(templateAuthor).toBeVisible();
  });
});
