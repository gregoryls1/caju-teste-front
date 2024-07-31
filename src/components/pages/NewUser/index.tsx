import TextField from "~/components/atoms/TextField";
import Button from "~/components/atoms/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/atoms/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import { StatusType } from "~/type/Status";
import { RegistrationType } from "~/type/Registration";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatDate, maskCpf, normalizeCpf } from "~/utils";
import { NewRegistrationModal } from "~/components/organisms/ActionModals";
import * as Yup from "yup";

import * as S from "./styles";

const initialValues = {
  admissionDate: "",
  cpf: "",
  email: "",
  employeeName: "",
  status: StatusType.REVIEW,
} as RegistrationType;

const schema = Yup.object().shape({
  employeeName: Yup.string()
    .required("Nome e sobrenome separados por espaço são obrigatórios.")
    .test(
      "minLength",
      "Nome e sobrenome devem ter no mínimo 3 caracteres.",
      (value) => {
        if (!value) return true;
        const names = value.split(" ");
        return names.every((name) => name.length >= 3);
      }
    )
    .test("multipleSurnames", "É obrigatório nome e sobrenome.", (value) => {
      if (!value) return true;
      const names = value.split(" ");
      return names.length >= 2;
    }),
  email: Yup.string()
    .email("Por favor, insira um email válido no formato nome@dominio.com")
    .required("O campo de email é obrigatório"),
  cpf: Yup.string()
    .required("O CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .transform((value) => maskCpf(value)),
  admissionDate: Yup.string().required("A data de admissão é obrigatória"),
});

const NewUserPage = () => {
  const { updateRegistrationPayload, handleToggleModal, modalMessage } =
    useRegistrationContext();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<RegistrationType> = async (formData) => {
    const payload = {
      ...formData,
      cpf: normalizeCpf(formData.cpf),
      admissionDate: formatDate(formData.admissionDate),
    };
    updateRegistrationPayload(payload);
    handleToggleModal(
      "NewRegistrationModal",
      true,
      "Deseja confirmar o cadastro?"
    );
  };

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Nome"
            label="Nome"
            {...register("employeeName")}
            error={errors.employeeName?.message}
          />
          <TextField
            placeholder="Email"
            label="Email"
            type="text"
            {...register("email")}
            error={errors.email?.message}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field }) => (
              <TextField
                placeholder="CPF"
                label="CPF"
                type="text"
                {...field}
                value={maskCpf(field.value)}
                error={errors.cpf?.message}
                maxLength={14}
              />
            )}
          />
          <TextField
            label="Data de admissão"
            type="date"
            {...register("admissionDate")}
            error={errors.admissionDate?.message}
          />
          <Button>Cadastrar</Button>
        </S.Form>
      </S.Card>
      <NewRegistrationModal modalMessage={modalMessage} />
    </S.Container>
  );
};

export default NewUserPage;
