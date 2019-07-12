import React from "react";
import { API_BASE_URL } from "../config";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

export default class ActivationList extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      modalOpen: false,
      adminOpen: false
    };
    this.toggleAdmin = this.toggleAdmin.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/activations/active`).then(res => {
      return res
        .json()
        .then(result => {
          this.setState({
            results: result
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  openModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  toggleAdmin() {
    fetch(`${API_BASE_URL}/activations/active`).then(res => {
      return res
        .json()
        .then(result => {
          this.setState({
            results: result,
            adminOpen: !this.state.adminOpen,
            modalOpen: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  render() {
    let modal;
    let activeComponent;

    if (this.state.adminOpen) {
      activeComponent = <AdminPanel toggleAdmin={this.toggleAdmin} />;
    } else {
      if (this.state.modalOpen) {
        modal = (
          <AdminLogin
            toggleModal={this.openModal}
            toggleAdmin={this.toggleAdmin}
          />
        );
      }

      let activationsArray = [];
      let enabledIndicator = (
        <div className="activationList__stream-indicator activationList__stream-indicator--enabled" />
      );
      let disabledIndicator = (
        <div className="activationList__stream-indicator activationList__stream-indicator--disabled" />
      );

      for (let i = 0; i < this.state.results.length; i++) {
        let levelClass;

        if (this.state.results[i].level === 1) {
          levelClass = "green";
        } else if (this.state.results[i].level === 2) {
          levelClass = "yellow";
        } else if (this.state.results[i].level === 3) {
          levelClass = "red";
        }
        let levelIndicator = (
          <div
            className={`activationList__level-indicator activationList__level-indicator--${levelClass}`}
          />
        );

        let statesArray = [];
        for (let b = 0; b < this.state.results[i].states.length; b++) {
          statesArray.push(
            <span key={b}>{this.state.results[i].states[b]} </span>
          );
        }
        activationsArray.push(
          <tr
            className="activationList__tr"
            onClick={() => {
              this.props.chooseActivation(this.state.results[i].activationName);
            }}
            key={i}
          >
            <td className="activationList__td">
              {this.state.results[i].activationName}
            </td>
            <td className="activationList__td">{statesArray}</td>
            <td className="activationList__td">
              {this.state.results[i].disasterType}
            </td>
            <td className="activationList__td">
              {this.state.results[i].streamEnabled
                ? enabledIndicator
                : disabledIndicator}
            </td>
            <td className={`activationList__td activationList__level`}>
              {levelIndicator}
            </td>
            <td className="activationList__td activationList__td--open">
              <img alt="open activation" src="./images/login.png" />
            </td>
          </tr>
        );
      }

      activeComponent = (
        <div className="activationList">
          {modal}
          <button
            className="activationList__admin-btn"
            onClick={() => {
              this.openModal();
            }}
          >
            Admin Login
          </button>

          <img
            className="activationList__banner"
            alt="Humanity Road logo"
            src="../images/hr-logo-horizontal.png"
          />
          <table className="activationList__table">
            <tbody>
              <tr className="activationList__top-row">
                <th className="activationList__th">Activation</th>
                <th className="activationList__th">States</th>
                <th className="activationList__th">Type</th>
                <th className="activationList__th">Stream</th>
                <th className="activationList__th">Level</th>
              </tr>
              {activationsArray}
            </tbody>
          </table>
        </div>
      );
    }
    return <div>{activeComponent}</div>;
  }
}
