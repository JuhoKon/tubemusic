import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import PlaylistItem from "./Playlist";
import "./sidebar.css";

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
class Sidebar extends Component<any, any> {
  state = {
    loading: false,
  };
  componentDidMount() {
    this.getPlaylists();
  }
  getPlaylists = async () => {
    await timeout(2000);
    this.props.getPlaylist();
  };
  getPlaylists2() {
    this.props.getPlaylist();
  }
  render() {
    console.log(this.props);

    return (
      <div className="sidebardiv">
        <h3>Playlists</h3>
        <button onClick={this.getPlaylists2.bind(this, this.props)}>
          Refresh
        </button>
        <br />
        <div className="playlists-sidebar">
          {this.props.playlists.map((item: any, i: any) => (
            <div key={i}>
              <PlaylistItem
                loadPlaylist={this.props.loadPlaylist}
                name={item.name}
                _id={item._id}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Sidebar;
