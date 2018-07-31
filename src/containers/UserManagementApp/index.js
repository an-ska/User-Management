import React, { Component } from "react";
import styles from "./UserManagementApp.module.css";
import Header from "../../components/Header";
import Users from "../../components/Users";

class UserManagementApp extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <Users />
      </div>
    )
  }
}

export default UserManagementApp;
