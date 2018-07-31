import React, { Component } from "react";
import styles from "./UserManagementApp.module.css";
import Header from "../../components/Header";

class UserManagementApp extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
      </div>
    )
  }
}

export default UserManagementApp;
