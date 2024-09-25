import React from "react";
import styles from "./OnboardingSuccess.module.scss";
import Button from "@/components/shared/Button";

interface IOnboardingSuccess {
  fullName: string;
  email: string;
  domain: string;
  onReset: () => void;
}

const OnboardingSuccess: React.FC<IOnboardingSuccess> = ({
  fullName,
  email,
  domain,
  onReset,
}) => {
  return (
    <div className={styles.root}>
      <p>
        Thank you for signing up with us, <strong>{fullName}</strong>!{" "}
      </p>
      <div className={styles.contactSummary}>
        <h3 className={styles.subtext}>Here's a summary of your details!</h3>
        <p>
          Full Name: <b>{fullName}</b>{" "}
        </p>
        <p>
          Email: <b>{email}</b>
        </p>
        <p>
          Company Domain: <b>{domain}</b>
        </p>
      </div>
      <Button
        text="Check out our website"
        onClick={() => {
          window.open("https://www.babbel.com", "_blank");
        }}
      />
      <Button
        text="Start Over"
        variant="text"
        title="By submitting this, you agree to Babbel storing your email address."
        onClick={onReset}
      />
    </div>
  );
};

export default OnboardingSuccess;
