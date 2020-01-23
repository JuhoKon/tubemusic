import React, { Component, Fragment } from "react";
import { Jumbotron, Container } from "reactstrap";
import Playlistitem from "./playlistitem";

import { CSSTransition } from "react-transition-group";
import "./playlist.css";
class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playlist = this.props.playlist;
    return (
      <div id="videolist">
        <br />
        <br />
        {playlist.map(({ title, videoId, uniqueId }) => (
          <CSSTransition key={uniqueId} timeout={500} classNames="fade">
            <Playlistitem
              uniqueId={uniqueId}
              title={title}
              videoId={videoId}
              addFunc={this.props.onAdd}
              onPlay={this.props.onPlay}
            />
          </CSSTransition>
        ))}
        <Playlistitem
          title="Rich Brian - Drive Safe (Disko '1980')"
          videoId="0plu8CGDAJk"
          addFunc={this.props.onAdd}
          onPlay={this.props.onPlay}
          uniqueId="45"
        />
        <Playlistitem
          uniqueId="454"
          title="2"
          videoId="121212121"
          addFunc={this.props.onAdd}
        />
        <Playlistitem
          uniqueId="435"
          title="3"
          thumbnail="youtube.com"
          channelTitle="Ss"
          videoId="0plu8CGDAJk"
          addFunc={this.props.onAdd}
        />
        <Playlistitem
          uniqueId="3345"
          title="4"
          videoId="0plu8CGDAJk"
          addFunc={this.props.onAdd}
        />
      </div>
    );
  }
}
export default Playlist;
