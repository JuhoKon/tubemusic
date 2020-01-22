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
          ({ title, publishedAt, channelTitle, videoId, thumbnail }) => (
            <CSSTransition key={title} timeout={500} classNames="fade">
              <Videoitem
                title={title}
                thumbnail={thumbnail}
                channelTitle={channelTitle}
                publishedAt={publishedAt}
                videoId={videoId}
                addFunc={this.props.onAdd}
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
        />
        <Videoitem
          title="2"
          thumbnail="youtube.com"
          channelTitle="Ss"
          videoId="121212121"
          addFunc={this.props.onAdd}
        />
        <Videoitem
          title="3"
          thumbnail="youtube.com"
          channelTitle="Ss"
          videoId="0plu8CGDAJk"
          addFunc={this.props.onAdd}
        />
        <Videoitem
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
