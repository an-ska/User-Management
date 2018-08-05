import React from "react";
import styles from "./User.module.css";

const User = ({userId, userName, userEmail, handleClick}) => (
  <li className={styles.user}>
    <span className={styles.id}><span className={styles.circle}>{userId}</span></span>
    <span className={styles.name}>{userName}</span>
    <span className={styles.email}>{userEmail}</span>
    <i
      className={`${"fas fa-times"} ${styles.removeIcon}`}
      onClick={handleClick}
    ></i>
  </li>
)

export default User;
