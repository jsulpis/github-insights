import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("should render with custom CSS class", () => {
    const { container } = render(<Spinner className="custom-class"></Spinner>);

    expect(container.firstElementChild.classList.contains("custom-class")).toBe(true);
  });
});
