import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "./playlist.css";
import isEqual from "react-fast-compare";
import "moment-duration-format";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Playlistitem extends Component {
  state = {
    playlist: this.props.playlist,
    editMode: this.props.editMode,
    fade: false,
  };
  onAddClick = (id) => {
    this.setState({
      fade: true,
    });
    this.props.addFunc(id);
  };
  onPlayClick = (id) => {
    this.props.onPlay(id);
  };
  onDeleteClick = (id) => {
    this.props.onDeleteFromPlaylist(id);
  };
  playNextClick = (item) => {
    this.props.playNext(item);
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlist: this.props.playlist,
        editMode: this.props.editMode,
      });
    }
  }

  render() {
    const fade = this.state.fade;
    //console.log("playlistitem");
    console.log(this.props);
    //console.log(this.props.editMode);
    return (
      <Card
        onAnimationEnd={() => this.setState({ fade: false })}
        className={fade ? "card fade2" : "card"}
        onDoubleClick={this.onPlayClick.bind(this, this.props)}
      >
        <CardBody>
          <Row>
            <Col xs="2" sm="2" lg="1">
              <div
                className="thumbnailbuttonplaylist"
                onClick={this.onPlayClick.bind(this, this.props)}
              >
                {this.props.thumbnail && (
                  <img
                    height={60}
                    src={this.props.thumbnail} // use normal <img> attributes as props
                    width={60}
                    style={{ position: "absolute" }}
                    id="thumbnail"
                    alt="foo"
                  />
                )}
                <FontAwesomeIcon
                  className="Active"
                  size={"lg"}
                  icon={faPlay}
                  id="thumbnail2"
                />
              </div>
            </Col>
            <Col xs="3" sm="3">
              <CardText>
                <div className="hoverEffect">{this.props.title} </div>
              </CardText>
            </Col>
            <Col xs="4" sm="4" lg="3">
              {this.props.artists && (
                <RenderArtists
                  toggleArtistModal={this.props.toggleArtistModal}
                  artists={this.props.artists}
                />
              )}
            </Col>
            {/*{artist: "Pyhimys", browseId: "MPREb_w0MZYvAVraE", thumbnails: Array(4), title: "Olisinpa täällä", type: "Album", …}
artist: "Pyhimys"
browseId: "MPREb_w0MZYvAVraE"
thumbnails: Array(4)
0: {height: 60, url: "https://lh3.googleusercontent.com/JOIBsZciSnUbSjUf…s5yBExpKFc5mnSW4zgmMm7B29_gnKGOmqf=w60-h60-l90-rj", width: 60}
1: {height: 120, url: "https://lh3.googleusercontent.com/JOIBsZciSnUbSjUf…yBExpKFc5mnSW4zgmMm7B29_gnKGOmqf=w120-h120-l90-rj", width: 120}
2: {height: 226, url: "https://lh3.googleusercontent.com/JOIBsZciSnUbSjUf…yBExpKFc5mnSW4zgmMm7B29_gnKGOmqf=w226-h226-l90-rj", width: 226}
3: {height: 544, url: "https://lh3.googleusercontent.com/JOIBsZciSnUbSjUf…yBExpKFc5mnSW4zgmMm7B29_gnKGOmqf=w544-h544-l90-rj", width: 544}
length: 4
__proto__: Array(0)
title: "Olisinpa täällä"
type: "Album"
year: "2019"
__proto__: Object */}
            <Col lg="2" className="d-none d-lg-block">
              {this.props.album && (
                <CardText>
                  <div
                    onClick={() => {
                      this.props.toggleAlbumModal({
                        artist: this.props.artists[0].name,
                        browseId: this.props.album.id,
                        type: "Album",
                        thumbnails: [
                          { height: 60, url: this.props.thumbnail },
                          { height: 60, url: this.props.thumbnail },
                        ],
                        title: this.props.album.name,
                      });
                    }}
                    style={{ cursor: "pointer" }}
                    className="hoverEffect"
                  >
                    {this.props.album.name}
                  </div>
                </CardText>
              )}
            </Col>
            <Col xs="1" sm="1">
              <small className="float-left">{this.props.duration}</small>
            </Col>
            <Col xs="2" sm="2">
              <div className="placeforbutton">
                {this.props.editMode ? (
                  <Button
                    className="btn btn-secondary btn-remove float-right btn-item"
                    color="danger"
                    onClick={this.onDeleteClick.bind(this, this.props)}
                  >
                    x
                  </Button>
                ) : (
                  <div className="flex-container">
                    <Button
                      className="btn btn-secondary float-right btn-item"
                      color="info"
                      onClick={this.playNextClick.bind(this, this.props)}
                    >
                      +N
                    </Button>
                    <Button
                      className="btn btn-secondary float-right btn-item"
                      color="info"
                      onClick={this.onAddClick.bind(this, this.props)}
                    >
                      +Q
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const RenderArtists = (props) => {
  return props.artists.map((artist) => (
    <div
      className="artistStuff hoverEffect"
      onClick={() =>
        props.toggleArtistModal({ name: artist.name, id: artist.id })
      }
    >
      {artist.name} &nbsp;
    </div>
  ));
};
//actions we want to use as second paranthesis
export default Playlistitem;
