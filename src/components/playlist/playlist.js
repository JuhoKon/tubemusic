import React, { Component } from "react";
import { Button } from "reactstrap";

import LoadPlaylistModal from "./loadPlaylistModal";
import SaveModal from "./save/saveModal";
import CreateNew from "./createNew/createNew";
import isEqual from "react-fast-compare";

import PlaylistItemsList from "./playlistItemsList";
import { SortableContainer } from "react-sortable-hoc";
import { AutoSizer } from "react-virtualized";
import arrayMove from "array-move";
import "./playlist.css";

const SortableVirtualList = SortableContainer(PlaylistItemsList);

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: this.props.playlists,
      playlist: this.props.playlist,
      playlistName: this.props.playlistName,
      playlistId: this.props.playlistId,
      editMode: false
    };
    this.UpdateCurrentPlaylist = this.UpdateCurrentPlaylist.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDeleteFromPlaylist = this.onDeleteFromPlaylist.bind(this);
  }
  componentDidMount() {
    this.props.getPlayList();
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlist: this.props.playlist,
        playlists: this.props.playlists,
        playlistName: this.props.playlistName,
        playlistId: this.props.playlistId
      });
    }
  }
  onDeleteFromPlaylist(item) {
    console.log(item);

    for (let i = 0; i < this.state.playlist.length; i++) {
      if (this.state.playlist[i].uniqueId === item.uniqueId) {
        //delete item from playlist
        this.state.playlist.splice(i, 1);
        break;
      }
    }
    this.props.onDeleteFromPlaylist(item);
  }
  playPlaylist(playlist) {
    console.log("playPlaylist");
    this.props.playPlaylist(playlist);
  }
  toggle = () => {
    this.setState({
      editMode: !this.state.editMode
    });

    setTimeout(() => this.props.loadPlaylist(this.state.playlistId), 200);
    this.List.recomputeRowHeights();
    this.List.forceUpdate();
  };

  async UpdateCurrentPlaylist() {
    this.props.setPlaylist(this.state.playlist);
    await this.props.UpdateCurrentPlaylist();
    this.toggle();
  }

  registerListRef = listInstance => {
    this.List = listInstance;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }

    const { playlist } = this.state;

    this.setState({
      playlist: arrayMove(playlist, oldIndex, newIndex)
    });

    // We need to inform React Virtualized that the items have changed heights
    // This can either be done by imperatively calling the recomputeRowHeights and
    // forceUpdate instance methods on the `List` ref, or by passing an additional prop
    // to List that changes whenever the order changes to force it to re-render
    this.props.setPlaylist(this.state.playlist);
    this.props.UpdateCurrentPlaylist();
    this.List.recomputeRowHeights();
    this.List.forceUpdate();
  };

  render() {
    console.log(this.props.playlist);
    const playlist = this.props.playlist;

    const playlists = this.props.playlists;

    return (
      <div>
        <div className="btn-group">
          <Button
            className="float-left btn-margin"
            color="info"
            onClick={this.playPlaylist.bind(this, playlist)}
            disabled={this.props.playlist[0] ? false : true}
          >
            Play
          </Button>
          <CreateNew
            makePlaylist={this.props.makePlaylist}
            playlistName={this.state.playlistName}
          />
          <LoadPlaylistModal
            deletePlaylist={this.props.deletePlaylist}
            getPlayList={this.props.getPlayList}
            playlists={playlists}
            loadPlaylist={this.props.loadPlaylist}
          />
          <SaveModal
            playlistId={this.props.playlistId}
            Updateplaylist={this.props.Updateplaylist}
            playlistName={this.state.playlistName}
          />
          <Button
            className="float-right btn-margin "
            color="info"
            onClick={this.props.addPlaylistToQueue}
            disabled={this.props.playlist[0] ? false : true}
          >
            + Queue
          </Button>
        </div>
        <br />
        <br />
        <Button
          color={this.state.editMode ? "primary" : "secondary"}
          className="float-right btn-remove"
          onClick={this.toggle}
          /*disabled={this.props.playlist[0] ? false : true}*/
        >
          {this.state.editMode ? "Revert changes" : "Edit"}
        </Button>
        {this.state.editMode ? (
          <Button
            onClick={this.UpdateCurrentPlaylist}
            className="float-right btn-remove"
          >
            Save
          </Button>
        ) : null}
        <p className="float-left">
          Current playlist: {this.state.playlistName}
        </p>
        <br />
        <br />
        <br />
        <p className="float-left">Total songs: {this.state.playlist.length}</p>
        <AutoSizer disableHeight>
          {({ width }) => (
            <SortableVirtualList
              editMode={this.state.editMode}
              getRef={this.registerListRef}
              playlist={this.state.playlist}
              onSortEnd={this.onSortEnd}
              onAdd={this.props.onAdd}
              onPlay={this.props.onPlay}
              onDeleteFromPlaylist={this.onDeleteFromPlaylist}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
export default Playlist;
