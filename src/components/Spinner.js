import React from 'react'
import Loader from "react-loader-spinner";
export default class Spinner extends React.Component {
  render() {
    return <Loader type="Bars" color={ this.props.color ? this.props.color : "#ffffff" }height="35" width="35" />;
  }
}
