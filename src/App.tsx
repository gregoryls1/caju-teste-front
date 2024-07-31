import Router from "~/router";
import { Header } from "./components/organisms/Header";
import RegistrationProvider from "./contexts/RegistrationsContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" hideProgressBar={false} autoClose={2000} />
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <RegistrationProvider>
        <Router />
      </RegistrationProvider>
    </>
  );
}

export default App;
