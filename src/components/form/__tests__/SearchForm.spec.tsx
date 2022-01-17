import { render } from "@testing-library/react";
import { SearchForm } from "../SearchForm/SearchForm";

describe("SearchForm", () => {
  it("allows to search and submit a username", async () => {
    const callback = jest.fn();

    const { getByRole } = render(<SearchForm searchUser={callback} />);
    const inputElement = getByRole("textbox", { name: "GitHub username" }) as HTMLInputElement;

    expect(inputElement.getAttribute("placeholder")).toBe("Enter a GitHub username");

    inputElement.value = "some username";
    getByRole("button").click();

    expect(callback).toHaveBeenCalledWith("some username");
  });
});
