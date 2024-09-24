import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  text,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.button, className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
