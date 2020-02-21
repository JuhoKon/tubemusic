import React, { Component } from "react";
import { Card, CardBody, Button, CardText, Row, Col } from "reactstrap";
import isEqual from "react-fast-compare";
import "./queue.css";

class Queueitem extends Component {
  state = {
    editMode: this.props.editMode
  };

  async onRemoveClick(id) {
    //console.log(id);

    this.props.onRemove(id);
  }
  onPlayClick = id => {
    //console.log(id);
    this.props.onPlay(id);
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        editMode: this.props.editMode
      });
    }
  }
  render() {
    //const fade = this.state.fade;
    //console.log("queue item");
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  <Button
                    className="btn btn-secondary button btn-item"
                    onClick={this.onPlayClick.bind(this, this.props)}
                    color="secondary"
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
                      className="btn btn-secondary button float-right"
                      color="secondary"
                      onClick={this.onRemoveClick.bind(this, this.props)}
                    >
                      x
                    </Button>
                  ) : null}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Queueitem;
