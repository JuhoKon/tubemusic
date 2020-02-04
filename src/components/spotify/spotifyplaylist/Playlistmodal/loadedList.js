//näissä chekkaa onko muttunu tms.
import React, { Component } from "react";
import PlaylistModalItem from "./PlaylistModalItem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import { List, AutoSizer } from "react-virtualized";

class LoadedList extends Component {
  renderRow = ({ index, key, isScrolling, isVisible, style }) => {
    const tracks = this.props.tracks;
    const { title, artistName, id } = tracks[index];
    //const { value } = items[index];
    return (
      <div key={id} style={style}>
        <PlaylistModalItem
          id={id}
          key={Math.random()}
          artistName={artistName}
          addToImport={this.props.addToImport}
          imported={false}
          title={title}
        ></PlaylistModalItem>
      </div>
    );
  };

  shouldComponentUpdate() {
    //component doesn't need to be updated
    return false;
  }

  render() {
    //console.log("loadedList");
    const tracks = this.props.tracks;
    console.log(tracks);
    //console.log(this.state.loading);

    return (
      <div>
        {this.props.totalTracks} songs
        <span className="float-right">By {this.props.ownerName}</span>
        <br />
        <br />
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
