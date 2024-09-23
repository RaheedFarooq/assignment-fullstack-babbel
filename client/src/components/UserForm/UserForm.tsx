import React from "react";
import styles from "./UserForm.module.scss";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import { useState } from "react";

const UserForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [domain, setDomain] = useState("");

  const [domainError, setDomainError] = useState("");

  const validateDomain = (value: string) => {
    const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!value) {
      setDomainError("");
    } else if (!domainPattern.test(value)) {
      setDomainError("Invalid domain format. Example: company.com");
    } else {
      setDomainError("");
    }
    setDomain(value);
  };

  return (
    <div className={styles.root}>
      <h1>
        Welcome to <i>Babbel</i>
      </h1>
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
          placeholder="Enter your Company Domain"
          type="text"
          name="domain"
          value={domain}
          onChange={validateDomain}
          error={domainError}
        />
      </div>
      <Button text="Next" onClick={() => {}} />
    </div>
  );
};

export default UserForm;
