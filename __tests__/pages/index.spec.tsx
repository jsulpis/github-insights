import {render} from "@testing-library/react";
import httpGet from "lib/httpGet";
import HomePage from "pages";
import React from "react";

jest.mock("lib/httpGet");

describe("With React Testing Library", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Shows "Welcome to Next!"', () => {
    (httpGet as jest.Mock).mockImplementation(() => Promise.resolve({}));

    const { container } = render(<HomePage date={""} />);
    expect(container).toBeTruthy();
  });
});
