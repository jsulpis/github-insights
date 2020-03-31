import { render } from "@testing-library/react";
import Router from "next/router";
import NotFoundPage from "pages/404";
import React from "react";

jest.mock("next/router");

describe("Error Page", () => {
  it("should have an error message", async () => {
    const { findByText } = render(<NotFoundPage />);
    const message = await findByText("This user does not appear to exist !");
    expect(message).toBeTruthy();
  });

  it("should have a search input and redirect to the user page", () => {
    // Given
    const { container } = render(<NotFoundPage />);
    const inputElement = container.querySelector("input");
    inputElement.value = "jsulpis";

    // When
    container.querySelector("button").click();

    // Then
    expect(Router.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
  });
});
