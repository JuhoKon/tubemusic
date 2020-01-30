import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
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
          color={"#36D7B7"}
          loading={this.state.loading}
        />
        <br />
        <br />
        <i className="italic">Loading...</i>
      </div>
    );
  }
}
