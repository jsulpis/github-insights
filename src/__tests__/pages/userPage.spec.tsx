import { render, waitFor } from "@testing-library/react";
import apiGet from "lib/apiGet";
import UserPage from "pages/[username]";

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

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/404");
    });
  });

  it("should have a search input and redirect to the user page", async () => {
    // Given
    const mockRouter = { query: { username: USERNAME }, push: jest.fn() };
    const { getByRole, findByRole } = render(<UserPage router={mockRouter} />);

    const inputElement = (await findByRole("textbox", {
      name: "GitHub username"
    })) as HTMLInputElement;
    expect(inputElement).toBeVisible();

    inputElement.value = "jsulpis";

    // When
    getByRole("button").click();

    // Then
    expect(mockRouter.push).toHaveBeenCalledWith("/[username]", "/jsulpis");
  });
});
