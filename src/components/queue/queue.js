import React, { Component } from "react";
import isEqual from "react-fast-compare";
import { Button, Container } from "reactstrap";
import Queueitem from "./queueitem";
import QueueList from "./queueList";
import FlipMove from "react-flip-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./queue.css";

const SortableVirtualList = SortableContainer(QueueList);

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
  registerListRef = listInstance => {
    this.List = listInstance;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }

    const { queue } = this.state;

    this.setState({
      queue: arrayMove(queue, oldIndex, newIndex)
    }); //tässä ongelma
    //katso m,yös auuto scroller
    //sekä vähä styling?

    // We need to inform React Virtualized that the items have changed heights
    // This can either be done by imperatively calling the recomputeRowHeights and
    // forceUpdate instance methods on the `List` ref, or by passing an additional prop
    // to List that changes whenever the order changes to force it to re-render
    this.props.setQueue(this.state.queue);
    this.List.recomputeRowHeights();
    this.List.forceUpdate();
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
    this.List.recomputeRowHeights();
    this.List.forceUpdate(); //force list to update
  }
  clearQueue() {
    this.props.clearQueue();
  }

  toggle = () => {
    this.setState({
      editMode: !this.state.editMode
    });
    this.List.recomputeRowHeights();
    this.List.forceUpdate(); //force list to update
  };

  render() {
    console.log("queue");
    console.log(this.state.editMode);
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
          <SortableVirtualList
            getRef={this.registerListRef}
            queue={this.state.queue}
            onSortEnd={this.onSortEnd}
            onRemove={this.props.onRemove}
            onPlay={this.props.onPlay}
            editMode={this.state.editMode}
          />
        </Container>
      </div>
    );
  }
}
/*  {this.state.editMode ? (
            <SortableList
              key={"ssss"}
              queue={this.state.queue}
              onSortEnd={this.onSortEnd}
            />
          ) : (
            <FlipMove>
              {queue.map(
                ({
                  title,
                  publishedAt,
                  channelTitle,
                  videoId,
                  thumbnail,
                  uniqueId,
                  duration
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
                    duration={duration}
                  />
                )
              )}
            </FlipMove>
          )}*/
export default Queue;
