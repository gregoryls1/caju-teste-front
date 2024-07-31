import { renderHook, act } from "@testing-library/react-hooks";
import { useCardStatusChange } from "./useCardStatusChange";
import { useRegistrationData } from "./useRegistrationData";
import { useModal } from "./useModal";

import { RegistrationType } from "~/type/Registration";

describe("Hooks", () => {
  it("should update newStatus when updateStatus is called - useCardStatusChange", () => {
    const { result } = renderHook(() => useCardStatusChange());

    expect(result.current.newStatus).toBe("");

    const newStatusValue = "newStatus";
    act(() => {
      result.current.updateStatus(newStatusValue);
    });

    expect(result.current.newStatus).toBe(newStatusValue);
  });

  it("should initialize registrationPayload as null and update it correctly", () => {
    const { result } = renderHook(() => useRegistrationData());

    const newRegistrationData: RegistrationType = {
      employeeName: "Teste Nome",
      email: "test@test.com",
      admissionDate: "30/07/2024",
      status: "REVIEW",
      cpf: "102.111.000-10",
    };

    act(() => {
      result.current.updateRegistrationPayload(newRegistrationData);
    });

    expect(result.current.registrationPayload).toEqual(newRegistrationData);
  });

  it("should initialize modal states correctly", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpenUpdateStatusModal).toBe(false);
    expect(result.current.isOpenDeleteRegistrationModal).toBe(false);
    expect(result.current.isOpenRefreshRegistrationModal).toBe(false);
    expect(result.current.isOpenNewRegistrationModal).toBe(false);
    expect(result.current.modalMessage).toBe("");
  });

  it("should toggle modal state and update message", () => {
    const { result } = renderHook(() => useModal());

    const modalType = "UpdateStatusModal";
    const message = "Test Message";

    act(() => {
      result.current.handleToggleModal(modalType, true, message);
    });

    expect(result.current.isOpenUpdateStatusModal).toBe(true);
    expect(result.current.modalMessage).toBe(message);

    act(() => {
      result.current.handleToggleModal(modalType, false, "");
    });

    expect(result.current.isOpenUpdateStatusModal).toBe(false);
  });
});
