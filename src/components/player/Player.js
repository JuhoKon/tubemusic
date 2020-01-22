import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./player.css";
export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      title: "",
      pip: false,
      playing: false,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      array: this.props.array
    };
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
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
    } else {
      this.setState({
        playing: false,
        url: null
      });
    }

    this.props.onRemove(this.state.array[0]); //removes from queue
  };
  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  handleEnded = () => {
    console.log("onEnded");
    this.handlePlayNext();

    //this.setState({ playing: this.state.loop });

    //ADD to it takes one away from queue?
    //otetaa eka elementti jonosta toho urlii, jos loppuu ni poistetaa eka elementti
    //laitetaa statee ni renderaa uudestaa?
  };
  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };
  ref = player => {
    this.player = player;
  };
  render() {
    const { url, playing, volume, array } = this.state;
    console.log(array);
    return (
      <div className="app">
        <section className="section">
          <p>Now playing {this.state.title}</p>

          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              width="100%"
              height="100%"
              url={url}
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
                  <button onClick={this.handleStop}>Stop</button>
                  <button onClick={this.handlePlayPause}>
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button onClick={this.handlePlayNext}>Play from queue</button>
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
                    onClick={() => this.setState({ url: this.urlInput.value })}
                  >
                    Load
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}
