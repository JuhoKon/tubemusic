import React, { Component, Fragment } from "react";
import { Jumbotron, Container } from "reactstrap";
import Videoitem from "./videoitem";

import { CSSTransition } from "react-transition-group";
import "./videolist.css";
class Videolist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items;

    return (
      <div id="videolist">
        <br />
        <br />
        {items.map(
          ({
            title,
            publishedAt,
            channelTitle,
            videoId,
            thumbnail,
            uniqueId
          }) => (
            <CSSTransition key={uniqueId} timeout={500} classNames="fade">
              <Videoitem
                uniqueId={uniqueId}
                title={title}
                thumbnail={thumbnail}
                channelTitle={channelTitle}
                publishedAt={publishedAt}
                videoId={videoId}
                addFunc={this.props.onAdd}
                onPlay={this.props.onPlay}
                AddToPlaylist={this.props.AddToPlaylist}
              />
            </CSSTransition>
          )
        )}
        <Videoitem
          title="1"
          thumbnail="youtube.com"
          channelTitle="Ss"
          videoId="0plu8CGDAJk"
          addFunc={this.props.onAdd}
          onPlay={this.props.onPlay}
          uniqueId="45"
          AddToPlaylist={this.props.AddToPlaylist}
        />
        <Videoitem
          uniqueId="454"
          title="2"
          thumbnail="youtube.com"
          channelTitle="Ss"
          videoId="121212121"
          addFunc={this.props.onAdd}
          AddToPlaylist={this.props.AddToPlaylist}
        />
        <Videoitem
          uniqueId="435"
          title="3"
          thumbnail="youtube.com"
          channelTitle="Ss"
          videoId="0plu8CGDAJk"
          addFunc={this.props.onAdd}
        />
        <Videoitem
          uniqueId="3345"
          title="4"
          thumbnail="youtube.com"
          channelTitle="Ss"
          videoId="0plu8CGDAJk"
          addFunc={this.props.onAdd}
        />
      </div>
    );
  }
}
export default Videolist;
