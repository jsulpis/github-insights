import { render } from "@testing-library/react";
import HomePage from "pages";

const mockRouterPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {},
    push: mockRouterPush
  })
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
    expect(mockRouterPush).toHaveBeenCalledWith("/jsulpis");
  });
});
