import React, { useState } from "react";
import styles from "./Onboarding.module.scss";
import UserForm from "@/components/UserForm";
import { getUserEmail } from "@/api";
import { ONBOARDING_STEP } from "../../constants";
import { IGetUserEmailResponse, TOnboardingStep, UserData } from "../../types";
import EmailSelection from "../../components/EmailSelection";
import { saveUserEmail } from "../../api";

const DEFAULT_USER_DATA = {
  firstName: "",
  lastName: "",
  fullName: "",
  email: [],
  domain: "",
};

const Onboarding: React.FC = () => {
  const [onboardingStep, setOnboardingStep] = useState<TOnboardingStep>(
    ONBOARDING_STEP.USER_FORM
  );

  const [user, setUser] = useState<UserData>(DEFAULT_USER_DATA);

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

      setOnboardingStep(
        isNew ? ONBOARDING_STEP.EMAIL_SELECT : ONBOARDING_STEP.SUCCESS
      );
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error getting user email");
    }
  };

  const handleUserEmailCreate = async ({
    email,
    fullName,
  }: {
    email: string;
    fullName: string;
  }) => {
    try {
      await saveUserEmail({ email, fullName });
      setOnboardingStep(ONBOARDING_STEP.SUCCESS);
    } catch (err) {
      console.error(err);
      alert(`Error saving user email: ${err}`);
    }
  };

  const onReset = () => {
    setOnboardingStep(ONBOARDING_STEP.USER_FORM);
    setUser(DEFAULT_USER_DATA);
  };

  const RenderOnboardingStep = () => {
    switch (onboardingStep) {
      case ONBOARDING_STEP.USER_FORM:
        return <UserForm onSubmit={handleUserDataSubmit} />;

      case ONBOARDING_STEP.EMAIL_SELECT:
        return (
          <EmailSelection
            fullName={user.fullName}
            emailOptions={user.email}
            onSubmit={handleUserEmailCreate}
            onBack={onReset}
          />
        );
      case ONBOARDING_STEP.SUCCESS:
        return <div> Success </div>;
      default:
        return <UserForm onSubmit={handleUserDataSubmit} />;
    }
  };

  return (
    <div className={styles.root}>
      <h1>
        Welcome to <i>Babbel</i>
      </h1>
      <RenderOnboardingStep />
    </div>
  );
};

export default Onboarding;
