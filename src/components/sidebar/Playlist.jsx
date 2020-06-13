import React from "react";

//https://www.davidhu.io/react-spinners/
export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name.substring(0, 400),
    };
  }
  render() {
    console.log(this.props);
    return <div className="sidebar-playlist">{this.state.name}</div>;
  }
}
