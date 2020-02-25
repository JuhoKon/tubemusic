//TODO:
//itemit tietenkin:
// näihin itemeihi tulee owner, private ? eli yhteissoittolista, DATE !! biisin aika, title :)
//Ja pystyy tekemään copyn siu omalle accountille / subscribettämään yhteissoittolistaan (HUOM! Kaikki voivat
//                                                                                        editoida näitä listoja)!
//tälläne :)
//eli react virtualized lista-lo -> itemit (ei voi muoakta itemeitä tässä, vaan copy koko höskä / sub)
//Taaaaai vois tehä sellasen playlistmakerin, eli voit joko suoraan subata tossa playlists to choose from kohassa
//sitte tässä olis kaks osane juttu, eka osa on siu tuleva playlist, oikealla puolella siu lataama playlista
//eli voi rakentaa monesta jo olevasta playlistasta uusia playlistoja
//filterit näihi molempiin!
//game changing plan pog
//tehdään samanlailla ku se spotifyModal
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
import LoadedList from "./components/loadedList";
import ImportList from "./components/importList";
import isEqual from "react-fast-compare";

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
//TODO: add option to "create" own songs just by entering title and artist. These songs
//can be added  then to the importList which will be further on webscraped
class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importFilter: "",
      loadFilter: "",
      tracks: this.props.tracks,
      toBeImportedPlaylist: []
    };
    this.addToImport = this.addToImport.bind(this);
  }
  addToImport(item) {
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
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        tracks: this.props.tracks
      });
    }
  }
  handleChangeImport = event => {
    this.setState({ importFilter: event.target.value });
  };
  handleChangeLoad = event => {
    this.setState({ loadFilter: event.target.value });
  };
  clearList = () => {
    this.setState({
      toBeImportedPlaylist: []
    });
  };
  render() {
    const {
      importFilter,
      loadFilter,
      toBeImportedPlaylist,
      tracks
    } = this.state;
    ///console.log(this.state.tracks);
    const lowercasedFilterImport = importFilter.toLowerCase();
    const importfilteredData = toBeImportedPlaylist.filter(item => {
      return Object.keys(item).some(
        key =>
          typeof item[key] === "string" &&
          key !== "id" && //don't compare id
          item[key].toLowerCase().includes(lowercasedFilterImport)
      );
    });

    const lowercasedFilterLoad = loadFilter.toLowerCase();
    const LoadfilteredData = tracks.filter(item => {
      return Object.keys(item).some(
        key =>
          typeof item[key] === "string" &&
          key !== "id" && //don't compare id
          item[key].toLowerCase().includes(lowercasedFilterLoad)
      );
    });

    return (
      <div className="playlistEditor">
        <br />
        <br />
        <br />
        <Row>
          <Col xs="6" sm="6">
            <div id="lists">
              <Input
                value={importFilter}
                onChange={this.handleChangeImport}
                placeholder="Filter songs based on artist, album or title..."
              />
              <br />
              <ImportList
                removeFromImport={this.removeFromImport}
                toBeImportedPlaylist={importfilteredData}
              />
              {/* will have the chosen tracks from loaded list? */}
              {/* aka a tobeAddedPlaylist or so on.*/}
            </div>
          </Col>
          <Col xs="6" sm="6">
            <div id="lists">
              <Input
                value={loadFilter}
                onChange={this.handleChangeLoad}
                placeholder="Filter songs based on artist, album or title..."
              />
              <br />
              <LoadedList
                tracks={LoadfilteredData}
                addToImport={this.addToImport}
              />
            </div>
          </Col>
        </Row>
        <Row id="lowerRow">
          <Col xs="2" sm="2">
            <div className="placeforbutton">
              <Button>Add playlist to your collections.</Button>
            </div>
          </Col>
          <Col xs="2" sm="2">
            <div className="placeforbutton">
              <Button onClick={this.clearList.bind(this)}>Clear list</Button>
            </div>
          </Col>
          <Col xs="4" sm="4">
            <div className="placeforbutton">
              <Button>Get all songs</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PlaylistModal;
