import React, { Component } from "react";
import ReactPlayer from "react-player";
import isEqual from "react-fast-compare";
import { Container } from "reactstrap";
import "./player.css";
//TODO: ADD VOLUME CONTROL
//CHANGE BUTTONS TO LOOK BETTER
//ADD DATABASE
// ADD PLAYLISTS!!
export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.url,
      title: "",
      pip: false,
      playing: false,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      duration: 0,
      played: 0,
      loaded: 0,
      playbackRate: 1.0,
      loop: false,
      array: this.props.array
    };
  }
  //tee se seek siitä reactplayher demosta, ja vaa sillee et set to 0, kun url on sama tai jotai
  //tai siis set to 0, kun kutsutaan jotakin, ja sitä kutsutaan, kun vaihdetaan biisiä.?
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    });
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        url: this.props.url,
        array: this.props.array,
        playing: this.props.playing
      });
    }
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };
  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };
  handlePlayNext = () => {
    console.log("onPlay");

    if (typeof this.state.array[0] !== "undefined") {
      const videoId = this.state.array[0].videoId;
      const url = "https://www.youtube.com/watch?v=" + videoId;
      this.setState({
        playing: true,
        url: url,
        title: this.state.array[0].title
      });
      this.props.onRemove(this.state.array[0]); //removes from queue
    } else {
      this.setState({
        playing: false,
        url: null
      });
    }

    //this.props.onRemove(this.state.array[0]); //removes from queue
  };
  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  handleEnded = () => {
    console.log("onEnded");
    this.setState({ playing: false });
    this.handlePlayNext();
  };
  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };
  ref = player => {
    this.player = player;
  };
  render() {
    const { url, playing, volume, array } = this.state;
    console.log(this.state.url);
    //console.log(array);
    return (
      <Container className="container-fluid">
        <div className="app">
          <section className="section">
            <p>Now playing {this.state.title}</p>

            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                width="100%"
                height="100%"
                url={this.state.url}
                playing={playing}
                controls={true}
                volume={volume}
                onPlay={this.handlePlay}
                onPause={this.handlePause}
                onEnded={this.handleEnded}
                onError={e => console.log("onError", e)}
              />
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Controls</th>
                  <td>
                    <button onClick={this.handlePlayPause}>
                      {playing ? "Pause" : "Play"}
                    </button>
                    <button onClick={this.handlePlayNext}>
                      Play from queue
                    </button>
                    <button onClick={this.handleEnded}>Play next song</button>
                  </td>
                </tr>
                <tr>
                  <th>Custom URL</th>
                  <td>
                    <input
                      ref={input => {
                        this.urlInput = input;
                      }}
                      type="text"
                      placeholder="Enter URL"
                    />
                    <button
                      onClick={() =>
                        this.setState({ url: this.urlInput.value })
                      }
                    >
                      Load
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </Container>
    );
  }
}
