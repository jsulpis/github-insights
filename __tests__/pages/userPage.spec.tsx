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
      if (path.includes("/" + USERNAME + "/timeline")) {
        return Promise.resolve({
          totalContributions: 0,
          contributionsPerMonth: []
        });
      } else if (path.includes("/" + USERNAME + "/")) {
        return Promise.resolve([]);
      } else if (path.includes("/" + USERNAME)) {
        return Promise.resolve({});
      } else {
        return Promise.reject({
          status: 404
        });
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
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/repos-contributed");
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/timeline");
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/contributions");
  });

  it("should redirect to the 404 page if user not found", async () => {
    const mockRouter = { query: { username: "hyrtgerf" }, push: jest.fn() };
    render(<UserPage router={mockRouter} />);

    await wait(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/404");
    });
  });

  it("should have a search input and redirect to the user page", async () => {
    // Given
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
