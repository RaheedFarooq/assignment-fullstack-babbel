import React from "react";
import styles from "./InputField.module.scss";
import classNames from "classnames";
interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxWidth?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  maxWidth = false,
  error,
}) => {
  return (
    <div
      className={classNames(styles.inputField, {
        [styles.maxWidth]: maxWidth,
      })}
    >
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default InputField;
