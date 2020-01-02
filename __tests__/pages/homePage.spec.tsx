import { render } from "@testing-library/react";
import HomePage from "pages/[username]";
import React from "react";

describe("Home Page", () => {
  it("should contain the search input", () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector("input")).toBeTruthy();
  });
});
