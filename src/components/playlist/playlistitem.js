import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "./playlist.css";
import isEqual from "react-fast-compare";
import "moment-duration-format";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
    // console.log(this.props);
    //console.log(this.props.editMode);
    return (
      <Card
        onAnimationEnd={() => this.setState({ fade: false })}
        className={fade ? "card fade2" : "card"}
        onDoubleClick={this.onPlayClick.bind(this, this.props)}
      >
        <CardBody>
          <Row>
            <Col xs="2" sm="2">
              <div
                className="thumbnailbuttonplaylist "
                onClick={this.onPlayClick.bind(this, this.props)}
              >
                {this.props.thumbnail && (
                  <img
                    height={60}
                    src={this.props.thumbnail} // use normal <img> attributes as props
                    width={60}
                    style={{ position: "absolute" }}
                    id="thumbnail"
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
            <Col xs="6" sm="6">
              <CardText>{this.props.title} </CardText>{" "}
              {this.props.artists && (
                <RenderArtists artists={this.props.artists} />
              )}
            </Col>
            <Col xs="2" sm="2">
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
  return props.artists.map((artist) => <>{artist.name} &nbsp;</>);
};
//actions we want to use as second paranthesis
export default Playlistitem;
