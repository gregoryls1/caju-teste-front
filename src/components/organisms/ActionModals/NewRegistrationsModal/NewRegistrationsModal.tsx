import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { ButtonSmall } from "~/components/atoms/Buttons";
import Modal from "~/components/organisms/Modal";

import * as S from "../styles";

type Props = {
  modalMessage: string;
};

const NewRegistrationModal = ({ modalMessage }: Props) => {
  const {
    isOpenNewRegistrationModal,
    handleToggleModal,
    registrationPayload,
    createRegistration,
  } = useRegistrationContext();

  const handleCloseModal = () => {
    handleToggleModal("NewRegistrationModal", false, modalMessage);
  };

  const onConfirm = () => {
    if (!registrationPayload) return;
    createRegistration(registrationPayload);
    handleCloseModal();
    goToHome();
  };

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <Modal
      isOpen={isOpenNewRegistrationModal}
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

export default NewRegistrationModal;
