import { render, wait } from "@testing-library/react";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";

describe("SearchForm", () => {
  it("allows to search and submit a username", async () => {
    const callback = jest.fn();

    const { container } = render(<SearchForm searchUser={callback} />);

    await wait(() => {
      expect(
        container.querySelector("#username-input").attributes.getNamedItem("placeholder")
          .value
      ).toBe("Enter a GitHub username");

      container.querySelector<HTMLInputElement>("#username-input").value =
        "some username";

      container.querySelector("button").click();

      expect(callback).toHaveBeenCalledWith("some username");
    });
  });
});
