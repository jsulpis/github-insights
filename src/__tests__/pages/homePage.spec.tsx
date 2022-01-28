import { render } from "@testing-library/react";
import Router from "next/router";
import HomePage from "pages";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: ""
  }),
  push: jest.fn()
}));

describe("Home Page", () => {
  it("should have a search input and redirect to the user page", () => {
    // Given
    const { getByRole } = render(<HomePage />);
    const inputElement = getByRole("textbox", { name: "GitHub username" }) as HTMLInputElement;
    inputElement.value = "jsulpis";

    // When
    getByRole("button").click();

    // Then
    expect(Router.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
  });
});
