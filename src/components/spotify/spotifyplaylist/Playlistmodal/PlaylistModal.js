import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Button,
  Row,
  Col,
  Progress
} from "reactstrap";
import isEqual from "react-fast-compare";
import PlaylistModalItem from "./PlaylistModalItem";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import LoadedList from "./loadedList";
import ImportList from "./importList";
import arrayMove from "array-move";
import LoadingSpinner from "../../../spinner/spinner";
import {
  handleSpotifySearchFromYoutube,
  getContentDetails,
  makePlaylist,
  handleScrape
} from "../../../functions/functions";
import "./PlaylistModal.css";
class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props,
      description: this.props.description,
      imageUrl: this.props.imageUrl,
      name: this.props.name,
      id: this.props.id,
      key: this.props.id,
      trackRef: this.props.trackRef,
      totalTracks: this.props.totalTracks,
      ownerName: this.props.ownerName,
      chosenListsTracks: this.props.chosenListsTracks,
      toBeImportedPlaylist: [],
      loading: false,
      imported: false,
      notFoundArray: []
    };
    this.importPlaylistToApp = this.importPlaylistToApp.bind(this);
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.addToImport = this.addToImport.bind(this);
    this.toggle = this.toggle.bind(this);
    this.moveAllToImport = this.moveAllToImport.bind(this);
    this.clearList = this.clearList.bind(this);
    this.webScrape = this.webScrape.bind(this);
  }
  //https://stackoverflow.com/questions/31426740/how-to-return-many-promises-in-a-loop-and-wait-for-them-all-to-do-other-stuff
  //katso tuo
  async webScrape() {
    this.setState({
      loading: true
    });
    let notFoundArray = [];
    let numberOfTracks = this.state.toBeImportedPlaylist.length;
    let step = (1 / numberOfTracks) * 100;
    const tracksFromYoutube = [];
    const tracks = this.state.toBeImportedPlaylist;
    for (let i = 0; i < tracks.length; i++) {
      let artistName = tracks[i].artistName;
      let title = tracks[i].title;
      let term = title + " " + artistName; //need to think about how to improve
      term = term.split(" ").join("+");
      term = unescape(term);
      console.log(term);
      let result = await handleScrape(term);
      if (result) {
        let trackObject = {};
        trackObject["videoId"] = result.videoId;
        trackObject["title"] = result.title;
        trackObject["duration"] = result.duration;
        trackObject["scraped"] = result.scraped;
        trackObject["uniqueId"] = Math.random();
        //console.log(trackObject);
        tracksFromYoutube.push(trackObject);
      } else {
        notFoundArray.push({ artistName: artistName, title: title });
      }
      this.setState({
        progressValue: this.state.progressValue + step
      });
    }
    console.log(notFoundArray);
    //console.log(tracksFromYoutube);
    const name = this.state.name;
    const body = JSON.stringify({ name, playlist: tracksFromYoutube });
    const res = await makePlaylist(body);
    this.setState({
      loading: false,
      notFoundArray: notFoundArray
    });
    if (res.status === 200) {
      this.setState({
        imported: true
      });
    } else {
      this.setState({
        imported: false
      });
      alert("Error");
    }
    console.log(res);

    //tracksFromYoutube <- our playlist*/
  }
  clearList() {
    this.setState({
      toBeImportedPlaylist: []
    });
  }
  moveAllToImport() {
    const chosenListsTracks = this.state.chosenListsTracks;
    chosenListsTracks.map(track => this.addToImport(track)); //need to generate uniqueIDs
  }
  toggle() {
    this.setState({
      toBeImportedPlaylist: []
    });
    this.props.toggle();
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        modal: this.props,
        description: this.props.description,
        imageUrl: this.props.imageUrl,
        name: this.props.name,
        id: this.props.id,
        key: this.props.id,
        trackRef: this.props.trackRef,
        totalTracks: this.props.totalTracks,
        ownerName: this.props.ownerName,
        chosenListsTracks: this.props.chosenListsTracks,
        imported: false,
        progressValue: 0
      });
    }
  }
  async makePlaylist(name, playlist) {
    //API request to create a new playlist (database)
    /*this.setState({
      playlist: playlist
    });*/
    //let playlist = this.state.playlist;
    const item = JSON.stringify({ name, playlist });
    const result = await makePlaylist(item);
    //console.log(result.data._id);
    this.setState({
      playlistId: result.data._id,
      playlistName: result.data.name,
      playlist: playlist
    });
  }
  async importPlaylistToApp() {
    this.setState({
      loading: true
    });
    let numberOfTracks = this.state.toBeImportedPlaylist.length;
    let step = (1 / numberOfTracks) * 100;

    const tracksFromYoutube = [];
    const tracks = this.state.toBeImportedPlaylist;
    for (let i = 0; i < tracks.length; i++) {
      let artistName = tracks[i].artistName;
      let title = tracks[i].title;
      let term = title + " " + artistName; //need to think about how to improve
      let result = await handleSpotifySearchFromYoutube(term);
      if (result === null) {
        this.setState({
          loading: false,
          error: true
        });
        return;
      }
      let trackObject = {};
      trackObject["videoId"] = result[0].id.videoId;
      trackObject["title"] = result[0].snippet.title;
      trackObject["publishedAt"] = result[0].snippet.publishedAt;
      trackObject["description"] = result[0].snippet.description;
      trackObject["channelTitle"] = result[0].snippet.channelTitle;
      const contentDetails = await getContentDetails(result[0].id.videoId);
      trackObject["duration"] = contentDetails[0].contentDetails.duration;
      trackObject["uniqueId"] = Math.random();
      console.log(trackObject);
      tracksFromYoutube.push(trackObject);
      this.setState({
        progressValue: this.state.progressValue + step
      });
    }
    //console.log(tracksFromYoutube);
    const name = this.state.name;
    const body = JSON.stringify({ name, playlist: tracksFromYoutube });
    const res = await makePlaylist(body);
    this.setState({
      loading: false
    });
    if (res.status === 200) {
      this.setState({
        imported: true
      });
    } else {
      this.setState({
        imported: false
      });
      alert("Error");
    }
    console.log(res);

    //tracksFromYoutube <- our playlist*/
  }
  removeFromPlaylist(item) {
    if (!item) return;
    if (typeof this.state.toBeImportedPlaylist[0] === "undefined") return;
    console.log(this.state.toBeImportedPlaylist[0]);
    console.log(item);
    for (let i = 0; i < this.state.toBeImportedPlaylist.length; i++) {
      if (this.state.toBeImportedPlaylist[i].id === item.id) {
        console.log(this.state.toBeImportedPlaylist[i]);
        //delete item from toBeImportedPlaylist
        this.state.toBeImportedPlaylist.splice(i, 1);
        break;
      }
    }
    this.setState({
      updated: item.videoId
    });
  }
  addToImport(item) {
    //console.log(item);
    let song = {};
    song["artistName"] = item.artistName;
    song["title"] = item.title;
    song["id"] = Math.random();
    this.state.toBeImportedPlaylist.push(song);
    this.setState({
      //just to trigger re-rendering
      updated: true
    });
  }

  render() {
    const tracks = this.state.chosenListsTracks;
    const toBeImportedPlaylist = this.state.toBeImportedPlaylist;
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          size="lg"
          style={{ maxWidth: "1600px", width: "100%", margin: "10px auto" }}
        >
          <ModalHeader className="mb-4" toggle={this.props.toggle}>
            <span>
              Songs in the playlist <br />
              <i>{this.state.name}</i>
            </span>
            <span className="inthemiddle">Playlist importer</span>
          </ModalHeader>
          <ModalBody>
            <span>
              I recommend using webScraping for retrieving songs from YouTube.
            </span>
            {this.state.notFoundArray.length > 1 ? (
              <div id="notFoundArray">
                <h3>
                  Following songs were not found:
                  <br />
                  <br />
                </h3>
                {this.state.notFoundArray.map(({ title, artistName }) => (
                  <span id="notFoundItem" key={title}>
                    <i>{title}</i> by <i>{artistName} </i>
                    <br />
                  </span>
                ))}
              </div>
            ) : (
              ""
            )}
            {this.state.error ? (
              <div>
                <span id="errorImport">
                  Daily limit exdeeded. Try again tomorrow.
                </span>
              </div>
            ) : (
              ""
            )}
            {this.state.imported ? (
              <span id="successImport">Succesfully created the playlist!</span>
            ) : (
              ""
            )}
            {this.state.loading ? (
              <div id="LoadingSpot">
                <h2 className="loadingTitle">Importing songs</h2>
                <div id="spinner">
                  <LoadingSpinner size={35} />
                </div>
                <div id="progressbar">
                  <Progress
                    animated
                    color="info"
                    value={this.state.progressValue}
                  />
                </div>
                <span className="loadingInfo">
                  Fetching songs from YouTube and adding them to our database...
                  This might take awhile.
                </span>
              </div>
            ) : (
              ""
            )}
            <Row>
              <Col xs="6" sm="6">
                <div id="lists">
                  <ImportList
                    importPlaylistToApp={this.importPlaylistToApp}
                    removeFromPlaylist={this.removeFromPlaylist}
                    toBeImportedPlaylist={this.state.toBeImportedPlaylist}
                  />
                </div>
              </Col>
              <Col xs="6" sm="6">
                SEARCHBAR
                <div id="lists">
                  <LoadedList
                    ownerName={this.state.ownerName}
                    totalTracks={this.state.totalTracks}
                    tracks={tracks}
                    addToImport={this.addToImport}
                  />
                </div>
              </Col>
            </Row>
            <Row id="lowerRow">
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  <Button onClick={this.importPlaylistToApp}>
                    Import playlist
                  </Button>
                </div>
              </Col>
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  <Button onClick={this.clearList}>Clear list</Button>
                </div>
              </Col>
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button onClick={this.moveAllToImport}>Get all songs</Button>
                </div>
              </Col>
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button onClick={this.webScrape}>use webScraping</Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <Button onClick={this.toggle} className="btn btn-primary">
            Cancel
          </Button>
        </Modal>
      </div>
    );
  }
}

export default PlaylistModal;
