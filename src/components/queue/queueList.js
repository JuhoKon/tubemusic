import React, { Component } from "react";
import { sortableElement } from "react-sortable-hoc";
import Queueitem from "./queueitem";
import { List } from "react-virtualized";

import "./queue.css";
//example from https://github.com/clauderic/react-sortable-hoc/blob/master/examples/react-virtualized.js#L12

const SortableItem = sortableElement(
  ({
    uniqueId,
    title,
    thumbnail,
    channelTitle,
    publishedAt,
    videoId,
    duration,
    onRemove,
    onPlay,
    editMode,
  }) => (
    <Queueitem
      key={uniqueId}
      uniqueId={uniqueId}
      title={title}
      thumbnail={thumbnail}
      channelTitle={channelTitle}
      publishedAt={publishedAt}
      videoId={videoId}
      onRemove={onRemove}
      onPlay={onPlay}
      duration={duration}
      editMode={editMode}
    />
  )
);
export default class QueueList extends Component {
  renderRow = ({ index, style }) => {
    const queue = this.props.queue;
    console.log(queue);
    const {
      title,
      publishedAt,
      channelTitle,
      videoId,
      thumbnail,
      uniqueId,
      duration,
    } = queue[index];
    //const { value } = items[index];
    return (
      <div key={uniqueId} style={style}>
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
          duration={duration}
          editMode={this.props.editMode}
        />
      </div>
    );
  };

  render() {
    const { getRef } = this.props;
    const queue = this.props.queue;
    return (
      <List
        ref={getRef}
        rowHeight={82}
        rowRenderer={this.renderRow}
        rowCount={queue.length}
        width={this.props.width}
        height={250}
      />
    );
  }
}
