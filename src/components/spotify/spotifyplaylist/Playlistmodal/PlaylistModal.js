import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Progress,
  Input
} from "reactstrap";
import isEqual from "react-fast-compare";
import LoadedList from "./loadedList";
import ImportList from "./importList";
import LoadingSpinner from "../../../spinner/spinner";
import {
  handleSpotifySearchFromYoutube,
  getContentDetails,
  makePlaylist,
  handleScrape,
  addUserPlaylist
} from "../../../functions/functions";
import "./PlaylistModal.css";
import { authenticationService } from "../../../functions/authenthication";
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
//TODO: add option to "create" own songs just by entering title and artist. These songs
//can be added  then to the importList which will be further on webscraped
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
      importCount: 0,
      loading: false,
      imported: false,
      progressValue: 0,
      notFoundArray: [],
      filter: ""
    };
    this.importPlaylistToApp = this.importPlaylistToApp.bind(this);
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.addToImport = this.addToImport.bind(this);
    this.toggle = this.toggle.bind(this);
    this.moveAllToImport = this.moveAllToImport.bind(this);
    this.clearList = this.clearList.bind(this);
    this.webScrape = this.webScrape.bind(this);
  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => {
      if (x) {
        this.setState({
          token: x.token
        });
      }
    });
  }
  async webScrape() {
    if (this.state.toBeImportedPlaylist.length < 1) {
      return;
    }
    this.setState({
      loading: true,
      progressValue: 0,
      importCount: 0
    });
    let tracksFromYoutube = [];
    let tracks = this.state.toBeImportedPlaylist;
    let numberOfTracks = this.state.toBeImportedPlaylist.length;

    let step = (1 / numberOfTracks) * 100;
    let batchSize = 50; //MAX 500
    let left = 0;
    while (numberOfTracks > left) {
      let res = await handleScrape(tracks.slice(left, left + batchSize));
      res.forEach(track => {
        tracksFromYoutube.push(track);
      });
      this.setState({
        progressValue: step * tracksFromYoutube.length,
        importCount: tracksFromYoutube.filter(track => track !== null).length
      });
      left += batchSize;
    }
    await timeout(6500);
    if (tracksFromYoutube.length > 0) {
      const name = this.state.name;
      //console.log(res);
      const playlist = tracksFromYoutube.filter(track => track !== null);
      const body = JSON.stringify({
        name,
        playlist: playlist,
        isPrivate: true,
        owner: this.state.ownerName
      });
      if (playlist.length > 0) {
        //console.log(tracksFromYoutube.length - playlist.length);
        const respond = await makePlaylist(body);
        addUserPlaylist(respond.data._id, respond.data.name, this.state.token);
        if (respond.status === 200) {
          this.setState({
            imported: true,
            loading: false
          });
        } else {
          this.setState({
            imported: false
          });
          alert("Error making creating the playlist.");
        }
      } else {
        this.setState({
          imported: false
        });
        alert("No songs were found.");
      }
    }
  }
  clearList() {
    this.setState({
      toBeImportedPlaylist: []
    });
  }
  moveAllToImport(filteredData) {
    //const chosenListsTracks = this.state.chosenListsTracks;
    filteredData.forEach(track => this.addToImport(track)); //need to generate uniqueIDs
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
        progressValue: 0,
        importCount: 0
      });
    }
  }
  async makePlaylist(name, playlist) {
    //API request to create a new playlist (database)
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
    //DEPRECATED
    this.setState({
      loading: true,
      progressValue: 0,
      importCount: 0
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
      loading: false,
      progressValue: 0,
      importCount: 0
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
  }
  removeFromPlaylist(item) {
    if (!item) return;
    if (typeof this.state.toBeImportedPlaylist[0] === "undefined") return;
    //console.log(this.state.toBeImportedPlaylist[0]);
    //console.log(item);
    for (let i = 0; i < this.state.toBeImportedPlaylist.length; i++) {
      if (this.state.toBeImportedPlaylist[i].id === item.id) {
        //console.log(this.state.toBeImportedPlaylist[i]);
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
      //just to trigger re-rendering -> new props to children
      updated: true
    });
  }
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };
  render() {
    const tracks = this.state.chosenListsTracks;
    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = tracks.filter(item => {
      return Object.keys(item).some(
        key =>
          typeof item[key] === "string" &&
          key !== "id" && //don't compare id
          item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
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
                <span className="importedNumbers" id="creatingInfo">
                  {this.state.progressValue < 100
                    ? "Importing songs..."
                    : "Creating playlist..."}
                </span>
                <span className="importedNumbers">
                  {this.state.importCount} /{" "}
                  {this.state.toBeImportedPlaylist.length} songs imported.
                </span>
                <span className="importedNumbers" id="creatingInfo2">
                  {(this.state.progressValue > 99) &
                  (this.state.toBeImportedPlaylist.length !==
                    this.state.importCount)
                    ? "Unfortunately we were unable to import all of the songs"
                    : ""}
                </span>
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
                <div id="lists">
                  {filteredData.length} songs
                  <span className="float-right">By {this.props.ownerName}</span>
                  <br />
                  <Input
                    value={filter}
                    onChange={this.handleChange}
                    placeholder="Filter songs based on artist, album or title..."
                  />
                  <br />
                  <LoadedList
                    ownerName={this.state.ownerName}
                    totalTracks={this.state.totalTracks}
                    tracks={filteredData}
                    addToImport={this.addToImport}
                  />
                </div>
              </Col>
            </Row>
            <Row id="lowerRow">
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  <Button
                    disabled={true} //Not in use
                    //  disabled={this.state.loading}
                    onClick={this.importPlaylistToApp}
                  >
                    Import playlist
                  </Button>
                </div>
              </Col>
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  <Button
                    disabled={
                      this.state.loading || !this.state.toBeImportedPlaylist[0]
                        ? true
                        : false
                    }
                    onClick={this.clearList}
                  >
                    Clear list
                  </Button>
                </div>
              </Col>
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button
                    disabled={this.state.loading}
                    onClick={this.moveAllToImport.bind(this, filteredData)}
                  >
                    Get all songs
                  </Button>
                </div>
              </Col>
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button
                    disabled={
                      this.state.loading || !this.state.toBeImportedPlaylist[0]
                        ? true
                        : false
                    }
                    onClick={this.webScrape}
                  >
                    use webScraping
                  </Button>
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
