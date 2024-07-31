// Importações necessárias
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./index";
import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("~/contexts/RegistrationsContext", () => ({
  useRegistrationContext: jest.fn(),
}));

const mockGetRegistrationByCpf = jest.fn();
const mockFetchRegistrations = jest.fn();
const mockHandleToggleModal = jest.fn();

beforeEach(() => {
  (useRegistrationContext as jest.Mock).mockReturnValue({
    getRegistrationByCpf: mockGetRegistrationByCpf,
    fetchRegistrations: mockFetchRegistrations,
    handleToggleModal: mockHandleToggleModal,
  });
});

describe("SearchBar", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
  });

  it("should render the search bar with placeholder text", () => {
    const input = screen.getByPlaceholderText("Digite um CPF válido");
    expect(input).toBeInTheDocument();
  });

  it("should render the button", () => {
    const button = screen.getByText("Nova Admissão");
    expect(button).toBeInTheDocument();
  });

  it("should call getRegistrationByCpf when a valid CPF is entered", () => {
    const validCpf = "12345678900";
    const input = screen.getByPlaceholderText("Digite um CPF válido");

    fireEvent.change(input, { target: { value: validCpf } });

    expect(mockGetRegistrationByCpf).toHaveBeenCalledWith(validCpf);
  });

  it("should call fetchRegistrations when the input is cleared", () => {
    const input = screen.getByPlaceholderText("Digite um CPF válido");

    fireEvent.change(input, { target: { value: "12345678900" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(mockFetchRegistrations).toHaveBeenCalled();
  });

  it("should call handleToggleModal when the refresh icon is clicked", () => {
    const refreshButton = screen.getByLabelText("refetch");

    fireEvent.click(refreshButton);

    expect(mockHandleToggleModal).toHaveBeenCalledWith(
      "RefreshRegistrationModal",
      true,
      "Você deseja atualizar a listagem?"
    );
  });

  it("should navigate to the new admission page when button is clicked", () => {
    const button = screen.getByText("Nova Admissão");

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
