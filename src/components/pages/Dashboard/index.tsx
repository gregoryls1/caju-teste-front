import { useRegistrationContext } from "~/contexts/RegistrationsContext";
import Collumns from "~/components/organisms/Columns";
import { SearchBar } from "~/components/organisms/Searchbar";
import {
  UpdateStatusModal,
  DeleteRegistrationModal,
  RefreshRegistrationModal,
} from "~/components/organisms/ActionModals";
import Loading from "react-loading";

import * as S from "./styles";

const DashboardPage = () => {
  const { registrations, modalMessage, isLoading } = useRegistrationContext();

  return (
    <>
      <S.Container>
        <SearchBar />
        {isLoading ? (
          <S.ContainerLoading>
            <Loading
              type="spinningBubbles"
              color="#e80537"
              height={64}
              width={64}
            />
          </S.ContainerLoading>
        ) : (
          <>
            <Collumns registrations={registrations} />
          </>
        )}
      </S.Container>
      <UpdateStatusModal modalMessage={modalMessage} />
      <DeleteRegistrationModal modalMessage={modalMessage} />
      <RefreshRegistrationModal modalMessage={modalMessage} />
    </>
  );
};
export default DashboardPage;
