import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import PlaylistItem from "./Playlist";
import "./sidebar.css";
import isEqual from "react-fast-compare";
//todo: check for cuomponentdidupdate - tuliko uusia propseja, jos tuli niin tehdään niillä jottai?
//force update tms jos tulee uusia propseja. ei tarvii ottaa omaa stateee. Tää homma ei piirrä itteesä uudellee jos ei state vaihu?
//lisää suunnitelmia playlist.jsx
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
class Sidebar extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      playlists: this.props.playlists,
      loading: false,
    };
  }
  componentDidUpdate(prevProps: any) {
    if (!isEqual(this.props, prevProps)) {
      this.setState({
        playlists: this.props.playlists,
      });
    }
  }
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
          {this.state.playlists.map((item: any, i: any) => (
            <div key={item._id}>
              <PlaylistItem
                loadPlaylist={this.props.loadPlaylist}
                name={item.name}
                _id={item._id}
                deletePlaylist={this.props.deletePlaylist}
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
