import { useState } from "react";

export const useModal = () => {
  const [modalStates, setModalStates] = useState<{
    UpdateStatusModal: boolean;
    DeleteRegistrationModal: boolean;
    RefreshRegistrationModal: boolean;
    NewRegistrationModal: boolean;
  }>({
    UpdateStatusModal: false,
    DeleteRegistrationModal: false,
    RefreshRegistrationModal: false,
    NewRegistrationModal: false,
  });

  const [modalMessage, setModalMessage] = useState("");

  const handleToggleModal = (
    modalType: string,
    isOpen: boolean,
    message: string
  ) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalType]: isOpen,
    }));
    if (isOpen) {
      setModalMessage(message);
    }
  };

  return {
    isOpenUpdateStatusModal: modalStates.UpdateStatusModal,
    isOpenDeleteRegistrationModal: modalStates.DeleteRegistrationModal,
    isOpenRefreshRegistrationModal: modalStates.RefreshRegistrationModal,
    isOpenNewRegistrationModal: modalStates.NewRegistrationModal,
    modalMessage,
    handleToggleModal,
  };
};
