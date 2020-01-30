//näissä chekkaa onko muttunu tms.
import React, { Component } from "react";
import PlaylistModalItem from "./PlaylistModalItem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";

class LoadedList extends Component {
  shouldComponentUpdate() {
    //component doesn't need to be updated
    //saving ALOT of re-renders
    return false;
  }

  render() {
    //console.log("loadedList");
    const tracks = this.props.tracks;
    //console.log(this.state.loading);

    return (
      <div id="videolist">
        {this.props.totalTracks} songs
        <span className="float-right">By {this.props.ownerName}</span>
        {tracks.map(({ title, artistName }) => (
          <PlaylistModalItem
            key={Math.random()}
            title={title}
            artistName={artistName}
            addToImport={this.props.addToImport}
            imported={false}
          />
        ))}
      </div>
    );
  }
}
export default LoadedList;
