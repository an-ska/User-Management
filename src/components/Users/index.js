import React, { Component, Fragment } from "react";
import styles from "./Users.module.css";
import User from "../User";
import AddUserForm from "../AddUserForm";
import MessageToUser from "../MessageToUser";
import Button from "../Button";

const apiUrl = "https://jsonplaceholder.typicode.com/users";
const maximalUsersNumber = 10;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      firstAvailableId: 11,
      hasError: false,
      isLoading: false,
      ascendingSort: true,
      isFormShown: false,
      isSuccessMessageShown: false,
    }
  }

  componentDidMount() {
    this.getUsers(apiUrl);
  }

  getUsers = (apiUrl) => {
    this.setState({
      isLoading: true,
    })

    fetch(apiUrl)
      .then(response => response.json())
      .then(users => users.map((user) => (
        {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      )))
      .then(users => this.setState({
        users,
      }))
      .catch(() => {
        this.setState({
          hasError: true,
        })
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  addUser = (inputName, inputEmail) => {
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.firstAvailableId,
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
        ],
        firstAvailableId: this.state.firstAvailableId + 1,
        isSuccessMessageShown: true,
      })
    )
    .catch(() => {
      this.setState({
        hasError: true,
      })
    })
    .finally(() => {
      this.setState({
        isLoading: false,
        isFormShown: false,
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
    this.setState({
      users: updatedUserList,
      isSuccessMessageShown: false
    })
  }

  sortBy = (key) => {
    this.setState({
      users: this.state.users.sort((a, b) => (
        this.state.ascendingSort
        ?
          (a[key]).toString().localeCompare(b[key], undefined, {numeric: true})
        :
          (b[key]).toString().localeCompare(a[key], undefined, {numeric: true})
      )),
      ascendingSort: !this.state.ascendingSort
    })
  }

  showForm = () => {
    this.setState({
      isFormShown: true,
      isSuccessMessageShown: false
    })
  }

  render() {
    const { users, isFormShown, isSuccessMessageShown } = this.state;

    return (
      <div className={styles.contentBox}>
        <header className={styles.formHeader}>
          {
            !isFormShown
              ?
                <Button
                  handleClick={() => this.showForm()}
                  text="Add user"
                  icon={"fas fa-plus-circle fa-lg"}
                  disable={users.length < maximalUsersNumber ? false : true}
                />
              :
                <AddUserForm
                  addUser={this.addUser}
                  inputNameId="inputName"
                  inputEmailId="inputEmail"
                />
          }
          {
            isSuccessMessageShown &&
              <MessageToUser
                text="You have successfully added a new user."
                icon={"fas fa-check-circle fa-lg success"}
              />
          }
          {
            !isFormShown && users.length >= maximalUsersNumber &&
              <MessageToUser
                text="You can't add new user because of a limit."
                icon={"fas fa-info-circle fa-lg error"}
              />
          }
        </header>
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
            users.length === 0 &&
              <MessageToUser
                text="No users to show."
                icon={"fas fa-info-circle fa-lg information"}
              />
          }
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
