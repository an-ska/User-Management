import React, { Component } from "react";
import styles from "./UserManagementApp.module.css";
import Header from "../../components/Header";
import Users from "../../components/Users";

const UserManagementApp = () => (
  <div className={styles.container}>
    <Header />
    <Users />
  </div>
)

export default UserManagementApp;
