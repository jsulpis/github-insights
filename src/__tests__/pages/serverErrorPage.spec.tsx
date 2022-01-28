import { render } from "@testing-library/react";
import Router from "next/router";
import ErrorPage from "pages/error";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: ""
  }),
  push: jest.fn()
}));

describe("Server Error Page", () => {
  it("should have an error message", async () => {
    const { getByText } = render(<ErrorPage />);
    const message = getByText("Server error. Please try again later.");
    expect(message).toBeVisible();
  });

  it("should have a search input and redirect to the user page", () => {
    // Given
    const { getByRole } = render(<ErrorPage />);
    const inputElement = getByRole("textbox", { name: "GitHub username" }) as HTMLInputElement;
    inputElement.value = "jsulpis";

    // When
    getByRole("button").click();

    // Then
    expect(Router.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
  });
});
