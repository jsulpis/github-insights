import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should display credits", async () => {
    const { findByText } = render(<Footer />);

    const codeAuthor = await findByText(/Julien Sulpis/);
    expect(codeAuthor).toBeTruthy();

    const themeName = await findByText(/Paper Dashboard React/);
    expect(themeName).toBeTruthy();

    const templateAuthor = await findByText(/Creative Tim/);
    expect(templateAuthor).toBeTruthy();
  });
});
