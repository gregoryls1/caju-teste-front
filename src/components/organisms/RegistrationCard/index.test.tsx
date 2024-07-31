import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationCard from "./index";
import { registrationsMock } from "~/mocks/registrations";
import { useRegistrationContext } from "~/contexts/RegistrationsContext";

jest.mock("~/contexts/RegistrationsContext", () => ({
  useRegistrationContext: jest.fn(),
}));

const mockUpdateStatus = jest.fn();
const mockUpdateRegistrationPayload = jest.fn();
const mockHandleToggleModal = jest.fn();

beforeEach(() => {
  (useRegistrationContext as jest.Mock).mockReturnValue({
    handleToggleModal: mockHandleToggleModal,
    updateStatus: mockUpdateStatus,
    updateRegistrationPayload: mockUpdateRegistrationPayload,
  });
});

describe("RegistrationCard", () => {
  it("should render the card with employee information", () => {
    const data = registrationsMock[0];

    render(<RegistrationCard data={data} />);

    const employeeName = screen.getByText(data.employeeName);
    const email = screen.getByText(data.email);
    const admissionDate = screen.getByText(data.admissionDate);

    expect(employeeName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(admissionDate).toBeInTheDocument();
  });

  it("should render the correct buttons based on status", () => {
    const dataWithReviewStatus = { ...registrationsMock[0], status: "REVIEW" };

    render(<RegistrationCard data={dataWithReviewStatus} />);

    const approveButton = screen.getByRole("button", { name: /Aprovar/i });
    const reproveButton = screen.getByRole("button", { name: /Reprovar/i });
    const deleteButton = screen.getByTestId("button-deletar");

    expect(approveButton).toBeInTheDocument();
    expect(reproveButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("should call handleToggleModal when approve button is clicked", () => {
    const dataWithReviewStatus = { ...registrationsMock[0], status: "REVIEW" };

    render(<RegistrationCard data={dataWithReviewStatus} />);

    const approveButton = screen.getByRole("button", { name: /Aprovar/i });
    fireEvent.click(approveButton);

    expect(mockUpdateStatus).toHaveBeenCalledWith("APPROVED");
    expect(mockUpdateRegistrationPayload).toHaveBeenCalledWith(
      dataWithReviewStatus
    );
    expect(mockHandleToggleModal).toHaveBeenCalledWith(
      "UpdateStatusModal",
      true,
      "Tem certeza que gostaria de aprovar este candidato?"
    );
  });

  it("should call handleToggleModal when reprove button is clicked", () => {
    const dataWithReviewStatus = { ...registrationsMock[0], status: "REVIEW" };

    render(<RegistrationCard data={dataWithReviewStatus} />);

    const reproveButton = screen.getByRole("button", { name: /Reprovar/i });
    fireEvent.click(reproveButton);

    expect(mockUpdateStatus).toHaveBeenCalledWith("REPROVED");
    expect(mockUpdateRegistrationPayload).toHaveBeenCalledWith(
      dataWithReviewStatus
    );
    expect(mockHandleToggleModal).toHaveBeenCalledWith(
      "UpdateStatusModal",
      true,
      "Tem certeza que gostaria de reprovar este candidato?"
    );
  });

  it("should call handleToggleModal when delete button is clicked", () => {
    const dataWithStatus = { ...registrationsMock[0], status: "APPROVED" };

    render(<RegistrationCard data={dataWithStatus} />);

    const deleteButton = screen.getByTestId("button-deletar");
    fireEvent.click(deleteButton);

    expect(mockUpdateRegistrationPayload).toHaveBeenCalledWith(dataWithStatus);
    expect(mockHandleToggleModal).toHaveBeenCalledWith(
      "DeleteRegistrationModal",
      true,
      "Tem certeza que gostaria de deletar essa ordem?"
    );
  });

  it("should render the correct button when status is not REVIEW", () => {
    const dataWithApprovedStatus = {
      ...registrationsMock[0],
      status: "APPROVED",
    };

    render(<RegistrationCard data={dataWithApprovedStatus} />);

    const reReviewButton = screen.getByRole("button", {
      name: /Revisar novamente/i,
    });
    expect(reReviewButton).toBeInTheDocument();
  });
});
