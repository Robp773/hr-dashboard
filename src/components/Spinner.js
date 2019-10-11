import React from "react";
import Loader from "react-loader-spinner";
export default class Spinner extends React.Component {
  render() {
    return (
      <Loader
        type="Bars"
        color={this.props.color ? this.props.color : "#ffffff"}
        height={this.props.height ? this.props.height : 35}
        width={this.props.width ? this.props.width : 35}
      />
    );
  }
}
