import React, { Component } from "react";
import isEqual from "react-fast-compare";
import { Button, Container } from "reactstrap";

import QueueList from "./queueList";

import { SortableContainer } from "react-sortable-hoc";
import { AutoSizer } from "react-virtualized";
import arrayMove from "array-move";
import "./queue.css";

const SortableVirtualList = SortableContainer(QueueList);
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: this.props.queue,
      editMode: false,
      animation: false,
    };
    this.shuffleQueue = this.shuffleQueue.bind(this);
    this.clearQueue = this.clearQueue.bind(this);
  }
  registerListRef = (listInstance) => {
    this.List = listInstance;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }

    const { queue } = this.state;

    this.setState({
      queue: arrayMove(queue, oldIndex, newIndex),
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
        queue: this.props.queue,
      });
    }
  }
  async shuffleQueue() {
    this.setState({
      animation: true,
    });
    await timeout(200);
    this.props.shuffleQueue();
    this.List.recomputeRowHeights();
    this.List.forceUpdate(); //force list to update
  }
  clearQueue() {
    this.props.clearQueue();
  }

  toggle = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
    this.List.recomputeRowHeights();
    this.List.forceUpdate(); //force list to update
  };

  render() {
    const animation = this.state.animation;
    //console.log("queue");
    //console.log(this.state.editMode);
    return (
      <div className="queueList">
        {this.props.queue[0] ? (
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
            <span>
              {" "}
              <span>Queue</span>
            </span>
            <br />
            <br />
            <div
              onAnimationEnd={() => this.setState({ animation: false })}
              className={animation ? "animation" : "queue"}
            >
              <AutoSizer disableHeight>
                {({ width }) => (
                  <SortableVirtualList
                    getRef={this.registerListRef}
                    queue={this.state.queue}
                    onSortEnd={this.onSortEnd}
                    onRemove={this.props.onRemove}
                    onPlay={this.props.onPlay}
                    editMode={this.state.editMode}
                    width={width}
                    pressDelay={120}
                  />
                )}
              </AutoSizer>
            </div>
          </Container>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Queue;
