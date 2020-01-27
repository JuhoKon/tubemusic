import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import { Button } from "reactstrap";
import Queueitem from "./queueitem";
import FlipMove from "react-flip-move";
import { useTransition, animated } from "react-spring";
import "./queue.css";

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: props.queue
    };
    this.shuffleQueue = this.shuffleQueue.bind(this);
    this.clearQueue = this.clearQueue.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      this.setState({
        queue: this.props.queue
      });
    }
  }
  shuffleQueue() {
    this.props.shuffleQueue();
  }
  clearQueue() {
    this.props.clearQueue();
  }
  render() {
    const queue = this.state.queue;

    console.log(queue);

    return (
      <div>
        <Button
          disabled={this.props.queue[0] ? false : true}
          className="float-right btn-remove"
          onClick={this.clearQueue}
        >
          CLEAR
        </Button>
        <Button
          disabled={this.props.queue[0] ? false : true}
          className="float-right"
          onClick={this.shuffleQueue}
        >
          SHUFFLE
        </Button>
        <br />
        <br />
        <FlipMove>
          {queue.map(
            ({
              title,
              publishedAt,
              channelTitle,
              videoId,
              thumbnail,
              uniqueId
            }) => (
              <Queueitem
                key={uniqueId}
                uniqueId={uniqueId}
                title={title}
                thumbnail={thumbnail}
                channelTitle={channelTitle}
                publishedAt={publishedAt}
                videoId={videoId}
                onRemove={this.props.onRemove}
                onPlay={this.props.onPlay}
              />
            )
          )}
        </FlipMove>
      </div>
    );
  }
}
export default Queue;
