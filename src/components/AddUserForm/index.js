import React, { Component } from "react";
import styles from "./AddUserForm.module.css";

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      inputName: "",
      inputEmail: ""
    })
  }

  handleInputChange = e => {
    this.setState({
      inputName: e.target.value
    });
  }

  handleClick = e => {
    if (this.state.inputName.length > 0) {
      this.props.addUser(this.state.inputName)
    }

    this.setState({
      inputName: ""
    })
  }

  handleKeyPress = e => {
    if (e.key !== "Enter" || this.state.inputName === 0) {
      return;
    }

    this.setState({
      inputName: e.target.value
    });

    this.props.addUser(this.state.inputName);

    this.setState({
      inputName: ""
    })
    e.preventDefault();
  }

  render() {
    const { inputName, inputEmail } = this.state;
    const { handleClick } = this.props;

    return (
      <form>
        <input
          type="text"
          value={inputName}
          placeholder="Name..."
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}></input>
        <input
          type="text"
          value={inputEmail}
          placeholder="E-mail..."></input>
        <button
          type="button"
          onClick={this.handleClick}
          >Submit</button>
      </form>
    )
  }
}

export default AddUserForm;
