import React, {Component} from "react";
import PropTypes from "prop-types";

import FieldGroup from "../../FieldGroup";
import {LoadingButton} from "../../Buttons";
import "./styles.css";

class ModalUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      newPassword: "",
      currentPassword: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleUpdate({
      email: this.state.email,
      new_password: this.state.newPassword,
      current_password: this.state.currentPassword
    });
  };

  render() {
    const { loading } = this.props;

    return (
      <div id="update-form-container">
        <form id="userauth-update-form" onSubmit={this.handleSubmit}>
          <FieldGroup
            label="Email:"
            type="text"
            value={this.state.email}
            placeholder="email"
            name="email"
            onChange={this.handleChange}
            autoFocus
          />

          <FieldGroup
            label="New password:"
            type="password"
            value={this.state.newPassword}
            placeholder="new password"
            name="newPassword"
            onChange={this.handleChange}
          />

          <FieldGroup
            label="Current password:"
            type="password"
            value={this.state.currentPassword}
            placeholder="current password"
            name="currentPassword"
            onChange={this.handleChange}
            required
          />

          <LoadingButton
            loading={loading}
            children="Update profile"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

ModalUpdateForm.propTypes = {
  loading: PropTypes.bool
};

export default ModalUpdateForm;
