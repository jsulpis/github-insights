import { render, wait } from "@testing-library/react";
import apiGet from "lib/apiGet";
import UserPage from "pages/[username]";
import React from "react";

jest.mock("lib/apiGet");
jest.mock("react-chartjs-2");

describe("User Page", () => {
  const USERNAME = "jsulpis";

  beforeEach(() => {
    (apiGet as jest.Mock).mockImplementation((path: string) => {
      if (path.includes("/")) {
        return Promise.resolve([]);
      } else if (path.includes("/" + USERNAME)) {
        return Promise.resolve({});
      } else {
        return Promise.reject();
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data using the API", () => {
    const mockRouter = { query: { username: USERNAME } };
    render(<UserPage router={mockRouter} />);

    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME);
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/repos-owned");
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/timeline");
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/contributions");
  });

  it("should display a spinner when loading", () => {
    let mockRouter = { query: {} };
    const { container, rerender } = render(<UserPage router={mockRouter} />);

    mockRouter = { query: { username: "wrong" } };
    rerender(<UserPage router={mockRouter} />);

    expect(container.querySelector(".spinner")).toBeTruthy();
  });

  it("should have a search input and redirect to the user page", async () => {
    // Given
    (apiGet as jest.Mock).mockImplementation((path: string) => {
      if (path.includes("/")) {
        return Promise.resolve([]);
      } else if (path.includes("/" + USERNAME)) {
        return Promise.resolve({});
      } else {
        return Promise.reject();
      }
    });

    const mockRouter = { query: { username: USERNAME }, push: jest.fn() };
    const { container } = render(<UserPage router={mockRouter} />);

    await wait(() => {
      const inputElement = container.querySelector("input");
      expect(inputElement).toBeTruthy();

      inputElement.value = "jsulpis";

      // When
      (container.querySelector(
        "button#search-button"
      ) as HTMLButtonElement).click();

      // Then
      expect(mockRouter.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
    });
  });
});
