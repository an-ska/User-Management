import React from "react";
import styles from "./User.module.css";

const User = ({ userId, userName, userEmail, handleClick, disableRemoveUserButton }) => (
  <li className={styles.user}>
    <span className={styles.id}><span className={styles.circle}>{userId}</span></span>
    <span className={styles.name}>{userName}</span>
    <span className={styles.email}>{userEmail}</span>
    <button
      className={styles.removeUserButton}
      onClick={handleClick}
      disabled={disableRemoveUserButton}
      >
        <i className={`${"fas fa-times"}`}></i>
    </button>
  </li>
)

export default User;
