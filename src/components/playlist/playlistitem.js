import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "./playlist.css";
import isEqual from "react-fast-compare";

import "moment-duration-format";

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
    console.log("playlistitem");
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
                <Button
                  className="btn btn-primary btn-item"
                  onClick={this.onPlayClick.bind(this, this.props)}
                  color="primary"
                >
                  Play
                </Button>
              </div>
            </Col>
            <Col xs="7" sm="7">
              <CardText>{this.props.title}</CardText>
            </Col>
            <Col xs="1" sm="1">
              <small className="float-left">{this.props.duration}</small>
            </Col>
            <Col xs="2" sm="2">
              <div className="placeforbutton">
                {this.props.editMode ? (
                  <Button
                    className="btn btn-primary btn-remove float-right btn-item"
                    color="danger"
                    onClick={this.onDeleteClick.bind(this, this.props)}
                  >
                    x
                  </Button>
                ) : (
                  <Button
                    className="btn btn-primary float-right btn-item"
                    color="info"
                    onClick={this.onAddClick.bind(this, this.props)}
                  >
                    +Q
                  </Button>
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
