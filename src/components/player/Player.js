import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./player.css";
export default class Player extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  };
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
  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };
  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  handleEnded = () => {
    console.log("onEnded");
    this.setState({ playing: this.state.loop });
  };
  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };
  ref = player => {
    this.player = player;
  };
  render() {
    const { url, playing, volume } = this.state;
    return (
      <div className="app">
        <section className="section">
          <h1>Player</h1>

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
