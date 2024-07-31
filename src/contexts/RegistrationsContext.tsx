import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import request from "~/api";
import { RegistrationType } from "~/type/Registration";
import { useModal } from "~/hooks/useModal";
import { useCardStatusChange } from "~/hooks/useCardStatusChange";
import { useRegistrationData } from "~/hooks/useRegistrationData";
import { toast } from "react-toastify";

interface RegistrationContextProps {
  children: ReactNode;
}

interface RegistrationContextType {
  isLoading: boolean;
  registrations: RegistrationType[];
  fetchRegistrations: () => Promise<void>;
  createRegistration: (newOrder: RegistrationType) => Promise<void>;
  updateStatusRegistration: (
    registration: RegistrationType,
    status: string
  ) => Promise<void>;
  getRegistrationByCpf: (cpf: string) => Promise<void>;
  deleteRegistration: (registration: RegistrationType) => Promise<void>;
  isOpenUpdateStatusModal: boolean;
  isOpenDeleteRegistrationModal: boolean;
  isOpenRefreshRegistrationModal: boolean;
  isOpenNewRegistrationModal: boolean;
  modalMessage: string;
  handleToggleModal: (
    modalType: string,
    isOpen: boolean,
    message: string
  ) => void;
  newStatus: string;
  updateStatus: (newStatusValue: string) => void;
  registrationPayload: RegistrationType | undefined;
  updateRegistrationPayload: (data: RegistrationType) => void;
}

export const RegistrationContext = createContext({} as RegistrationContextType);
export const useRegistrationContext = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }: RegistrationContextProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const {
    isOpenUpdateStatusModal,
    isOpenDeleteRegistrationModal,
    isOpenRefreshRegistrationModal,
    isOpenNewRegistrationModal,
    modalMessage,
    handleToggleModal,
  } = useModal();
  const { newStatus, updateStatus } = useCardStatusChange();
  const { registrationPayload, updateRegistrationPayload } =
    useRegistrationData();

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data } = await request.get(`/registrations`);
      setRegistrations(data);
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Erro ao carregar registros, por favor tente novamente!");
    }
  };

  const createRegistration = async (newOrder: RegistrationType) => {
    setIsLoading(true);
    const payload = {
      ...newOrder,
    };
    try {
      const response = await request.post("/registrations", payload);
      setRegistrations([...registrations, { ...response.data }]);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Erro ao realizar cadastro, por favor tente novamente!");
    }
  };

  const updateStatusRegistration = async (
    registration: RegistrationType,
    status: string
  ) => {
    const { id } = registration;
    setIsLoading(true);
    try {
      await request.put(`/registrations/${id}`, {
        ...registration,
        status: status,
      });
      toast.success("Status alterado com sucesso!");
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
      fetchRegistrations();
    } catch (error) {
      toast.error("Erro ao alterar status, por favor tente novamente!");
    }
  };

  const getRegistrationByCpf = async (cpf: string) => {
    setIsLoading(true);
    try {
      const { data } = await request.get(`registrations?cpf=${cpf}`);
      setRegistrations(data);
      toast.success("Busca realizada com sucesso!");
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Erro ao realizar busca, por favor tente mais tarde!");
    }
  };

  const deleteRegistration = async (registration: RegistrationType) => {
    const { id } = registration;
    setIsLoading(true);
    try {
      await request.delete(`/registrations/${id}`);
      toast.success("Exclusão realizada com sucesso!");
      fetchRegistrations();
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Erro ao realizar exclusão, por favor tente novamente!");
    }
  };

  const value = {
    isLoading,
    registrations,
    fetchRegistrations,
    createRegistration,
    updateStatusRegistration,
    getRegistrationByCpf,
    deleteRegistration,
    isOpenUpdateStatusModal,
    isOpenDeleteRegistrationModal,
    isOpenRefreshRegistrationModal,
    isOpenNewRegistrationModal,
    modalMessage,
    handleToggleModal,
    newStatus,
    updateStatus,
    registrationPayload,
    updateRegistrationPayload,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
