import { render } from "@testing-library/react";
import Router from "next/router";
import HomePage from "pages/index";
import React from "react";

jest.mock("next/router");

describe("Home Page", () => {
  it("should have a search input and redirect to the user page", () => {
    // Given
    const { container } = render(<HomePage />);
    const inputElement = container.querySelector("input");
    inputElement.value = "jsulpis";

    // When
    container.querySelector("button").click();

    // Then
    expect(Router.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
  });
});
