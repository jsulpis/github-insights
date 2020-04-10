import { render } from "@testing-library/react";
import Router from "next/router";
import ErrorPage from "pages/error";
import React from "react";

jest.mock("next/router");

describe("Server Error Page", () => {
  it("should have an error message", async () => {
    const { findByText } = render(<ErrorPage />);
    const message = await findByText("Server error. Please try again later.");
    expect(message).toBeTruthy();
  });

  it("should have a search input and redirect to the user page", () => {
    // Given
    const { container } = render(<ErrorPage />);
    const inputElement = container.querySelector("input");
    inputElement.value = "jsulpis";

    // When
    container.querySelector("button").click();

    // Then
    expect(Router.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
  });
});
