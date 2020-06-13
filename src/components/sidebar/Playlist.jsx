import React from "react";
//Tänne myös contet menu? Load playlist && Delete playlist tms.

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name.substring(0, 400),
    };
  }
  loadPlaylist(id) {
    this.props.loadPlaylist(id);
  }
  render() {
    console.log(this.props);
    return (
      <div
        onClick={this.loadPlaylist.bind(this, this.props._id)}
        className="sidebar-playlist"
      >
        {this.state.name}
      </div>
    );
  }
}
