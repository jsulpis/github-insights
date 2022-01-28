import { render } from "@testing-library/react";
import Router from "next/router";
import NotFoundPage from "pages/404";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: ""
  }),
  push: jest.fn()
}));

describe("404 Page", () => {
  it("should have an error message", async () => {
    const { getByText } = render(<NotFoundPage />);
    const message = getByText("This user does not appear to exist !");
    expect(message).toBeVisible();
  });

  it("should have a search input and redirect to the user page", () => {
    // Given
    const { getByRole } = render(<NotFoundPage />);
    const inputElement = getByRole("textbox", { name: "GitHub username" }) as HTMLInputElement;
    inputElement.value = "jsulpis";

    // When
    getByRole("button").click();

    // Then
    expect(Router.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
  });
});
