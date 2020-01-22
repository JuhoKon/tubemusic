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
    /*items.map(item => {
      console.log(item);
    });*/

    return (
      <div>
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
              />
            </CSSTransition>
          )
        )}
      </div>
    );
  }
}
export default Videolist;
