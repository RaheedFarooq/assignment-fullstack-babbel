import { useEffect, useState } from "react";
import { IUserData, TOnboardingStep } from "../types";
import { DEFAULT_USER_DATA } from "../constants";


export const useUserData = () => {
  const [user, setUser] = useState<IUserData>(DEFAULT_USER_DATA);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("babbel__userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (newData: Partial<IUserData>) => {
    const updatedData = { ...user, ...newData };
    setUser(updatedData);
    sessionStorage.setItem("babbel__userData", JSON.stringify(updatedData));
  };

  const updateOnboardingStep = (step: TOnboardingStep) => {
    updateUser({ onboardingStep: step });
  };

  return { user, updateUser, updateOnboardingStep };
};
