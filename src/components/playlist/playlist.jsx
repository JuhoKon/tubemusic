import React, { Component } from "react";
import { Button, Input } from "reactstrap";
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
      editMode: false,
      filter: "",
      playlistOwner: this.props.playlistOwner,
      userName: this.props.userName,
    };
    this.UpdateCurrentPlaylist = this.UpdateCurrentPlaylist.bind(this);

    this.onDeleteFromPlaylist = this.onDeleteFromPlaylist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addPlaylistToQueue = this.addPlaylistToQueue.bind(this);
  }
  addPlaylistToQueue(filteredData) {
    this.props.addPlaylistToQueue(filteredData);
  }
  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps, this.props)) {
      return true;
    }
    if (!isEqual(nextProps.playlistName, this.state.playlistName)) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlist: this.props.playlist,
        playlists: this.props.playlists.reverse,
        playlistName: this.props.playlistName,
        playlistId: this.props.playlistId,
        playlistOwner: this.props.playlistOwner,
        userName: this.props.userName,
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
    this.forceUpdate();
    this.props.onDeleteFromPlaylist(item);
  }
  playPlaylist(playlist) {
    console.log(playlist);
    console.log("playPlaylist");
    this.props.playPlaylist(playlist);
  }

  async UpdateCurrentPlaylist() {
    this.props.setPlaylist(this.state.playlist);
    await this.props.UpdateCurrentPlaylist();
    this.toggle();
  }
  UpdateCurrentPlaylist2 = async () => {
    this.props.setPlaylist(this.state.playlist);
    await this.props.UpdateCurrentPlaylist();
  };
  registerListRef = (listInstance) => {
    this.List = listInstance;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }

    const { playlist } = this.props;

    this.setState({
      playlist: arrayMove(playlist, oldIndex, newIndex),
    });
    //console.log(playlist);
    //console.log(arrayMove(playlist, oldIndex, newIndex));
    // We need to inform React Virtualized that the items have changed heights
    // This can either be done by imperatively calling the recomputeRowHeights and
    // forceUpdate instance methods on the `List` ref, or by passing an additional prop
    // to List that changes whenever the order changes to force it to re-render
    this.props.setPlaylist(this.state.playlist);
    this.props.UpdateCurrentPlaylist();
    this.List.recomputeRowHeights();
    this.List.forceUpdate();
  };

  toggleArtistModal = async (artist) => {
    this.props.toggleArtistModal(artist);
  };
  saveName = (name) => {
    this.setState({
      playlistName: name,
    });
    this.forceUpdate();
  };
  render() {
    console.log("I was rendered again");
    const { filter } = this.state;
    const { playlist } = this.props;

    const lowercasedFilter = filter.toLowerCase();
    //console.log(playlist);
    const filteredData = playlist.filter((item) => {
      if (item === null || typeof item === "undefined") return playlist; //problems
      return Object.keys(item).some(
        (key) =>
          typeof item[key] === "string" &&
          key === "title" && //only filter based on name
          item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

    return (
      <div>
        <div className="btn-group ">
          <Button
            className="float-left btn-margin btn-secondary"
            color="info"
            onClick={this.playPlaylist.bind(this, filteredData)}
            disabled={this.props.playlist[0] ? false : true}
          >
            Play playlist
          </Button>
          <CreateNew
            makePlaylist={this.props.makePlaylist}
            playlistName={this.state.playlistName}
            setLoading={this.setLoading}
          />

          <SaveModal
            userRole={this.props.userRole}
            userName={this.state.userName}
            playlistId={this.props.playlistId}
            isPrivate={this.props.isPrivate}
            Updateplaylist={this.props.Updateplaylist}
            saveName={this.saveName}
            playlistName={this.state.playlistName}
            playlistOwner={this.state.playlistOwner}
            setLoading={this.setLoading}
          />
          <Button
            className="float-right btn-margin btn btn-secondary button"
            color="info"
            onClick={this.addPlaylistToQueue.bind(this, filteredData)}
            disabled={this.props.playlist[0] ? false : true}
          >
            + Q
          </Button>
        </div>
        <br />
        <br />
        <p className="float-left">
          Current playlist: {this.state.playlistName}
        </p>
        <br />
        <Input
          value={filter}
          onChange={this.handleChange}
          placeholder="Filter songs..."
        />
        <hr />

        <p className="float-left">Total songs: {filteredData.length}</p>

        <AutoSizer disableHeight>
          {({ width }) => (
            <SortableVirtualList
              playNext={this.props.playNext}
              editMode={this.state.editMode}
              getRef={this.registerListRef}
              playlist={filteredData}
              onSortEnd={this.onSortEnd}
              onAdd={this.props.onAdd}
              onPlay={this.props.onPlay}
              onDeleteFromPlaylist={this.onDeleteFromPlaylist}
              toggleArtistModal={this.toggleArtistModal}
              toggleAlbumModal={this.props.toggleAlbumModal}
              UpdateCurrentPlaylist2={this.UpdateCurrentPlaylist2}
              width={width}
              distance={10}
              playlists={this.props.playlists}
              addSongToPlaylist={this.props.addSongToPlaylist}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
export default Playlist;
