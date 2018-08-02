import React, { Component } from "react";
import styles from "./MessageToUser.module.css";

const MessageToUser = ({ text, icon }) => (
  <div>
    <i className={icon}></i>
    <p>{text}</p>
  </div>
)

export default MessageToUser;
