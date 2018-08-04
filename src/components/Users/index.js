import React, { Component } from "react";
import styles from "./Users.module.css";
import User from "../User";
import AddUserForm from "../AddUserForm";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      firstAvailableId: "",
      hasError: false,
      isLoading: false,
      ascendingSort: true
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
      .then(users => users.map((user) => (
        {
          id: user.id,
          name: user.name,
          email: user.email
        }
      )))
      .then(users => this.setState({
        users,
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

  addUser = (inputName, inputEmail) => {
    this.setState({
      firstAvailableId: this.state.users[this.state.users.length-1].id
    }, () => {
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          id: this.state.firstAvailableId+1,
          name: inputName,
          email: inputEmail
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(newUser =>
        this.setState({
          users: [
            ...this.state.users,
            {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
            }
          ]
        })
      )
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
    })
  }

  removeUser = (userId) => {
    const updatedUserList = this.state.users.filter(user => user.id !== userId)

    fetch(apiUrl + "/" + userId, {
      method: "DELETE"
    })
    .then((response) => {
      if(response.status === 200) {
        this.setState({
          users: updatedUserList
        })
      }
    })
    .catch(() => {
      this.setState({
        hasError: true
      })
    })
  }

  sortBy = (key) => {
    this.setState({
      users: this.state.users.sort((a, b) => (
        this.state.ascendingSort
        ? a[key] > b[key]
        : a[key] < b[key]
      )),
      ascendingSort: !this.state.ascendingSort
    })
  }

  render() {
    const { users } = this.state;

    return (
      <div className={styles.contentBox}>
        <AddUserForm
          addUser={this.addUser}
          inputNameId="inputName"
          inputEmailId="inputEmail"
        />
        <ul className={styles.users}>
          <li className={styles.user}>
            <strong
              className={styles.id}
              onClick={() => this.sortBy("id")}>lp</strong>
            <strong
              className={styles.name}
              onClick={() => this.sortBy("name")}>user</strong>
            <strong
              className={styles.email}
              onClick={() => this.sortBy("email")}>e-mail</strong>
          </li>
          {
            users.map((user) => (
              <User
                key={user.id}
                userId={user.id}
                userName={user.name}
                userEmail={user.email}
                handleClick={() => this.removeUser(user.id)}
             />
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Users;
