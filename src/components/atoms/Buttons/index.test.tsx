import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
  it("when rendering with custom text and styles", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Ativar</Button>);

    const buttonElement = screen.getByRole("button", { name: "Ativar" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Ativar");
    expect(buttonElement).toHaveStyle({
      backgroundColor: "#64a98c",
      color: "#fff",
      padding: "8px 32px",
      borderRadius: "36px",
    });
  });

  it("when clicked it calls the handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Ativar</Button>);

    const buttonElement = screen.getByRole("button", { name: "Ativar" });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
