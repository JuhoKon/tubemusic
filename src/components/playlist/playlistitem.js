import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "./playlist.css";
import isEqual from "react-fast-compare";
import "moment-duration-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Playlistitem extends Component {
  state = {
    playlist: this.props.playlist,
    editMode: this.props.editMode,
    fade: false
  };
  onAddClick = id => {
    this.setState({
      fade: true
    });
    this.props.addFunc(id);
  };
  onPlayClick = id => {
    this.props.onPlay(id);
  };
  onDeleteClick = id => {
    this.props.onDeleteFromPlaylist(id);
  };
  playNextClick = item => {
    this.props.playNext(item);
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlist: this.props.playlist,
        editMode: this.props.editMode
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
      >
        <CardBody>
          <Row>
            <Col xs="2" sm="2">
              <div className="placeforbutton">
                <FontAwesomeIcon
                  className="play-icon"
                  icon="play-circle"
                  onClick={this.onPlayClick.bind(this, this.props)}
                  size="lg"
                />
              </div>
            </Col>
            <Col xs="6" sm="6">
              <CardText>{this.props.title}</CardText>
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
//actions we want to use as second paranthesis
export default Playlistitem;
