import React, { Component } from "react";
import Videoitem from "./videoitem";
import { CSSTransition } from "react-transition-group";
import "./videolist.css";
class Videolist extends Component {
  render() {
    const items = this.props.items;

    return (
      <div id="videolist">
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
      </div>
    );
  }
}
export default Videolist;
