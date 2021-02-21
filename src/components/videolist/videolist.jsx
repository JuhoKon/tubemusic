import React, { Component } from "react";
import Videoitem from "./videoitem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../spinner/spinner";
import "./videolist.css";
import "simplebar/dist/simplebar.min.css";
import AlbulModal from "../modal/Modal";
import ArtistModal from "../modal/artistmodal/ArtistModal";
import { Menu, Item, Separator, Submenu, contextMenu } from "react-contexify";

const MyAwesomeMenu = (props) => {
  return (
    <Menu id="menu_id2">
      <Item
        onClick={({ props }) => {
          props.onPlay(props);
        }}
      >
        Play song
      </Item>
      <Item
        onClick={({ props }) => {
          props.onAdd(props);
        }}
      >
        Add to Queue
      </Item>
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
                onClick={({ props }) =>
                  props.addSongToPlaylist(props, playlist._id)
                }
              >
                {playlist.name}
              </Item>
            );
          })}
      </Submenu>
    </Menu>
  );
};

class Videolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      error: this.props.error,
      errorText: this.props.errorText,
      playlists: [],
      album: [],
      artists: [],
      showModal: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        loading: this.props.loading,
        error: this.props.error,
        errorText: this.props.errorText,
        playlists: this.props.playlists,
      });
    }
  }
  toggleArtistModal = (props) => {
    this.setState({
      showArtistModal: !this.state.showArtistModal,
      artistAlbums: props.albums,
      artistDescription: props.description,
      artistSongs: props.songs,
      artistSubscribers: props.subscribers,
      artistThumbnails: props.thumbnails,
      artistViews: props.views,
      artistSingles: props.singles,
      artistName: props.artist,
      artist: true,
    });
  };
  toggleAlbumModal = (props) => {
    this.setState({
      showModal: !this.state.showModal,
      albumBrowseId: props.browseId,
      albumThumbnails: props.thumbnails,
      albumTitle: props.title,
      albumYear: props.year,
      artist: false,
    });
  };
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  toggleArtistModal2 = () => {
    this.setState({
      showArtistModal: !this.state.showArtistModal,
    });
  };

  toggleArtistModalItem = async (artist) => {
    this.props.toggleArtistModal(artist);
  };
  handleContextMenu(e, props) {
    e.preventDefault();
    this.setState({
      artists: props.artists,
      album: props.album,
    });
    contextMenu.show({
      id: "menu_id2",
      event: e,
      props: props,
    });
  }
  render() {
    const items = this.props.items;

    return (
      <div id="videolist33">
        <MyAwesomeMenu
          artists={this.state.artists}
          album={this.state.album}
          playlists={this.props.playlists}
        />
        <AlbulModal
          show={this.state.showModal}
          toggleModal={this.toggleModal}
          artist={this.state.artist}
          albumBrowseId={this.state.albumBrowseId}
          albumThumbnails={this.state.albumThumbnails}
          albumTitle={this.state.albumTitle}
          albumYear={this.state.albumYear}
          addFunc={this.props.onAdd}
          onPlay={this.props.onPlay}
          addPlaylistToQueue={this.props.addPlaylistToQueue}
          playPlaylist={this.props.playPlaylist}
          playNext={this.props.playNext}
          playlists={this.props.playlists}
          AddToPlaylist={this.props.AddToPlaylist}
          loadPlaylist={this.props.loadPlaylist}
          makePlaylist={this.props.makePlaylist}
          toggleArtistModal={this.props.toggleArtistModal}
        />
        <ArtistModal
          show={this.state.showArtistModal}
          toggleModal={this.toggleArtistModal2}
          artistAlbums={this.state.artistAlbums}
          artistSingles={this.state.artistSingles}
          artistName={this.state.artistName}
          artistDescription={this.state.artistDescription}
          artistSongs={this.state.artistSongs}
          artistSubscribers={this.state.artistSubscribers}
          artistThumbnails={this.state.artistThumbnails}
          artistViews={this.state.artistViews}
          artist={this.state.artist}
          addFunc={this.props.onAdd}
          onPlay={this.props.onPlay}
          addPlaylistToQueue={this.props.addPlaylistToQueue}
          playPlaylist={this.props.playPlaylist}
          playNext={this.props.playNext}
          playlists={this.props.playlists}
          AddToPlaylist={this.props.AddToPlaylist}
          loadPlaylist={this.props.loadPlaylist}
          toggleAlbumModal={this.toggleAlbumModal}
        />
        {this.state.loading ? (
          <div className="loadingPlace">
            <LoadingSpinner color="#545454" />
          </div>
        ) : null}
        {this.state.error ? <span>{this.state.errorText}</span> : ""}

        {items.map(
          ({
            title,
            publishedAt,
            channelTitle,
            videoId,
            thumbnail,
            uniqueId,
            duration,
            thumbnails,
            artists,
            resultType,
            artist,
            browseId,
            album,
          }) => {
            return (
              <CSSTransition key={uniqueId} timeout={500} classNames="fade">
                <div
                  onContextMenu={(event) => {
                    if (resultType !== "song") return;
                    this.handleContextMenu(event, {
                      onDeleteFromPlaylist: null,
                      playNext: this.props.playNext,
                      onAdd: this.props.onAdd,
                      onPlay: this.props.onPlay,
                      toggleArtistModal: this.toggleArtistModalItem,
                      toggleAlbumModal: this.props.toggleAlbumModal,
                      videoId: videoId,
                      title: title,
                      publishedAt: publishedAt,
                      uniqueId: videoId + Math.random(),
                      duration: duration,
                      thumbnails: thumbnails,
                      thumbnail: thumbnail && thumbnail,
                      artists: artists,
                      album: album,
                      addSongToPlaylist: this.props.addSongToPlaylist,
                    });
                  }}
                  key={this.props.uniqueId}
                >
                  <Videoitem
                    playNext={this.props.playNext}
                    uniqueId={uniqueId}
                    title={title}
                    thumbnail={thumbnail && thumbnail}
                    channelTitle={channelTitle}
                    publishedAt={publishedAt}
                    videoId={videoId}
                    addFunc={this.props.onAdd}
                    onPlay={this.props.onPlay}
                    AddToPlaylist={this.props.AddToPlaylist}
                    duration={duration}
                    artists={artists}
                    resultType={resultType}
                    artist={artist}
                    browseId={browseId}
                    thumbnails={thumbnails}
                    toggleAlbumModal={this.toggleAlbumModal}
                    toggleArtistModal={this.toggleArtistModal}
                    toggleArtistModalItem={this.toggleArtistModalItem}
                    album={album}
                  />
                </div>
              </CSSTransition>
            );
          }
        )}
      </div>
    );
  }
}
export default Videolist;
