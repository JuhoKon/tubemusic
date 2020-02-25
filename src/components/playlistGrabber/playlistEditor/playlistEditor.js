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
      filter: "",
      tracks: this.props.tracks
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        tracks: this.props.tracks
      });
    }
  }
  render() {
    console.log(this.state.tracks);
    return (
      <div>
        <br />
        <br />
        <br />
        <Row>
          <Col xs="6" sm="6">
            <div id="lists">
              <ImportList toBeImportedPlaylist={this.state.tracks} />
              {/* will have the chosen tracks from loaded list? */}
              {/* aka a tobeAddedPlaylist or so on.*/}
            </div>
          </Col>
          <Col xs="6" sm="6">
            <div id="lists">
              <LoadedList tracks={this.state.tracks} />
            </div>
          </Col>
        </Row>
        <Row id="lowerRow">
          <Col xs="2" sm="2">
            <div className="placeforbutton">
              <Button>Import playlist</Button>
            </div>
          </Col>
          <Col xs="2" sm="2">
            <div className="placeforbutton">
              <Button>Clear list</Button>
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
      </div>
    );
  }
}

export default PlaylistModal;
