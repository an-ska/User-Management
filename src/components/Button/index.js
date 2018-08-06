import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, icon, handleClick, disableAddUserButton }) => (
  <button
    className={styles.button}
    onClick={handleClick}
    disabled={disableAddUserButton}
  >
    <i className={`${icon} ${styles.icon}`}></i>
    {text}
  </button>
)

export default Button;
