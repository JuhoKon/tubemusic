import React, { Component } from "react";
import ReactPlayer from "react-player";
import isEqual from "react-fast-compare";
import { Container } from "reactstrap";
import { Button } from "reactstrap";
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
      title: this.props.title,
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
        playing: this.props.playing,
        title: this.props.title
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
      if (url === this.state.url) {
        this.player.seekTo(0); //Seeks to 0 incase of having same url
      }
      this.setState({
        playing: true,
        url: url,
        title: this.state.array[0].title
      });
      this.props.onRemove(this.state.array[0]); //removes item from queue
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
  seekTo0() {
    this.player.seekTo(0); //Seeks to 0
  }
  render() {
    const { url, playing, volume, array } = this.state;
    console.log(this.state.url);
    console.log(this.state.title);
    return (
      <Container className="container-fluid">
        <div className="app">
          <section className="section">
            <p>Now playing {this.state.title}</p>

            <div className="player-wrapper">
              <ReactPlayer
                ref={this.ref}
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
                  <td>
                    <Button
                      className="btn-controls"
                      onClick={this.handlePlayPause}
                    >
                      {playing ? "Pause" : "Play"}
                    </Button>
                    <Button
                      className="btn-controls"
                      onClick={this.handlePlayNext}
                    >
                      Play from queue
                    </Button>
                    <Button className="btn-controls" onClick={this.handleEnded}>
                      Play next song
                    </Button>
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
