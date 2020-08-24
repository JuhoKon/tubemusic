import React, { Component } from "react";
import { sortableElement } from "react-sortable-hoc";
import Queueitem from "./queueitem";
import { List } from "react-virtualized";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  MenuProvider,
  contextMenu,
} from "react-contexify";
import isEqual from "react-fast-compare";
import "./queue.css";
//example from https://github.com/clauderic/react-sortable-hoc/blob/master/examples/react-virtualized.js#L12
const MyAwesomeMenu = (props) => {
  console.log(props);
  return (
    <Menu id="menu_id3">
      <Item
        onClick={({ props }) => {
          props.onPlay(props);
        }}
      >
        Play song
      </Item>
      <Separator />
      <Submenu label="Go to Artist" disabled={!props.artists}>
        {props.artists &&
          props.artists.map((artist) => (
            <Item
              onClick={({ props }) =>
                props.toggleArtistModal({ name: artist.name, id: artist.id })
              }
            >
              {artist.name}
            </Item>
          ))}
      </Submenu>
      <Item
        disabled={!props.album}
        onClick={({ props }) => {
          if (props.album) {
            props.toggleAlbumModal({
              artist: props.artists[0].name,
              browseId: props.album.id,
              type: "Album",
              thumbnails: [
                { height: 60, url: props.thumbnail },
                { height: 60, url: props.thumbnail },
              ],
              title: props.album.name,
            });
          }
        }}
      >
        Go to Album
      </Item>

      <Separator />
      <Submenu label="Add to playlist">
        {props.playlists &&
          props.playlists.map((playlist) => {
            return (
              <Item
                onClick={({ props }) => {
                  props.addSongToPlaylist(props, playlist._id);
                }}
              >
                {playlist.name}
              </Item>
            );
          })}
      </Submenu>
    </Menu>
  );
};

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
    artists,
    album,
    toggleArtistModalItem,
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
      artists={artists}
      album={album}
      toggleArtistModalItem={toggleArtistModalItem}
    />
  )
);
export default class QueueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: this.props.playlists,
      artists: [],
      album: [],
    };
  }
  handleContextMenu(e, props) {
    console.log("HANDLECONTEXT");
    e.preventDefault();
    this.setState({
      artists: props.artists,
      album: props.album,
    });
    contextMenu.show({
      id: "menu_id3",
      event: e,
      props: props,
    });
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlists: this.props.playlists,
      });
    }
  }
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
      artists,
      album,
    } = queue[index];
    //const { value } = items[index];
    return (
      <div
        onContextMenu={(event) =>
          this.handleContextMenu(event, {
            addSongToPlaylist: this.props.addSongToPlaylist,
            onDeleteFromPlaylist: this.props.onDeleteFromPlaylist,
            playNext: this.props.playNext,
            onAdd: this.props.onAdd,
            onPlay: this.props.onPlay,
            playNext: this.props.playNext,
            artists: artists,
            toggleArtistModal: this.props.toggleArtistModalItem,
            toggleAlbumModal: this.props.toggleAlbumModal,
            album: album,
            UpdateCurrentPlaylist2: this.props.UpdateCurrentPlaylist2,
            addSongToPlaylist: this.props.addSongToPlaylist,
            videoId,
            title,
            publishedAt,
            uniqueId,
            duration,
            thumbnail,
            album,
          })
        }
        key={uniqueId}
        style={style}
      >
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
          toggleArtistModalItem={this.props.toggleArtistModalItem}
          artists={artists}
          album={album}
        />
      </div>
    );
  };

  render() {
    const { getRef } = this.props;
    const queue = this.props.queue;
    return (
      <>
        <List
          ref={getRef}
          rowHeight={82}
          rowRenderer={this.renderRow}
          rowCount={queue.length}
          width={this.props.width}
          height={250}
        />
        <MyAwesomeMenu
          artists={this.state.artists}
          playlists={this.state.playlists}
          album={this.state.album}
        />
      </>
    );
  }
}
