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
import { Button, Row, Col, Input } from "reactstrap";
import LoadedList from "./components/loadedList";
import ImportList from "./components/importList";
import isEqual from "react-fast-compare";

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
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
  }
  removeFromPlaylist(item) {
    if (!item) return;
    if (typeof this.state.toBeImportedPlaylist[0] === "undefined") return;
    // console.log(this.state.toBeImportedPlaylist[0]);
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
    let song = Object.assign({}, item);
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
  addPlayListToColl = () => {
    //makes new playlist, based on some name chosen by user.
    //then adds the toBeImportedPlaylist to that.
  };
  getAllSongs = LoadfilteredData => {
    LoadfilteredData.forEach(track => this.addToImport(track));
  };
  render() {
    const {
      importFilter,
      loadFilter,
      toBeImportedPlaylist,
      tracks
    } = this.state;
    console.log(tracks);
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
    console.log(LoadfilteredData);
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
                placeholder="Filter songs based on title..."
              />
              <span className="float-left">
                Songs: {importfilteredData.length}
              </span>
              <br />
              <ImportList
                removeFromPlaylist={this.removeFromPlaylist}
                toBeImportedPlaylist={importfilteredData}
              />
            </div>
          </Col>
          <Col xs="6" sm="6">
            <div id="lists">
              <Input
                value={loadFilter}
                onChange={this.handleChangeLoad}
                placeholder="Filter songs based on title..."
              />
              <span className="float-left">
                Songs: {LoadfilteredData.length}
              </span>
              <br />
              <LoadedList
                tracks={LoadfilteredData}
                addToImport={this.addToImport}
              />
            </div>
          </Col>
        </Row>
        <Row id="lowerRow">
          <Col xs="4" sm="4">
            <div className="placeforbutton">
              <Button onClick={this.addPlayListToColl.bind(this)}>
                Add playlist to your collections.
              </Button>
            </div>
          </Col>
          <Col xs="1" sm="1">
            <div className="placeforbutton">
              <Button onClick={this.clearList.bind(this)}>Clear list</Button>
            </div>
          </Col>
          <Col xs="2" sm="2">
            <div className="placeforbutton">
              <Button onClick={this.getAllSongs.bind(this, LoadfilteredData)}>
                Get all songs
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PlaylistModal;
