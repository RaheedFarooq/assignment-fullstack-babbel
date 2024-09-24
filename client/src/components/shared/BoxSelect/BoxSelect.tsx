import React from "react";
import classNames from "classnames";
import styles from "./BoxSelect.module.scss";

interface BoxSelectProps {
  onClick: () => void;
  text: string;
  className?: string;
  selected: boolean;
}

const Button: React.FC<BoxSelectProps> = ({
  className,
  onClick,
  text,
  selected = false,
  ...props
}) => {
  return (
    <div
      className={classNames(styles.boxSelect, {
        [styles.selected]: selected,
      } , className)}
      onClick={onClick}
      {...props}
    >
      {text}
    </div>
  );
};

export default Button;
