import React from "react";
import styles from "./Onboarding.module.scss";
import UserForm from "@/components/UserForm";
import { getUserEmail } from "@/api";
import { DEFAULT_USER_DATA, ONBOARDING_STEP } from "../../constants";
import { IGetUserEmailResponse } from "../../types";
import EmailSelection from "../../components/EmailSelection";
import { saveUserEmail } from "../../api";
import OnboardingSuccess from "../../components/OnboardingSuccess";
import { useUserData } from "../../hooks/useUserData";

const Onboarding: React.FC = () => {
  const { user, updateUser, updateOnboardingStep } = useUserData();

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

      updateUser({
        ...user,
        firstName,
        lastName,
        fullName,
        email,
        domain,
        onboardingStep: isNew
          ? ONBOARDING_STEP.EMAIL_SELECT
          : ONBOARDING_STEP.SUCCESS,
      });
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
      updateOnboardingStep(ONBOARDING_STEP.SUCCESS);
    } catch (err) {
      console.error(err);
      alert(`Error saving user email: ${err}`);
    }
  };

  const onReset = () => {
    updateUser(DEFAULT_USER_DATA);
  };

  const RenderOnboardingStep = () => {
    switch (user.onboardingStep) {
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
        return (
          <OnboardingSuccess
            onReset={onReset}
            fullName={user.fullName}
            email={user.email[0]}
            domain={user.domain}
          />
        );
      default:
        return <UserForm onSubmit={handleUserDataSubmit} />;
    }
  };

  return (
    <div className={styles.root}>
      <h1>
        <i>+Babbel</i>
      </h1>
      <RenderOnboardingStep />
    </div>
  );
};

export default Onboarding;
