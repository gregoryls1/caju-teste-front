import { render, screen } from "@testing-library/react";
import { Header } from "./index";

describe("Header", () => {
  it("when it renders the header with correct styles", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");

    expect(headerElement).toHaveStyle({
      width: "100%",
      height: "64px",
      position: "fixed",
      top: "0",
      display: "flex",
      alignItems: "center",
      padding: "0px 24px",
    });
  });
});
