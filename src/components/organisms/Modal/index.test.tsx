import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./index"; // ajuste o caminho conforme necessário

describe("Modal Component", () => {
  const closeModal = jest.fn(); 

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should render the modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} closeModal={closeModal}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should not render the modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} closeModal={closeModal}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).toBeNull();
  });

  it("should call closeModal when the close button is clicked", () => {
    render(
      <Modal isOpen={true} closeModal={closeModal}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText("×"));

    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
