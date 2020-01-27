import React, { Component } from "react";
import ReactPlayer from "react-player";
import isEqual from "react-fast-compare";
import { Container, Input, CustomInput, FormGroup, Label } from "reactstrap";
import { Button } from "reactstrap";
import HistoryModal from "./history/History-modal";

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
      history: []
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
        playing: this.props.playing,
        title: this.props.title
      });
      if (this.props.url !== prevProps.url) {
        if (typeof prevProps.url !== "undefined" && prevProps.url !== null) {
          let itemObject = {};
          console.log(prevProps);
          itemObject["title"] = prevProps.title;
          itemObject["url"] = prevProps.url;
          if (itemObject["url"] === null) {
            return;
          }
          this.addToHistory(itemObject);
        }
      }
    }
  }
  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
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
    this.state.history.unshift(item);
    console.log(this.state.history);
  };
  handlePlayNext = () => {
    console.log("onPlay");
    let itemObject = {};
    itemObject["title"] = this.state.title;
    itemObject["url"] = this.state.url;
    if (itemObject["url"] !== null) {
      this.addToHistory(itemObject);
    }

    if (typeof this.state.array[0] !== "undefined") {
      const videoId = this.state.array[0].videoId;
      const url = "https://www.youtube.com/watch?v=" + videoId;
      console.log(url);
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
    const { url, playing, volume, array, history } = this.state;
    console.log(history);

    //console.log(this.state.url);
    //console.log(this.state.title);
    return (
      <div>
        <section className="section">
          <p>Now playing {this.state.title}</p>

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
                  onPlay={this.props.onPlay}
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
                          className="btn-controls"
                          onClick={this.handlePlayPause}
                        >
                          {playing ? "Pause" : "Play"}
                        </Button>

                        <Button
                          disabled={this.props.array[0] ? false : true}
                          className="btn-controls"
                          onClick={this.handleEnded}
                        >
                          Play from queue
                        </Button>
                        <Button
                          disabled={this.props.array[0] ? false : true}
                          className="btn-controls"
                          onClick={this.handleEnded}
                        >
                          Play next song
                        </Button>
                        <Button
                          disabled={this.state.history[0] ? false : true}
                          className="btn-controls float-right"
                          onClick={this.toggle}
                        >
                          History
                        </Button>
                        <HistoryModal
                          isOpen={this.state.modal}
                          toggle={this.toggle}
                          history={this.state.history}
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
