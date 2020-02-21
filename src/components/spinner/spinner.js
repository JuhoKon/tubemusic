import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./spinner.css";
//https://www.davidhu.io/react-spinners/
export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      size: this.props.size || 35
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <PacmanLoader
          size={this.state.size}
          //size={"150px"} this also works
          color={this.props.color || "#c45a8e"}
          loading={this.state.loading}
        />
        <br />
        <br />
        <i className="italic">Loading...</i>
      </div>
    );
  }
}
