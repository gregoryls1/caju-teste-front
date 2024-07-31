import { ReactNode } from "react";
import * as S from "./styles";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const Modal = ({
  isOpen,
  closeModal,
  children,
}: Props) => {
  if (!isOpen) return null;
  return (
    <S.BackDrop>
      <S.Container>
        <S.Header>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </S.Header>
        {children}
      </S.Container>
    </S.BackDrop>
  );
};

export default Modal;
