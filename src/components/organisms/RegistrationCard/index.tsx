import { ButtonSmall } from "~/components/atoms/Buttons";
import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { RegistrationType } from "~/type/Registration";

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const {
    handleToggleModal,
    updateStatus,
    updateRegistrationPayload,
  } = useRegistrationContext();

  const handleModalUpdateStatus = (
    status: string,
    data: RegistrationType,
    message: string
  ) => {
    updateStatus(status);
    updateRegistrationPayload(data);
    handleToggleModal("UpdateStatusModal", true, message);
  };

  const handleModalDeleteRegistration= (data: RegistrationType, message: string) => {
    updateRegistrationPayload(data);
    handleToggleModal("DeleteRegistrationModal", true, message);
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === "REVIEW" && (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={() =>
                handleModalUpdateStatus(
                  "REPROVED",
                  props.data,
                  "Tem certeza que gostaria de reprovar este candidato?"
                )
              }
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() =>
                handleModalUpdateStatus(
                  "APPROVED",
                  props.data,
                  "Tem certeza que gostaria de aprovar este candidato?"
                )
              }
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {props.data.status !== "REVIEW" && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() =>
              handleModalUpdateStatus(
                "REVIEW",
                props.data,
                "Tem certeza que gostaria de revisar novamente este candidato?"
              )
            }
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash
          onClick={() =>
            handleModalDeleteRegistration(
              props.data,
              "Tem certeza que gostaria de deletar essa ordem?"
            )
          }
          data-testid="button-deletar"
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
