import React, { Component } from "react";
import { Tooltip } from "reactstrap";
import PlaylistItem from "./Playlist";
import "./sidebar.css";
import isEqual from "react-fast-compare";
import CreateNew from "../playlist/createNew/createNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
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
  async getPlaylists2() {
    this.props.setLoading(true);
    await this.props.getPlaylist();
    this.props.setLoading(false);
  }
  toggletip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };
  render() {
    return (
      <div className="sidebardiv">
        <h3>Playlists</h3>

        <Tooltip
          placement="top"
          isOpen={this.state.tooltipOpen}
          target="TooltipExample2"
          toggle={this.toggletip}
        >
          Refresh playlists
        </Tooltip>
        <div
          id="TooltipExample2"
          className="refreshbuttonarea"
          onClick={this.getPlaylists2.bind(this, this.props)}
        >
          <FontAwesomeIcon className="Active" size={"lg"} icon={faRetweet} />
        </div>
        <CreateNew
          makePlaylist={this.props.makePlaylist}
          playlistName={this.state.playlistName}
        />
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
