import React, { Component } from "react";
import { sortableElement } from "react-sortable-hoc";
import Playlistitem from "./playlistitem";
import { List, AutoSizer } from "react-virtualized";

//example from https://github.com/clauderic/react-sortable-hoc/blob/master/examples/react-virtualized.js#L12

const SortableItem = sortableElement(
  ({
    uniqueId,
    title,
    publishedAt,
    videoId,
    onAdd,
    onPlay,
    onDeleteFromPlaylist,
    duration,
    onRemove,
    editMode
  }) => (
    <Playlistitem
      key={uniqueId}
      uniqueId={uniqueId}
      title={title}
      videoId={videoId}
      addFunc={onAdd}
      onPlay={onPlay}
      onDeleteFromPlaylist={onDeleteFromPlaylist}
      onRemove={onRemove}
      duration={duration}
      publishedAt={publishedAt}
      editMode={editMode}
    />
  )
);
export default class PlaylistItemsList extends Component {
  renderRow = ({ index, key, isScrolling, isVisible, style }) => {
    const playlist = this.props.playlist;
    const { title, publishedAt, videoId, uniqueId, duration } = playlist[index];
    //const { value } = items[index];
    return (
      <div key={uniqueId} style={style}>
        <SortableItem
          index={index}
          key={uniqueId}
          uniqueId={uniqueId}
          title={title}
          videoId={videoId}
          onAdd={this.props.onAdd}
          onPlay={this.props.onPlay}
          onDeleteFromPlaylist={this.props.onDeleteFromPlaylist}
          onRemove={this.props.onRemove}
          duration={duration}
          publishedAt={publishedAt}
          editMode={this.props.editMode}
        />
      </div>
    );
  };

  render() {
    console.log(this.props);
    const { getRef } = this.props;
    const playlist = this.props.playlist;
    return (
      <List
        ref={getRef}
        rowHeight={82}
        rowRenderer={this.renderRow}
        rowCount={playlist.length}
        width={600}
        height={800}
      />
    );
  }
}