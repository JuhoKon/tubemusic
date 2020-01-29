import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import Playlistitem from "./playlistitem";
import LoadPlaylistModal from "./loadPlaylistModal";
import SaveModal from "./save/saveModal";
import CreateNew from "./createNew/createNew";
import isEqual from "react-fast-compare";
import FlipMove from "react-flip-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./playlist.css";
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
  playPlaylist(playlist) {
    console.log("playPlaylist");
    this.props.playPlaylist(playlist);
  }
  toggle = () => {
    this.setState({
      editMode: !this.state.editMode
    });
    setTimeout(() => this.props.loadPlaylist(this.state.playlistId), 200);
  };

  async UpdateCurrentPlaylist() {
    this.props.setPlaylist(this.state.playlist);
    await this.props.UpdateCurrentPlaylist();

    this.toggle();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    //console.log(oldIndex, newIndex);
    this.setState(({ playlist }) => ({
      playlist: arrayMove(playlist, oldIndex, newIndex)
    }));
    this.props.setPlaylist(this.state.playlist);
  };
  render() {
    //console.log(this.props.playlist);
    const playlist = this.props.playlist;

    const playlists = this.props.playlists;
    const SortableList = SortableContainer(({ playlist }) => {
      return (
        <div>
          {playlist.map(
            ({ title, videoId, uniqueId, duration, publishedAt }, index) => (
              <SortableItem
                className="QueueItem"
                key={uniqueId}
                index={index}
                editMode={this.state.editMode}
                uniqueId={uniqueId}
                title={title}
                videoId={videoId}
                addFunc={this.props.onAdd}
                onPlay={this.props.onPlay}
                onDeleteFromPlaylist={this.props.onDeleteFromPlaylist}
                onRemove={this.props.onRemove}
                duration={duration}
                publishedAt={publishedAt}
              />
            )
          )}
        </div>
      );
    });
    const SortableItem = SortableElement(
      ({ uniqueId, title, videoId, duration, publishedAt }) => (
        <Playlistitem
          key={uniqueId}
          editMode={this.state.editMode}
          uniqueId={uniqueId}
          title={title}
          videoId={videoId}
          addFunc={this.props.onAdd}
          onPlay={this.props.onPlay}
          onDeleteFromPlaylist={this.props.onDeleteFromPlaylist}
          onRemove={this.props.onRemove}
          duration={duration}
          publishedAt={publishedAt}
        />
      )
    );
    //console.log(playlists);
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
        <p className="float-left">Playlist: {this.state.playlistName}</p>
        <br />
        <br />

        <div id="videolist">
          {this.state.editMode ? (
            <SortableList playlist={playlist} onSortEnd={this.onSortEnd} />
          ) : (
            <FlipMove>
              {this.props.playlist.map(
                ({ title, videoId, uniqueId, duration, publishedAt }) => (
                  <Playlistitem
                    key={uniqueId}
                    editMode={this.state.editMode}
                    uniqueId={uniqueId}
                    title={title}
                    videoId={videoId}
                    addFunc={this.props.onAdd}
                    onPlay={this.props.onPlay}
                    onDeleteFromPlaylist={this.props.onDeleteFromPlaylist}
                    onRemove={this.props.onRemove}
                    duration={duration}
                    publishedAt={publishedAt}
                  />
                )
              )}
            </FlipMove>
          )}
        </div>
      </div>
    );
  }
}
export default Playlist;
