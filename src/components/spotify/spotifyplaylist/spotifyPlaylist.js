import React, { Component } from "react";
import SpotifyItem from "./spotifPlaylistitem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../../spinner/spinner";

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
    //console.log(this.state);
    /*  <div>
            {userPlaylists.map(({ id }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <SpotifyItem id={id} />
              </CSSTransition>
            ))}
          </div>*/
    const userPlaylists = this.state.userPlaylists;
    console.log(userPlaylists);
    return (
      <div>
        <p>
          Click on a playlist to see what songs there are, and to import it :)
        </p>
        <div id="videolist">
          {this.state.loading ? (
            <div className="loadingPlace">
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              {userPlaylists.map(({ id, name }) => (
                <SpotifyItem name={name} key={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default SpotifyPlaylist;
