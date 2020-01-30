import React, { Component } from "react";
import PlaylistModalItem from "./PlaylistModalItem";

class ImportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeImportedPlaylist: this.props.toBeImportedPlaylist,
      updated: ""
    };
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
  }
  removeFromPlaylist(item) {
    if (!item) return;
    if (typeof this.state.toBeImportedPlaylist[0] === "undefined") return;
    //console.log(this.state.toBeImportedPlaylist[0]);
    //console.log(item);
    for (let i = 0; i < this.state.toBeImportedPlaylist.length; i++) {
      if (this.state.toBeImportedPlaylist[i].id === item.id) {
        //console.log(this.state.toBeImportedPlaylist[i]);
        //delete item from toBeImportedPlaylist
        this.state.toBeImportedPlaylist.splice(i, 1);
        break;
      }
    }
    this.setState({
      updated: item.videoId
    });
  }
  render() {
    //console.log("Importlist");
    const toBeImportedPlaylist = this.state.toBeImportedPlaylist;
    return (
      <div id="videolist">
        {toBeImportedPlaylist.map(({ id, title, artistName }) => (
          <PlaylistModalItem
            key={id}
            id={id}
            title={title}
            artistName={artistName}
            importPlaylistToApp={this.props.importPlaylistToApp}
            removeFromPlaylist={this.removeFromPlaylist}
            imported={true}
          />
        ))}
      </div>
    );
  }
}
export default ImportList;
