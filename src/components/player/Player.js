import React, { Component } from "react";
import ReactPlayer from "react-player";
import isEqual from "react-fast-compare";
import toaster from "toasted-notes";
import { Container, CustomInput, FormGroup, Label } from "reactstrap";
import { Button } from "reactstrap";

import HistoryModal from "./history/History-modal";
import { setTitle } from "../functions/functions";
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
      controls: true,
      light: false,
      volume: 0.5, //<--
      muted: false,
      duration: 0,
      played: 0,
      loaded: 0,
      playbackRate: 1.0,
      loop: false,
      array: this.props.array,
      modal: false,
      history: [] //TODO: joku raja tälle
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
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        url: this.props.url,
        array: this.props.array,
        title: this.props.title,
        playing: this.props.playing
      });
      setTitle(this.props.title); //setting document title
      if (this.props.url !== prevProps.url) {
        if (typeof prevProps.url !== "undefined" && prevProps.url !== null) {
          let itemObject = {};
          console.log(prevProps);
          itemObject["title"] = prevProps.title;
          itemObject["url"] = prevProps.url;
          itemObject["duration"] = prevProps.duration;
          //TODO millon tehty
          if (itemObject["url"] === null) {
            return;
          }
          this.addToHistory(itemObject);
        }
      }
    }
  }
  clearHistory = () => {
    this.setState({
      history: []
    });
  };
  handlePlayPause = () => {
    const playing = this.state.playing;
    this.setState({ playing: !this.state.playing });
    this.props.setPlaying(!playing);

    if (this.state.url === null && !this.state.playing) {
      this.handlePlayNext();
    }
  };
  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
    if (this.state.url === null) {
      this.handlePlayNext();
    }
  };
  addToHistory = item => {
    //Adds item to history array
    this.state.history.unshift(item);
    //console.log(this.state.history);
  };
  handlePlayNext = () => {
    console.log("onPlay");
    if (typeof this.state.array[0] !== "undefined") {
      this.props.setTitle(this.state.array[0].title);
      const videoId = this.state.array[0].videoId;
      const url = "https://www.youtube.com/watch?v=" + videoId;
      //console.log(url);
      if (url === this.state.url) {
        this.player.seekTo(0); //Seeks to 0 incase of having same url
      }
      this.setState({
        playing: true,
        url: url,
        title: this.state.array[0].title
      });
      this.props.onRemove(this.state.array[0]); //removes item from queue
      this.props.setUrl(url);
      toaster.notify(<span>Now playing: {this.state.title}</span>, {
        duration: 1200,
        position: "bottom-left"
      });
    } else {
      this.setState({
        playing: false,
        url: null
      });
    }

    //this.props.onRemove(this.state.array[0]); //removes from queue
  };
  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  handleEnded = () => {
    console.log("onEnded");
    //this.setState({ playing: false });
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
    console.log("player");
    const { playing, volume } = this.state;
    //console.log(this.state.array);

    //console.log(this.state.url);
    //console.log(this.state.title);
    return (
      <div>
        <section className="section">
          <p>Now playing: {this.state.title}</p>

          <Container className="container-fluid">
            <div className="app">
              <div className="player-wrapper">
                <ReactPlayer
                  ref={this.ref}
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={this.state.url}
                  playing={playing}
                  controls={this.state.controls}
                  volume={volume}
                  onPlay={this.handlePlay}
                  onPause={this.handlePause}
                  onEnded={this.handleEnded}
                  onError={e => console.log("onError", e)}
                />
              </div>
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <FormGroup>
                        <Button
                          className="btn-controls btn-secondary"
                          onClick={this.handlePlayPause}
                        >
                          {playing ? "Pause" : "Play"}
                        </Button>

                        <Button
                          disabled={this.props.array[0] ? false : true}
                          className="btn-controls btn-secondary"
                          onClick={this.handleEnded}
                        >
                          Play from queue
                        </Button>
                        <Button
                          disabled={this.props.array[0] ? false : true}
                          className="btn-controls btn-secondary"
                          onClick={this.handleEnded}
                        >
                          Play next song
                        </Button>
                        <Button
                          disabled={this.state.history[0] ? false : true}
                          className="btn-controls btn-secondary float-right"
                          onClick={this.toggle}
                        >
                          History
                        </Button>
                        <HistoryModal
                          isOpen={this.state.modal}
                          toggle={this.toggle}
                          history={this.state.history}
                          clearList={this.clearHistory}
                          addFunc={this.props.onAdd}
                          onPlay={this.props.onPlay}
                          AddToPlaylist={this.props.AddToPlaylist}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleCustomRange">Volume control</Label>
                        <CustomInput
                          type="range"
                          id="exampleCustomRange"
                          name="customRange"
                          min={0}
                          max={1}
                          step="any"
                          value={volume}
                          onChange={this.handleVolumeChange}
                        />

                        <p> Use this to change volume.</p>
                      </FormGroup>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      </div>
    );
  }
}
