//pystyy importtaamaan eli siirtämään databaseen sen valitun judun
//eli hakee youtubesta ne biisit, mitkä näkyy tässä modaalissa
//ja sen jälkeen luo uuden playlistin, joka user nimeää || käyttää samaa kuin
//spotify playlist
//Tässä myös näkyy ne kaikki biisit, eli tekee spotify api haun, joka hakee nämä kaikki
//soittolistan biisit
//tässä voi poistaa biisejä siitä listasta
//lista, siis tulee spotifycomponentin statesta, johon se ladataan
//spotify componentissa myös omaan tietokantaan lisäilyt + youtube api haut.
//hyvä tulloo.

//youtube api hakee aina yhden biisin kerrallaan ja lisää sen playlistaan, joka laitetaan tietokantaan
//kun kaikki biisit on haettu
//tästä joku ilmoitus?
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
      chosenListsTracks: this.props.chosenListsTracks
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    /* console.log(this.props.playlistId);
    this.props.Updateplaylist(this.state.name, this.props.playlistId);
    this.toggle();*/
  };

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
  render() {
    console.log(this.state);
    const tracks = this.state.chosenListsTracks;
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
            <span className="inthemiddle">PLaylist importer</span>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6" sm="6">
                <div id="videolist"></div>
              </Col>
              <Col xs="6" sm="6">
                <div id="videolist">
                  {this.state.totalTracks} songs
                  <span className="float-right">By {this.state.ownerName}</span>
                  {tracks.map(({ id, title, artistName }) => (
                    <PlaylistModalItem
                      key={id}
                      title={title}
                      artistName={artistName}
                    />
                  ))}
                </div>
              </Col>
            </Row>
            <Row id="lowerRow">
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button>Import songs to the App</Button>
                </div>
              </Col>
              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button>Get all songs</Button>
                </div>
              </Col>

              <Col xs="4" sm="4">
                <div className="placeforbutton">
                  <Button>=</Button>
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
