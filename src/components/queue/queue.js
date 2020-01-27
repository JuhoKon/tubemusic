import React, { Component } from "react";
import isEqual from "react-fast-compare";
import { Button, Container } from "reactstrap";
import Queueitem from "./queueitem";
import FlipMove from "react-flip-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./queue.css";
class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: this.props.queue,
      editMode: false
    };
    this.shuffleQueue = this.shuffleQueue.bind(this);
    this.clearQueue = this.clearQueue.bind(this);
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    this.setState(({ queue }) => ({
      queue: arrayMove(queue, oldIndex, newIndex)
    }));
    this.props.setQueue(this.state.queue);
  };
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

  toggle = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  render() {
    const queue = this.state.queue;
    const SortableList = SortableContainer(({ queue }) => {
      return (
        <div>
          {queue.map(
            (
              {
                title,
                publishedAt,
                channelTitle,
                videoId,
                thumbnail,
                uniqueId
              },
              index
            ) => (
              <SortableItem
                className="QueueItem"
                key={uniqueId}
                uniqueId={uniqueId}
                index={index}
                title={title}
                videoId={videoId}
                publishedAt={publishedAt}
                channelTitle={channelTitle}
                thumbnail={thumbnail}
                onRemove={this.props.onRemove}
                onPlay={this.props.onPlay}
              />
            )
          )}
        </div>
      );
    });
    const SortableItem = SortableElement(
      ({
        key,
        uniqueId,
        title,
        thumbnail,
        channelTitle,
        publishedAt,
        videoId,
        editMode
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
          editMode={this.state.editMode}
        />
      )
    );
    return (
      <div>
        <Container>
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
          <Button
            disabled={this.props.queue[0] ? false : true}
            className="float-left btn-edit"
            onClick={this.toggle}
          >
            {this.state.editMode ? "Save" : "Edit"}
          </Button>
          <br />
          <br />
          {this.state.editMode ? (
            <SortableList queue={this.state.queue} onSortEnd={this.onSortEnd} />
          ) : (
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
                    editMode={this.state.editMode}
                  />
                )
              )}
            </FlipMove>
          )}
        </Container>
      </div>
    );
  }
}
export default Queue;
