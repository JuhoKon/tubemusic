import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import Queueitem from "./queueitem";
import "./queue.css";
class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: props.queue
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        queue: this.props.queue
      });
    }
  }
  render() {
    const queue = this.state.queue;

    return (
      <div>
        {queue.map(
          ({ title, publishedAt, channelTitle, videoId, thumbnail,uniqueId }) => (
            <div key={videoId + Math.random()}>
              <Queueitem
                uniqueId = {uniqueId}
                title={title}
                thumbnail={thumbnail}
                channelTitle={channelTitle}
                publishedAt={publishedAt}
                videoId={videoId}
                onRemove={this.props.onRemove}
              />
            </div>
          )
        )}
      </div>
    );
  }
}
export default Queue;
