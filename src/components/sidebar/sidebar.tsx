import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import PlaylistItem from "./Playlist";
import "./sidebar.css";
class Sidebar extends Component<any, any> {
  state = {
    loading: false,
  };

  render() {
    console.log(this.props);

    return (
      <div className="sidebardiv">
        <h3>Playlists</h3>
        <br />
        <div className="playlists-sidebar">
          {this.props.playlists.map((item: any, i: any) => (
            <div key={i}>
              <PlaylistItem name={item.name} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Sidebar;
