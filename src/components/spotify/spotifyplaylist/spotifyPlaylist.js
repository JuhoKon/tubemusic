import React, { Component } from "react";
import SpotifyItem from "./spotifPlaylistitem";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../../spinner/spinner";
import "./spotifyPlaylist.css";
class SpotifyPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      userPlaylists: this.props.Userplaylists
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        loading: this.props.loading,
        userPlaylists: this.props.Userplaylists
      });
    }
  }

  render() {
    const userPlaylists = this.state.userPlaylists;
    //console.log(userPlaylists);
    return (
      <div>
        <p>
          Click on a playlist to see what songs there are, and to choose which
          songs will be imported.
        </p>
        <div id="spotifyPlaylist">
          {this.state.loading ? (
            <div className="loadingPlace">
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              {userPlaylists.map(
                ({
                  id,
                  name,
                  description,
                  imageUrl,
                  trackRef,
                  totalTracks,
                  ownerName
                }) => (
                  <SpotifyItem
                    description={description}
                    imageUrl={imageUrl}
                    name={name}
                    id={id}
                    key={id}
                    trackRef={trackRef}
                    totalTracks={totalTracks}
                    ownerName={ownerName}
                    token={this.props.token}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default SpotifyPlaylist;
