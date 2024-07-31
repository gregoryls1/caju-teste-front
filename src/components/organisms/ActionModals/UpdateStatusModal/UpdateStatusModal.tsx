import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import { ButtonSmall } from "~/components/atoms/Buttons";
import Modal from "~/components/organisms/Modal";

import * as S from "../styles";

type Props = {
  modalMessage: string;
};

const UpdateStatusModal = ({ modalMessage }: Props) => {
  const {
    isOpenUpdateStatusModal,
    handleToggleModal,
    updateStatusRegistration,
    newStatus,
    registrationPayload,
  } = useRegistrationContext();

  const handleCloseModal = () => {
    handleToggleModal("UpdateStatusModal", false, modalMessage);
  };

  const onConfirm = () => {
    if (!registrationPayload) return;
    updateStatusRegistration(registrationPayload, newStatus);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isOpenUpdateStatusModal}
      closeModal={handleCloseModal}
      modalMessage={modalMessage}
    >
      <S.Body>
        <p>{modalMessage}</p>
      </S.Body>
      <S.Footer>
        <ButtonSmall onClick={handleCloseModal}>Cancelar</ButtonSmall>
        <ButtonSmall bgcolor="#e80537" color="#fff" onClick={() => onConfirm()}>
          Confirmar
        </ButtonSmall>
      </S.Footer>
    </Modal>
  );
};

export default UpdateStatusModal;
