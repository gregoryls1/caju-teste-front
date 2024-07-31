import { useState } from "react";

export const useCardStatusChange = () => {
  const [newStatus, setNewStatus] = useState("");

  const updateStatus = (newStatusValue: string) => {
    setNewStatus(newStatusValue);
  };

  return { newStatus, updateStatus };
};
