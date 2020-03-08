import React, { Component } from "react";
import isEqual from "react-fast-compare";
import { List, AutoSizer } from "react-virtualized";
import PlayListItem from "./playListItem";
import "react-virtualized/styles.css";
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
        token: this.props.token,
        Userplaylists: this.props.Userplaylists
      });
    }
  }
  renderRow = ({ index, style }) => {
    const playlists = this.props.playlists;
    const { name, _id, createdAt, owner } = playlists[index];
    const priv = playlists[index].private;
    //const { value } = items[index];
    return (
      <div key={_id} style={style}>
        <PlayListItem
          userData={this.props.userData}
          loadPlaylists={this.props.loadPlaylists}
          getPlayListById={this.props.getPlayListById}
          token={this.props.token}
          createdAt={createdAt}
          id={_id}
          name={name}
          owner={owner}
          private={priv}
        ></PlayListItem>
      </div>
    );
  };
  render() {
    console.log(this.props.userData);
    //console.log(this.state);
    const { playlists } = this.state;
    //console.log(filteredData);
    return (
      <div>
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
