import React, { useCallback } from "react";
import styles from "./EmailSelection.module.scss";
import Button from "@/components/shared/Button";
import { useState } from "react";
import BoxSelect from "../shared/BoxSelect";

interface IEmailSelection {
  fullName: string;
  emailOptions: string[];
  onSubmit: ({ email, fullName }: {email: string; fullName: string }) => Promise<void>;
  onBack: () => void;
}

const EmailSelection: React.FC<IEmailSelection> = ({ fullName, emailOptions, onSubmit, onBack }) => {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const handleEmailSelection = useCallback(
    (email: string) => {
      if (email == selectedEmail) {
        setSelectedEmail(null);
      } else {
        setSelectedEmail(email);
      }
    },
    [selectedEmail]
  );

  const handleSubmit = useCallback(() => {
    if (selectedEmail) {
      onSubmit({ email: selectedEmail, fullName });
    }
  }, [fullName, selectedEmail, onSubmit]);

  return (
    <div className={styles.root}>
      <p>Hey there, <strong>{fullName}</strong>! </p>
      <div className={styles.emailSelect}>
      <p className={styles.subtext}>Please select your correct work-email from the options below!</p>
        {emailOptions.map((email: string) => (
          <BoxSelect
            key={email}
            text={email}
            onClick={() => handleEmailSelection(email)}
            selected={selectedEmail === email}
          />
        ))}
      </div>
      <Button
        text="Submit"
        title="By submitting this, you agree to Babbel storing your email address."
        onClick={handleSubmit}
        disabled={!selectedEmail}
      />
      <Button
        text="Go back"
        variant="text"
        onClick={onBack}
        disabled={!selectedEmail}
      />
    </div>
  );
};

export default EmailSelection;
