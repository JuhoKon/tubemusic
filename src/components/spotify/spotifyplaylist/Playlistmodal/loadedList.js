//näissä chekkaa onko muttunu tms.
import React, { Component } from "react";
import PlaylistModalItem from "./PlaylistModalItem";

import { List, AutoSizer } from "react-virtualized";

class LoadedList extends Component {
  renderRow = ({ index, key, isScrolling, isVisible, style }) => {
    const tracks = this.props.tracks;
    const { title, artistName, id } = tracks[index];
    //const { value } = items[index];
    return (
      <div key={Math.random()} style={style}>
        <PlaylistModalItem
          id={Math.random()} //random to ensure unique id as there can be duplicates of each track
          key={id}
          artistName={artistName}
          addToImport={this.props.addToImport}
          imported={false}
          title={title}
        ></PlaylistModalItem>
      </div>
    );
  };

  render() {
    //console.log("loadedList");
    //const tracks = this.props.tracks;
    //console.log(tracks);
    //console.log(this.state.loading);

    return (
      <div>
        <AutoSizer>
          {({ width }) => (
            <List
              width={width}
              height={550}
              rowCount={this.props.tracks.length}
              rowHeight={80}
              rowRenderer={this.renderRow}
            ></List>
          )}
        </AutoSizer>
      </div>
    );
  }
}
export default LoadedList;
