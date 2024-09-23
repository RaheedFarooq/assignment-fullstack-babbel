import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  text,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.button, className)}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
