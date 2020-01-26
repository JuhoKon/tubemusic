import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Form
} from "reactstrap";
import Playlistitem from "./playlistitem";
import LoadPlaylistModal from "./loadPlaylistModal";
import SaveModal from "./save/saveModal";
import CreateNew from "./createNew/createNew";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
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
    //console.log(this.state.playlistId); tos on id fixaa
    //this.props.loadPlaylist({ _id: this.state.playlist });
  };
  UpdateCurrentPlaylist = () => {
    this.props.UpdateCurrentPlaylist();
    this.toggle();
  };
  render() {
    const playlist = this.props.playlist;
    const playlists = this.props.playlists;

    //console.log(playlists);
    return (
      <div>
        <p>Playlist: {this.state.playlistName}</p>
        <Container>
          <Button
            className="float-left btn-remove"
            color="info"
            onClick={this.playPlaylist.bind(this, playlist)}
            disabled={this.props.playlist[0] ? false : true}
          >
            Play
          </Button>

          <Button
            className="float-right btn-remove"
            color="info"
            onClick={this.props.addPlaylistToQueue}
            disabled={this.props.playlist[0] ? false : true}
          >
            + Queue
          </Button>
        </Container>
        <SaveModal
          playlistId={this.props.playlistId}
          Updateplaylist={this.props.Updateplaylist}
          playlistName={this.state.playlistName}
        />
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

        <br />

        <Button
          color={this.state.editMode ? "primary" : "secondary"}
          className="float-right btn-remove"
          onClick={this.toggle}
          disabled={this.props.playlist[0] ? false : true}
        >
          {this.state.editMode ? "Revert changes" : "Edit"}
        </Button>
        {this.state.editMode ? (
          <Button
            onClick={this.UpdateCurrentPlaylist}
            className="float-right btn-remove"
            disabled={this.props.playlist[0] ? false : true}
          >
            Save
          </Button>
        ) : null}
        <br />
        <br />
        <div id="videolist">
          {playlist.map(({ title, videoId, uniqueId }) => (
            <CSSTransition key={uniqueId} timeout={500} classNames="fade">
              <Playlistitem
                editMode={this.state.editMode}
                uniqueId={uniqueId}
                title={title}
                videoId={videoId}
                addFunc={this.props.onAdd}
                onPlay={this.props.onPlay}
                onDeleteFromPlaylist={this.props.onDeleteFromPlaylist}
                onRemove={this.props.onRemove}
              />
            </CSSTransition>
          ))}
        </div>
      </div>
    );
  }
}
export default Playlist;
