import React, { Component, Fragment } from "react";
import styles from "./Users.module.css";
import User from "../User";
import AddUserForm from "../AddUserForm";
import MessageToUser from "../MessageToUser";
import Button from "../Button";
import loader from "../../images/loader_accent_color.png";

const apiUrl = "https://jsonplaceholder.typicode.com/users";
const maximalUsersNumber = 10;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      doesEmailAlreadyExist: false,
      alreadyExistingEmail: "",
      firstAvailableId: 11,
      hasError: false,
      isLoadingInitialUsers: true,
      isLoadingNewUser: false,
      isAscendingSort: true,
      isFormShown: false,
      isSuccessMessageShown: false,
      disableRemoveUserButton: false
    }
  }

  componentDidMount() {
    this.getUsers(apiUrl);
  }

  handleErrors = (response) => {
    if (!response.ok) {
      this.setState({
        hasError: true
      })
    }
    return response;
  }

  getUsers = (apiUrl) => {
    fetch(apiUrl)
      .then(response => this.handleErrors(response))
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
      .catch((e) => {
        this.setState({
          hasError: true
        })
      })
      .finally(() => {
        this.setState({
          isLoadingInitialUsers: false
        })
      })
  }

  addUser = (inputName, inputEmail) => {
    if (this.emailAlreadyExists(inputEmail)) {
      this.setState({
        doesEmailAlreadyExist: true,
        alreadyExistingEmail: inputEmail
      })

      return;
    };

    this.setState({
      isLoadingNewUser: true
    })

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
    .then(response => this.handleErrors(response))
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
        doesEmailAlreadyExist: false,
        isSuccessMessageShown: true
      })
    )
    .catch((e) => {
      this.setState({
        hasError: true
      })
    })
    .finally(() => {
      this.setState({
        isLoadingNewUser: false,
        isFormShown: false
      })
    })
  }

  emailAlreadyExists = (inputEmail) => {
    return this.state.users.find(
      user => user.email.toLowerCase() === inputEmail.toLowerCase()
    ) !== undefined;
  }

  removeUser = (userId) => {
    const updatedUsers = this.state.users.filter(user => user.id !== userId);

    this.setState({
      disableRemoveUserButton: true
    })

    fetch(apiUrl + "/" + userId, {
      method: "DELETE"
    })
    /* For non-faked API call, response status code should be checked to update
     the user list only if the API call succeeded. Here, when adding
     new users they are not actually added in the backend, therefore this call
     would return for them 404 status code. That is why the following check is
     commented out.
    */
    //.then(response => this.handleErrors(response))
    .then((response) => {
      this.setState({
        users: updatedUsers,
        isSuccessMessageShown: false,
      })
    })
    .catch((e) => {
      this.setState({
        hasError: true,
      })
    })
    .finally(() => {
      this.setState({
        disableRemoveUserButton: false
      })
    })
  }

  sortBy = (key) => {
    this.setState({
      users: this.state.users.sort((a, b) => (
        this.state.isAscendingSort
        ?
          (a[key]).toString().localeCompare(b[key], undefined, {numeric: true})
        :
          (b[key]).toString().localeCompare(a[key], undefined, {numeric: true})
      )),
      isAscendingSort: !this.state.isAscendingSort
    })
  }

  showForm = () => {
    this.setState({
      isFormShown: true,
      isSuccessMessageShown: false
    })
  }

  render() {
    const { users, isLoadingInitialUsers, isLoadingNewUser, hasError, isFormShown, doesEmailAlreadyExist, alreadyExistingEmail, isSuccessMessageShown, disableRemoveUserButton } = this.state;

    return (
      <Fragment>
        {
          hasError &&
            <MessageToUser
              text="Something went wrong."
              icon={"fas fa-exclamation-circle fa-lg error"}
            />
        }
        {
          isLoadingInitialUsers
          ?
            <img alt="" src={loader} className={styles.loader} />
          :
            <div className={styles.contentBox}>
              <header className={styles.formHeader}>
                {
                  !isFormShown
                    ?
                      <Button
                        handleClick={() => this.showForm()}
                        text="Add user"
                        icon={"fas fa-user-plus"}
                        disableAddUserButton={users.length < maximalUsersNumber ? false : true}
                      />
                    :
                      <AddUserForm
                        addUser={this.addUser}
                        inputNameId="inputName"
                        inputEmailId="inputEmail"
                        text="Submit"
                        isLoadingNewUser={isLoadingNewUser}
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
                {
                  doesEmailAlreadyExist &&
                    <MessageToUser
                      text={`${"E-mail: "}` + alreadyExistingEmail + `${" already exists."}`}
                      icon={"fas fa-exclamation-circle fa-lg error"}
                    />
                }
              </header>
              <ul className={styles.users}>
                <li className={styles.user}>
                  <strong
                    className={styles.id}
                    onClick={() => this.sortBy("id")}>
                    lp <i className={`${"fas fa-sort"} ${styles.sort}`}></i>
                  </strong>
                  <strong
                    className={styles.name}
                    onClick={() => this.sortBy("name")}>
                    user <i className={`${"fas fa-sort"} ${styles.sort}`}></i>
                  </strong>
                  <strong
                    className={styles.email}
                    onClick={() => this.sortBy("email")}>
                    e-mail <i className={`${"fas fa-sort"} ${styles.sort}`}></i>
                  </strong>
                </li>
                {
                  users.length === 0 &&
                    <MessageToUser
                      text="No users to show."
                      icon={"fas fa-info-circle fa-lg information"}
                    />
                }
                {
                  disableRemoveUserButton &&
                  <img alt="" src={loader} className={`${styles.loader} ${styles.removeUserLoader}`}/>
                }
                {
                  users.map((user) => (
                    <User
                      key={user.id}
                      userId={user.id}
                      userName={user.name}
                      userEmail={user.email}
                      handleClick={() => this.removeUser(user.id)}
                      disableRemoveUserButton={disableRemoveUserButton}
                   />
                  ))
                }
              </ul>
            </div>
        }
      </Fragment>
    )
  }
}

export default Users;
