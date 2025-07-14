import React from "react";
import classNames from "classnames";

import s from "./Button.module.scss";
const Button = ({ type, text, onClick, customClass }) => {
  return (
    <button
      className={classNames(s.btn, customClass, {
        [s.primaryBtn]: type === "primary",
        [s.secondaryBtn]: type === "secondary",
      })}
      onClick={onClick}
    >
      <p className={s.btnText}>{text}</p>
    </button>
  );
};

export default Button;
