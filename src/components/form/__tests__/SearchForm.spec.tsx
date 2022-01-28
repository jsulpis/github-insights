import { render } from "@testing-library/react";
import { SearchForm } from "../SearchForm/SearchForm";

const mockRouterPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { username: "jsulpis" },
    push: mockRouterPush
  })
}));

describe("SearchForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should have a search input for the username and redirect to the user page", async () => {
    const { getByRole } = render(<SearchForm />);
    const inputElement = getByRole("textbox", { name: "GitHub username" }) as HTMLInputElement;

    expect(inputElement.getAttribute("placeholder")).toBe("Enter a GitHub username");

    inputElement.value = "some username";
    getByRole("button").click();

    expect(mockRouterPush).toHaveBeenCalledWith("/some username");
  });

  it("should have a callback to do something before redirecting", async () => {
    const callback = jest.fn();
    const { getByRole } = render(<SearchForm onBeforeRedirect={callback} />);
    const inputElement = getByRole("textbox", { name: "GitHub username" }) as HTMLInputElement;

    inputElement.value = "some username";
    getByRole("button").click();

    expect(callback).toHaveBeenCalledWith("some username");
  });

  it("should do nothing if the submitted username is the same as the one on the current page", () => {
    const callback = jest.fn();
    const { getByRole } = render(<SearchForm onBeforeRedirect={callback} />);
    const inputElement = getByRole("textbox", { name: "GitHub username" }) as HTMLInputElement;

    inputElement.value = "jsulpis";
    getByRole("button").click();

    expect(callback).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
