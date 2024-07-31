import { useState } from "react";
import { RegistrationType } from "~/type/Registration";

export const useRegistrationData = () => {
  const [registrationPayload, setRegistrationPayload] =
    useState<RegistrationType>();

  const updateRegistrationPayload = (newData: RegistrationType) => {
    setRegistrationPayload(newData);
  };

  return { registrationPayload, updateRegistrationPayload };
};
