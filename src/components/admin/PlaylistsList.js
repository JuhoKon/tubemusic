import React, { Component } from "react";
import isEqual from "react-fast-compare";
import { List, AutoSizer } from "react-virtualized";
import PlaylistItem from "../spotify/spotifyplaylist/spotifPlaylistitem";
import { Row, Col, Container } from "reactstrap";
import AdminPlaylistItem from "./AdminPlaylistItem";

class PlaylistsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: this.props.playlists,
      token: this.props.token
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlists: this.props.playlists,
        token: this.props.token
      });
    }
  }
  renderRow = ({ index, key, isScrolling, isVisible, style }) => {
    const playlists = this.props.playlists;
    const { name, _id, createdAt } = playlists[index];
    //const { value } = items[index];
    return (
      <div key={_id} style={style}>
        <AdminPlaylistItem
          loadPlaylists={this.props.loadPlaylists}
          token={this.props.token}
          createdAt={createdAt}
          id={_id}
          name={name}
        ></AdminPlaylistItem>
      </div>
    );
  };

  render() {
    console.log(this.state);
    const { playlists } = this.state;
    //console.log(filteredData);
    return (
      <div>
        All playlists
        <br />
        <br />
        <AutoSizer>
          {({ width }) => (
            <List
              width={width}
              height={700}
              rowCount={playlists.length}
              rowHeight={82}
              rowRenderer={this.renderRow}
            ></List>
          )}
        </AutoSizer>
      </div>
    );
  }
}
export default PlaylistsList;
