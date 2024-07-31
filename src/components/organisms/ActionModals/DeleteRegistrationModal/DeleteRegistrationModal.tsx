import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import { ButtonSmall } from "~/components/atoms/Buttons";
import Modal from "~/components/organisms/Modal";

import * as S from "../styles";

type Props = {
  modalMessage: string;
};

const DeleteRegistrationModal = ({ modalMessage }: Props) => {
  const {
    isOpenDeleteRegistrationModal,
    handleToggleModal,
    deleteRegistration,
    registrationPayload,
  } = useRegistrationContext();

  const handleCloseModal = () => {
    handleToggleModal("DeleteRegistrationModal", false, modalMessage);
  };

  const onConfirm = () => {
    if (!registrationPayload) return;
    deleteRegistration(registrationPayload);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isOpenDeleteRegistrationModal}
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

export default DeleteRegistrationModal;
