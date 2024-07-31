import { render, screen } from "@testing-library/react";
import TextField from "./index";

describe("TextField", () => {
  it("renders with label", () => {
    render(<TextField label="Label Test" />);

    const labelElement = screen.getByTestId("labelTest");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders with error message", () => {
    render(<TextField label="My Label" error="This is an error" />);

    const errorElement = screen.getByText("This is an error");
    expect(errorElement).toBeInTheDocument();
  });
});
