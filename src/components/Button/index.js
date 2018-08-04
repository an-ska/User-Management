import React, { Component } from "react";
import styles from "./Button.module.css";


const Button = ({ text, icon, handleClick}) => (
  <button
    className={styles.button}
    onClick={handleClick}
  >
    <i className={`${icon} ${styles.icon}`}></i>
    {text}
  </button>
)

export default Button;
