import React, { Component, Fragment } from "react";
import styles from "./AddUserForm.module.css";
import MessageToUser from "../MessageToUser";

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      inputName: "",
      inputEmail: "",
      inputHasError: false
    })
  }

  handleInputChange = e => {
    this.setState({
      [`${e.target.id}`]: e.target.value
    });
  }

  handleClick = e => {
    const {inputName, inputEmail} = this.state;

    if (this.invalidInputValues(inputName, inputEmail)) {
      return;
    } else {
      this.props.addUser(inputName, inputEmail)
    }

    this.setState({
      inputName: "",
      inputEmail: ""
    })
  }

  handleKeyPress = e => {
    const {inputName, inputEmail} = this.state;
    if (e.key !== "Enter") {
      return;
    }
    this.handleClick();
  }

  invalidInputValues = (inputName, inputEmail) => {
    if ((inputName.match(/^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/) && inputName.length <= 20) && inputEmail.match((/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i))) {
      this.setState({
        inputHasError: false
      })
      return false;
    } else {
      this.setState({
        inputHasError: true
      })
      return true;
    }
  }

  render() {
    const { inputName, inputEmail, inputHasError } = this.state;
    const { handleClick, inputNameId, inputEmailId } = this.props;

    return (
      <Fragment>
        <form className={styles.form}>
          <input
            id={inputNameId}
            className={styles.input}
            type="text"
            value={inputName}
            placeholder="Name..."
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            autoFocus
          />
          <input
            id={inputEmailId}
            className={styles.input}
            type="text"
            value={inputEmail}
            placeholder="E-mail..."
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <button
            className={styles.button}
            type="button"
            onClick={this.handleClick}
            >Submit</button>
        </form>
        {
          inputHasError &&
          <MessageToUser
            text={"Please fill in all the fields and make sure they are correct. Note! Name can contain only letters and no more than 20 signs."}
            icon="fas fa-exclamation-circle fa-lg error"
          />
        }
      </Fragment>

    )
  }
}

export default AddUserForm;
