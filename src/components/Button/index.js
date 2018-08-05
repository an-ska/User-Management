import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, icon, handleClick, disable }) => (
  <button
    className={styles.button}
    onClick={handleClick}
    disabled={disable}
  >
    <i className={`${icon} ${styles.icon}`}></i>
    {text}
  </button>
)

export default Button;
