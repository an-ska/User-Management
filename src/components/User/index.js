import React, { Component, Fragment } from "react";
import styles from "./User.module.css";

const User = ({userId, userName, userEmail}) => (
  <li className={styles.user}>
    <span className={styles.id}>{userId}</span>
    <span className={styles.name}>{userName}</span>
    <span className={styles.email}>{userEmail}</span>
    <i className="fas fa-times"></i>
  </li>
)

export default User;
