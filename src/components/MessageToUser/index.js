import React, { Component } from "react";
import styles from "./MessageToUser.module.css";

const MessageToUser = ({ text, icon }) => (
  <div className={styles.message}>
    <i className={`${icon} ${styles.icon}`}></i>
    <strong>{text}</strong>
  </div>
)

export default MessageToUser;
