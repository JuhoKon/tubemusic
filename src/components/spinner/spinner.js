import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
//https://www.davidhu.io/react-spinners/
export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <PacmanLoader
          size={35}
          //size={"150px"} this also works
          color={"#36D7B7"}
          loading={this.state.loading}
        />
        <br />
        <br />
        <i className="italic">Loading items...</i>
      </div>
    );
  }
}
