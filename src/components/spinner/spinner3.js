import React from "react";
import RotateLoader from "react-spinners/RotateLoader";
import "./spinner.css";
//https://www.davidhu.io/react-spinners/
export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      size: this.props.size || 150
    };
  }
  render() {
    return (
      <div className="sweet-loading" id="spinner2">
        <br />
        <RotateLoader
          size={15}
          //size={"150px"} this also works
          color={this.props.color || "#c45a8e"}
          loading={this.state.loading}
          margin={2}
        />
        <br />
        <br />
        <i className="loadingText">Loading...</i>
      </div>
    );
  }
}
