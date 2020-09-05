import React, { Component } from "react";
import PlaylistModalItem from "./trackItem";
import { List, AutoSizer } from "react-virtualized";
import isEqual from "react-fast-compare";

class ImportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeImportedPlaylist: this.props.toBeImportedPlaylist,
      updated: "",
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        toBeImportedPlaylist: this.props.toBeImportedPlaylist,
      });
    }
  }
  renderRow = ({ index, key, isScrolling, isVisible, style }) => {
    const toBeImportedPlaylist = this.props.toBeImportedPlaylist;
    const {
      title,
      artistName,
      id,
      duration,
      date,
      videoId,
      artists,
      thumbnails,
      thumbnail,
      album,
    } = toBeImportedPlaylist[index];
    //const { value } = items[index];
    //tänne samalla lailla noi durationit datet jne kuten loadedListissä
    return (
      <div key={id} style={style}>
        <PlaylistModalItem
          key={id}
          id={id}
          artistName={artistName}
          importPlaylistToApp={this.props.importPlaylistToApp}
          removeFromPlaylist={this.props.removeFromPlaylist}
          imported={true}
          title={title}
          duration={duration}
          date={date}
          videoId={videoId}
          artists={artists}
          thumbnails={thumbnails}
          thumbnail={thumbnail}
          album={album}
        ></PlaylistModalItem>
      </div>
    );
  };
  render() {
    //console.log("Importlist");
    //const toBeImportedPlaylist = this.state.toBeImportedPlaylist;
    //console.log(this.state.toBeImportedPlaylist);
    return (
      <div>
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
