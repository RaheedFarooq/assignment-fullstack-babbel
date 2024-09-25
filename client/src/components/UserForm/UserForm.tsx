import React from "react";
import styles from "./UserForm.module.scss";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import { useState } from "react";

interface IUserForm {
  onSubmit: ({ firstName, lastName, domain }: {
    firstName: string;
    lastName: string;
    domain: string;
  }) => Promise<void>;
}

const UserForm: React.FC<IUserForm> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [domain, setDomain] = useState("");

  const [domainError, setDomainError] = useState("");

  const validateDomain = (value: string) => {
    const domainPattern =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!value) {
      setDomainError("");
    } else if (!domainPattern.test(value)) {
      setDomainError("Invalid domain format. Example: company.com");
    } else {
      setDomainError("");
    }
    setDomain(value.toLowerCase());
  };

  const handleSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      domain: domain.toLowerCase(),
    };

    onSubmit(userData);
  };

  return (
    <div className={styles.root}>
      <p>Please enter your details below to continue</p>
      <div className={styles.form}>
        <InputField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={setFirstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={setLastName}
        />
        <InputField
          maxWidth
          label="Company Domain"
          placeholder="Enter your Company Domain ( e.g babbel.com )"
          type="text"
          name="domain"
          value={domain}
          onChange={validateDomain}
          error={domainError}
        />
      </div>
      <Button
        text="Next"
        onClick={handleSubmit}
        disabled={!(firstName && lastName && domain) || domainError}
      />
    </div>
  );
};

export default UserForm;
