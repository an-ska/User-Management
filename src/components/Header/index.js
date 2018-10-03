import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";

const Header = () => (
  <header className={styles.header}>
    <img
      src={logo}
      alt="Logo of the company"
      className={styles.logo}/>
    <a
      href=""
      className={styles.link}
    >www.company.com</a>
  </header>
)

export default Header;
