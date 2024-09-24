import React, { useState } from "react";
import styles from "./Onboarding.module.scss";
import UserForm from "@/components/UserForm";
import { getUserEmail } from "@/api";
import { ONBOARDING_STEP } from "@/constants";
import { IGetUserEmailResponse, TOnboardingStep, UserData } from "../../types";

const Onboarding: React.FC = () => {
  const [onboardingStep, setOnboardingStep] = useState<TOnboardingStep>(
    ONBOARDING_STEP.USER_FORM
  );

  const [user, setUser] = useState<UserData | null>({
    firstName: "",
    lastName: "",
    fullName: "",
    email: [],
    domain: "",
  });

  const handleUserDataSubmit = async ({
    firstName,
    lastName,
    domain,
  }: {
    firstName: string;
    lastName: string;
    domain: string;
  }) => {
    try {
      const { fullName, email, isNew }: IGetUserEmailResponse =
        await getUserEmail({ firstName, lastName, domain });

      setUser({
        ...user,
        firstName,
        lastName,
        fullName,
        email,
        domain,
      });

      setOnboardingStep(isNew ? "emailSelection" : "Success");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error getting user email");
    }
  };

  const RenderOnboardingStep = () => {
    switch (onboardingStep) {
      case "userForm":
        return <UserForm onSubmit={handleUserDataSubmit} />;
      case "emailSelection":
        return <div>email Selection</div>;
      case "Success":
        return <div> Success </div>;
      default:
        return <UserForm onSubmit={handleUserDataSubmit} />;
    }
  };

  return (
    <div className={styles.root}>
      <RenderOnboardingStep />
    </div>
  );
};

export default Onboarding;
