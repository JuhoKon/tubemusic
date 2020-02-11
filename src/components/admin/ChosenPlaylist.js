import React, { Component } from "react";

import { List, AutoSizer } from "react-virtualized";
import isEqual from "react-fast-compare";
import PlayListItem from "./PlayListItem";

class ChosenPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: this.props.playlists
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlists: this.props.playlists
      });
    }
  }
  renderRow = ({ index, key, isScrolling, isVisible, style }) => {
    const playlists = this.props.playlists;
    console.log(playlists);
    const { title, artistName, uniqueId } = playlists[index];
    //const { value } = items[index];
    return (
      <div key={uniqueId} style={style}>
        <PlayListItem
          key={uniqueId}
          id={uniqueId}
          artistName={artistName}
          name={title}
        ></PlayListItem>
      </div>
    );
  };

  render() {
    const playlists = this.props.playlists;
    console.log(playlists.length);
    return (
      <div>
        <List
          width={470}
          height={550}
          rowCount={playlists.length}
          rowHeight={82}
          rowRenderer={this.renderRow}
        ></List>
      </div>
    );
  }
}
export default ChosenPlaylist;
