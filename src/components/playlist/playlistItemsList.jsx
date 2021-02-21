import React, { Component } from "react";
import { sortableElement } from "react-sortable-hoc";
import Playlistitem from "./playlistitem";
import { List } from "react-virtualized";
import { Menu, Item, Separator, Submenu, contextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import isEqual from "react-fast-compare";

//example from https://github.com/clauderic/react-sortable-hoc/blob/master/examples/react-virtualized.js#L12
const MyAwesomeMenu = (props) => {
  return (
    <Menu id="menu_id">
      <Item
        onClick={({ props }) => {
          props.onPlay(props);
        }}
      >
        Play song
      </Item>
      <Item onClick={({ props }) => props.onAdd(props)}>Add to Queue</Item>
      <Item onClick={({ props }) => props.playNext(props)}>Play next</Item>
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
          props.playlists.map((playlist, index) => {
            return (
              <Item
                key={index}
                onClick={({ props }) => {
                  props.addSongToPlaylist(props, playlist._id);
                }}
              >
                {playlist.name}
              </Item>
            );
          })}
      </Submenu>
      <Separator />
      <Item
        onClick={async ({ props }) => {
          //console.log(props);

          await props.onDeleteFromPlaylist(props);
          props.UpdateCurrentPlaylist2();
        }}
      >
        Remove from this Playlist (del)
      </Item>
    </Menu>
  );
};

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
    editMode,
    playNext,
    thumbnail,
    artists,
    toggleArtistModal,
    album,
    toggleAlbumModal,
    setSelected,
    selected,
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
      playNext={playNext}
      thumbnail={thumbnail && thumbnail}
      artists={artists}
      toggleArtistModal={toggleArtistModal}
      album={album}
      toggleAlbumModal={toggleAlbumModal}
      setSelected={setSelected}
      selected={selected}
    />
  )
);

export default class PlaylistItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: this.props.playlists,
      artists: [],
      album: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlists: this.props.playlists,
      });
    }
  }
  handleContextMenu(e, props) {
    e.preventDefault();
    this.setState({
      artists: props.artists,
      album: props.album,
    });
    contextMenu.show({
      id: "menu_id",
      event: e,
      props: props,
    });
  }
  renderRow = ({ index, style }) => {
    const playlist = this.props.playlist;
    /*    console.log(playlist); */
    const {
      title,
      publishedAt,
      videoId,
      uniqueId,
      duration,
      thumbnail,
      artists,
      album,
    } = playlist[index];
    const a = Math.random();
    return (
      <div
        onContextMenu={(event) =>
          this.handleContextMenu(event, {
            onDeleteFromPlaylist: this.props.onDeleteFromPlaylist,
            playNext: this.props.playNext,
            onAdd: this.props.onAdd,
            onPlay: this.props.onPlay,
            toggleArtistModal: this.props.toggleArtistModal,
            toggleAlbumModal: this.props.toggleAlbumModal,
            UpdateCurrentPlaylist2: this.props.UpdateCurrentPlaylist2,
            addSongToPlaylist: this.props.addSongToPlaylist,
            videoId,
            title,
            publishedAt,
            uniqueId,
            duration,
            thumbnail,
            artists,
            album,
          })
        }
        key={a}
        style={style}
      >
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
          playNext={this.props.playNext}
          thumbnail={thumbnail && thumbnail}
          artists={artists}
          toggleArtistModal={this.props.toggleArtistModal}
          toggleAlbumModal={this.props.toggleAlbumModal}
          UpdateCurrentPlaylist2={this.props.UpdateCurrentPlaylist2}
          setSelected={this.props.setSelected}
          album={album}
          selected={this.props.selected}
        />
      </div>
    );
  };

  render() {
    //console.log(this.props);
    const { getRef } = this.props;
    const playlist = this.props.playlist;
    return (
      <>
        <List
          ref={getRef}
          rowHeight={82}
          rowRenderer={this.renderRow}
          rowCount={playlist.length}
          width={this.props.width}
          height={500}
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
