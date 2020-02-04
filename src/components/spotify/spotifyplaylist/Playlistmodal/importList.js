import React, { Component } from "react";
import PlaylistModalItem from "./PlaylistModalItem";
import { List, AutoSizer } from "react-virtualized";

class ImportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeImportedPlaylist: this.props.toBeImportedPlaylist,
      updated: ""
    };
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
  }
  renderRow = ({ index, key, isScrolling, isVisible, style }) => {
    const toBeImportedPlaylist = this.props.toBeImportedPlaylist;
    const { title, artistName, id } = toBeImportedPlaylist[index];
    //const { value } = items[index];
    return (
      <div key={id} style={style}>
        <PlaylistModalItem
          key={id}
          id={id}
          artistName={artistName}
          importPlaylistToApp={this.props.importPlaylistToApp}
          removeFromPlaylist={this.removeFromPlaylist}
          imported={true}
          title={title}
        ></PlaylistModalItem>
      </div>
    );
  };
  removeFromPlaylist(item) {
    if (!item) return;
    if (typeof this.state.toBeImportedPlaylist[0] === "undefined") return;
    console.log(this.state.toBeImportedPlaylist[0]);
    console.log(item);
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
    //const toBeImportedPlaylist = this.state.toBeImportedPlaylist;
    //console.log(this.state.toBeImportedPlaylist);
    return (
      <div>
        <br />
        Title &emsp;&emsp; {this.props.toBeImportedPlaylist.length} songs in the
        list.
        <span className="float-right">Artist</span>
        <br />
        <br />
        <AutoSizer>
          {({ width }) => (
            <List
              width={width}
              height={550}
              rowCount={this.props.toBeImportedPlaylist.length}
              rowHeight={82}
              rowRenderer={this.renderRow}
            ></List>
          )}
        </AutoSizer>
      </div>
    );
  }
}
export default ImportList;
