import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import { ButtonSmall } from "~/components/atoms/Buttons";
import Modal from "~/components/organisms/Modal";
import { toast } from "react-toastify";

import * as S from "../styles";

type Props = {
  modalMessage: string;
};

const RefreshRegistrationModal = ({ modalMessage }: Props) => {
  const {
    isOpenRefreshRegistrationModal,
    handleToggleModal,
    fetchRegistrations,
  } = useRegistrationContext();

  const handleCloseModal = () => {
    handleToggleModal("RefreshRegistrationModal", false, modalMessage);
  };

  const onConfirm = () => {
    fetchRegistrations();
    handleCloseModal();
    toast.success("Atualização realizada com sucesso!")
  };

  return (
    <Modal
      isOpen={isOpenRefreshRegistrationModal}
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

export default RefreshRegistrationModal;
