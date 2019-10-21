import React from "react";
import { API_BASE_URL } from "../config";

export default class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: ""
    };
  }
  onSubmit(e) {
    e.preventDefault();
    fetch(`${API_BASE_URL}/adminPanel`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: this.state.formData })
    }).then(res => {
      if (res.statusText === "OK") {
        this.props.toggleAdmin();
      }
    });
  }

  handlePassChange(e) {
    this.setState({
      formData: e.target.value
    });
  }

  render() {
    return (
      <div
        onClick={e => {
          e.stopPropagation();
          this.props.toggleModal();
        }}
        className="adminLogin"
      >
        <form
          onClick={e => {
            e.stopPropagation();
          }}
          onSubmit={e => {
            this.onSubmit(e);
          }}
          className="adminLogin__form"
        >
          <h2 className="adminLogin__heading">Admin Login</h2>
          <input
            onChange={e => this.handlePassChange(e)}
            className="adminLogin__code-input"
            type="password"
            placeholder="Code"
          />
          <button className="adminLogin__submit-btn" type="submit">
            Submit
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              this.props.toggleModal();
            }}
            className="adminLogin__back-btn"
          >
            X
          </button>
        </form>
      </div>
    );
  }
}
