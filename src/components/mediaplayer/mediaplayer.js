import React, { Component } from "react";
import ReactPlayer from "react-player";
import isEqual from "react-fast-compare";
import toaster from "toasted-notes";
import {
  Container,
  CustomInput,
  FormGroup,
  Label,
  Tooltip,
  Row,
  Col,
} from "reactstrap";
import { Button } from "reactstrap";
import ScrollText from "react-scroll-text";
import HistoryModal from "../player/history/History-modal";
import { setTitle } from "../functions/functions";
import Duration from "./duration";
import "./mediaplayer.css";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//TODO: ADD VOLUME CONTROL
//CHANGE BUTTONS TO LOOK BETTER
//ADD DATABASE
// ADD PLAYLISTS!!

export default class MediaPlayer extends Component {
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
      history: [], //TODO: joku raja tälle
      tooltipOpen: false,
      duration: 0,
    };
  }
  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        url: this.props.url,
        array: this.props.array,
        title: this.props.title,
        playing: this.props.playing,
      });
      setTitle(this.props.title); //setting document title
      if (this.props.url !== prevProps.url) {
        if (typeof prevProps.url !== "undefined" && prevProps.url !== null) {
          let itemObject = {};
          console.log(prevProps);
          console.log(this.props);
          itemObject["title"] = prevProps.title || "error";
          itemObject["url"] = prevProps.url;
          itemObject["duration"] = prevProps.duration;
          //TODO millon tehty
          if (itemObject["url"] === null) {
            return;
          }
          //this.addToHistory(itemObject);
        }
      }
    }
  }
  clearHistory = () => {
    this.setState({
      history: [],
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
  addToHistory = (item) => {
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
        title: this.state.array[0].title,
      });
      toaster.notify(<span>Now playing: {this.state.array[0].title}</span>, {
        duration: 1200,
      });
      this.props.onRemove(this.state.array[0]); //removes item from queue
      this.props.setUrl(url);
    } else {
      this.setState({
        playing: false,
        url: null,
      });
    }

    //this.props.onRemove(this.state.array[0]); //removes from queue
  };
  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  handleEnded = () => {
    console.log("onEnded");
    //this.setState({ playing: false });
    if (this.state.url !== null) {
      let itemObject = {};
      itemObject["title"] = this.state.title || "error";
      itemObject["url"] = this.state.url;
      itemObject["duration"] = this.state.duration;
      this.addToHistory(itemObject);
    }
    this.handlePlayNext();
  };
  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };
  ref = (player) => {
    this.player = player;
  };
  seekTo0() {
    this.player.seekTo(0); //Seeks to 0
  }
  toggletip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };
  handleStartOver = () => {
    this.seekTo0();
  };
  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };
  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };
  handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  /* TODO: add responsiveness to the mediaplayer. Add all elements to a row and columns. Positioning with display:relative and top:10% etc. */
  /* Tooltip is not working correctly. Fix it !*/
  render() {
    const { playing, volume, duration, played } = this.state;
    return (
      <div className="MediaPlayerdiv">
        <Row>
          <Col sm="3">
            {this.state.title && this.state.title.length > 26 ? (
              <span className="marquee">
                <span>{this.state.title}</span>
                <span>{this.state.title}</span>
              </span>
            ) : (
              <p className="titleplaying">{this.state.title}</p>
            )}

            <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen}
              target="TooltipExample"
              toggle={this.toggletip}
            >
              {this.state.title}
            </Tooltip>
            <div className="testi123" id="TooltipExample">
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
                onError={this.handlePlayNext}
                onDuration={this.handleDuration}
                onProgress={this.handleProgress}

                //{(e) => console.log("onError", e)}
              />
            </div>
          </Col>
          <Col sm="6">
            <div className="playercontrols">
              <div className="buttonit">
                {playing ? (
                  <div className="buttonArea" onClick={this.handlePlayPause}>
                    <FontAwesomeIcon size={"lg"} icon={faPause} />
                  </div>
                ) : (
                  <div
                    className="buttonArea"
                    disabled={this.props.array[0] ? false : true}
                    onClick={this.handlePlayPause}
                  >
                    <FontAwesomeIcon size={"lg"} icon={faPlay} />
                  </div>
                )}
                <div className="buttonArea2" onClick={this.handleEnded}>
                  <FontAwesomeIcon size={"lg"} icon={faForward} />
                </div>
                <div className="buttonArea3" onClick={this.handleStartOver}>
                  <FontAwesomeIcon size={"lg"} icon={faBackward} />
                </div>
              </div>
              <Row>
                <Col sm="2">
                  {" "}
                  <div className="elapsedTime float-right">
                    <Duration seconds={duration * played} />
                  </div>
                </Col>
                <Col sm="8">
                  <div className="durationcontrol">
                    <CustomInput
                      type="range"
                      id="exampleCustomRange"
                      name="customRange"
                      type="range"
                      min={0}
                      max={0.999999}
                      step="any"
                      value={played}
                      onMouseDown={this.handleSeekMouseDown}
                      onChange={this.handleSeekChange}
                      onMouseUp={this.handleSeekMouseUp}
                    />
                  </div>
                </Col>
                <Col sm="2">
                  {" "}
                  <div className="durationOfSong float-left">
                    <Duration seconds={duration} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm="3">
            <div className="volumeiconcontrols">
              <div className="volumecontrol">
                {/* tänne ääni iconi*/}
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
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <tr>
            <th>remaining</th>
            <td>
              <Duration seconds={duration * (1 - played)} />
            </td>
          </tr>
        </div>
      </div>
    );
  }
}
