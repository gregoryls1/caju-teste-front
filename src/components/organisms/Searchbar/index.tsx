import { useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import Button from "~/components/atoms/Buttons";
import { IconButton } from "~/components/atoms/Buttons/IconButton";
import TextField from "~/components/atoms/TextField";
import routes from "~/router/routes";
import { maskCpf, normalizeCpf } from "~/utils";
import * as S from "./styles";

export const SearchBar = () => {
  const history = useHistory();
  const { getRegistrationByCpf, fetchRegistrations, handleToggleModal } = useRegistrationContext();
  const [cpf, setCpf] = useState("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const searchRegistration = (value: string) => {
    setCpf(value);

    if (value.length === 11) {
      const santizedCpf = normalizeCpf(value);
      getRegistrationByCpf(santizedCpf);
    } else if (!value) {
      fetchRegistrations();
    }
  };


  const handleModalRefreshRegistrion = (message: string) => {
    handleToggleModal("RefreshRegistrationModal", true, message);
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        value={maskCpf(cpf)}
        onChange={(e) => searchRegistration(e.target.value)}
      />
      <S.Actions>
        <IconButton
          aria-label="refetch"
          onClick={() =>
            handleModalRefreshRegistrion("Você deseja atualizar a listagem?")
          }
        >
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
