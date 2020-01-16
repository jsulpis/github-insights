import { render } from "@testing-library/react";
import apiGet from "lib/apiGet";
import UserPage from "pages/[username]";
import React from "react";

jest.mock("lib/apiGet");

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
    let mockRouter = { query: {} };
    const { rerender } = render(<UserPage router={mockRouter} />);

    mockRouter = { query: { username: USERNAME } };
    rerender(<UserPage router={mockRouter} />);

    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME);
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/repos");
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/timeline");
    expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/languages");
  });

  it("should display a spinner when loading", () => {
    let mockRouter = { query: {} };
    const { container, rerender } = render(<UserPage router={mockRouter} />);

    mockRouter = { query: { username: "wrong" } };
    rerender(<UserPage router={mockRouter} />);

    expect(container.querySelector(".sk-chase")).toBeTruthy();
  });
});
