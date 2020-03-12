import React, { Component } from "react";
import isEqual from "react-fast-compare";
import { List, AutoSizer } from "react-virtualized";
import PlayListItem from "./playListItem";
import "react-virtualized/styles.css";
import { authenticationService } from "../functions/authenthication";
class PlaylistsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: this.props.playlists,
      token: this.props.token,
      userData: this.props.userData
    };
    this.load = this.load.bind(this);
  }
  componentDidMount() {
    this.load(this.state.token);
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      console.log("Change?");
      if (this.list) {
        this.list.forceUpdateGrid();
      }
      this.setState({
        playlists: this.props.playlists,
        token: this.props.token,
        Userplaylists: this.props.Userplaylists,
        userData: this.props.userData
      });
    }
  }
  async load(token) {
    const Array2 = [];
    let response = await authenticationService.loadUser(token);
    if (response !== null) {
      response.playlists.forEach(element => {
        Array2.push(element._id);
      });
      this.setState({
        currentUserInfo: Array2
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
          currentUserInfo={this.state.currentUserInfo}
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
  bindListRef = ref => {
    //so we can force update, when props change cos thats how react-virtualized list works
    this.list = ref;
  };
  render() {
    console.log(this.props.playlists);
    //console.log(this.state);
    const { playlists } = this.state;
    //console.log(filteredData);
    return (
      <div>
        <br />
        <AutoSizer>
          {({ width }) => (
            <List
              ref={this.bindListRef}
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
