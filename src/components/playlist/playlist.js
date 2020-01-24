import React, { Component, Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Playlistitem from "./playlistitem";
import LoadPlaylistModal from "./loadPlaylistModal";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import "./playlist.css";
class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: this.props.playlists,
      playlist: this.props.playlist
    };
  }
  componentDidMount() {
    this.props.getPlayList();
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlist: this.props.playlist
      });
    }
  }
  render() {
    const playlist = this.props.playlist;
    const playlists = this.props.playlists;
    console.log(playlist);
    //TODO:
    //save current playlist juttu
    //clear queue nappula
    //save current playlist ja nimi juttu siihe
    //edit playlists peri aattees vaa nimi siihe
    //jos joskus jaksaa ni sellasen drag to change queue part
    //fixaa bugi jos lisää playlistin kaks kertaa ni ei pysty poistaa queuesta
    return (
      <div>
        <Container>
          <Button
            className="float-right btn-remove"
            color="info"
            onClick={this.props.addPlaylistToQueue}
          >
            Play
          </Button>{" "}
          <Button className="btn btn-primary float-right" color="primary">
            Save current playlist
          </Button>
        </Container>
        <p>Playlist</p>
        <div id="videolist">
          <br />
          <LoadPlaylistModal
            playlists={playlists}
            loadPlaylist={this.props.loadPlaylist}
          />

          <br />
          {playlist.map(({ title, videoId, uniqueId }) => (
            <CSSTransition key={uniqueId} timeout={500} classNames="fade">
              <Playlistitem
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
