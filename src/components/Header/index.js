import React, { Component } from "react";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";

const Header = () => (
  <header className={styles.header}>
    <img src={logo} alt="Logo of the company" className={styles.logo}/>
    <a href="https://unamo.com/" className={styles.link}>www.unamo.com</a>
  </header>
)

export default Header;
