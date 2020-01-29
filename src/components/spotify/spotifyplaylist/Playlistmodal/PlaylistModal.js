import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Button,
  Row,
  Col
} from "reactstrap";
import isEqual from "react-fast-compare";
import PlaylistModalItem from "./PlaylistModalItem";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import {
  handleSpotifySearchFromYoutube,
  getContentDetails,
  makePlaylist
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
      toBeImportedPlaylist: []
    };
    this.importPlaylistToApp = this.importPlaylistToApp.bind(this);
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.addToImport = this.addToImport.bind(this);
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
        chosenListsTracks: this.props.chosenListsTracks
      });
    }
  }
  async makePlaylist(name, playlist) {
    //API request to create a new playlist (database)
    this.setState({
      playlist: playlist
    });
    //let playlist = this.state.playlist;
    const item = JSON.stringify({ name, playlist });
    const result = await makePlaylist(item);
    //console.log(result.data._id);
    this.setState({
      playlistId: result.data._id,
      playlistName: result.data.name
    });
  }
  async importPlaylistToApp() {
    const tracksFromYoutube = [];
    const tracks = this.state.toBeImportedPlaylist;
    console.log(tracks);
    for (let i = 0; i < tracks.length; i++) {
      let artistName = tracks[i].artistName;
      let title = tracks[i].title;
      let term = title + " " + artistName + "lyrics";
      let result = await handleSpotifySearchFromYoutube(term);
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
    }
    console.log(tracksFromYoutube);
    const name = this.state.name;
    const body = JSON.stringify({ name, playlist: tracksFromYoutube });
    const res = await makePlaylist(body);

    //tracksFromYoutube <- our playlist
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
    console.log(item);
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
  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    this.setState(({ toBeImportedPlaylist }) => ({
      toBeImportedPlaylist: arrayMove(toBeImportedPlaylist, oldIndex, newIndex)
    }));
  };
  render() {
    const SortableList = SortableContainer(({ toBeImportedPlaylist }) => {
      return (
        <div>
          {toBeImportedPlaylist.map(({ id, title, artistName }, index) => (
            <SortableItem
              key={index}
              id={id}
              title={title}
              artistName={artistName}
              importPlaylistToApp={this.importPlaylistToApp}
              removeFromPlaylist={this.removeFromPlaylist}
              imported={true}
              index={index}
            />
          ))}
        </div>
      );
    });
    const SortableItem = SortableElement(({ id, title, artistName }) => (
      <PlaylistModalItem
        key={id}
        id={id}
        title={title}
        artistName={artistName}
        importPlaylistToApp={this.importPlaylistToApp}
        removeFromPlaylist={this.removeFromPlaylist}
        imported={true}
      />
    ));
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
            <Row>
              <Col xs="6" sm="6">
                <Row>
                  <Col xs="6" sm="6">
                    {" "}
                    <p id="importedPlayListTitle">Title</p>
                  </Col>
                  <Col xs="6" sm="6">
                    <p>Artist</p>
                  </Col>
                </Row>

                <div id="videolist">
                  <SortableList
                    helperClass="sortableHelper"
                    toBeImportedPlaylist={toBeImportedPlaylist}
                    onSortEnd={this.onSortEnd}
                  />
                </div>
              </Col>
              <Col xs="6" sm="6">
                SEARCHBAR
                <div id="videolist">
                  {this.state.totalTracks} songs
                  <span className="float-right">By {this.state.ownerName}</span>
                  {tracks.map(({ title, artistName }) => (
                    <PlaylistModalItem
                      key={Math.random()}
                      title={title}
                      artistName={artistName}
                      addToImport={this.addToImport}
                      imported={false}
                    />
                  ))}
                </div>
              </Col>
            </Row>
            <Row id="lowerRow">
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button onClick={this.importPlaylistToApp}>
                    Import playlist to the app
                  </Button>
                </div>
              </Col>
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button>Get all songs</Button>
                </div>
              </Col>
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button>use webScraping</Button>
                </div>
              </Col>
            </Row>
          </ModalBody>

          <Button onClick={this.props.toggle} className="btn btn-primary">
            Cancel
          </Button>
        </Modal>
      </div>
    );
  }
}

export default PlaylistModal;
