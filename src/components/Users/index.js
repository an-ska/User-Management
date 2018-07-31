import React, { Component } from "react";
import styles from "./Users.module.css";
import User from "../User";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      hasError: false,
      isLoading: false
    }
  }
  componentDidMount() {
    this.getUsers(apiUrl);
  }

  getUsers = (apiUrl) => {
    this.setState({
      isLoading: true
    })

    fetch(apiUrl)
      .then(response => response.json())
      .then(users => users.map((user) => {
          this.setState({
            users: [
              ...this.state.users,
              {
                id: user.id,
                name: user.name,
                email: user.email
              }
            ]
          })
      }))
      .catch(() => {
        this.setState({
          hasError: true
        })
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { users } = this.state;

    return (
      <div className={styles.contentBox}>
        <ul className={styles.users}>
          <li className={styles.user}>
            <strong className={styles.id}>lp</strong>
            <strong className={styles.name}>user</strong>
            <strong className={styles.email}>e-mail</strong>
          </li>
          {
            users.map((user) => (
              <User
                key={user.id}
                userId={user.id}
                userName={user.name}
                userEmail={user.email}
             />
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Users;
