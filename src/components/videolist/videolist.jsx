import React, { Component } from "react";
import Videoitem from "./videoitem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../spinner/spinner";
import "./videolist.css";
import "simplebar/dist/simplebar.min.css";
import AlbulModal from "../modal/Modal";
import ArtistModal from "../modal/artistmodal/ArtistModal";
class Videolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      error: this.props.error,
      errorText: this.props.errorText,
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
    console.log(artist);
    this.props.toggleArtistModal(artist);
  };

  render() {
    const items = this.props.items;
    console.log(items);
    return (
      <div id="videolist33">
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
              </CSSTransition>
            );
          }
        )}
      </div>
    );
  }
}
export default Videolist;
