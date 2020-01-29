import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardText,
  Row,
  Col
} from "reactstrap";
import isEqual from "react-fast-compare";
import moment from "moment";
import "moment-duration-format";

class Queueitem extends Component {
  state = {
    editMode: this.props.editMode
  };
  onRemoveClick = id => {
    //console.log(id);
    this.props.onRemove(id);
  };
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
    //console.log(this.props);
    return (
      <div>
        <Card className="card">
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
                <small className="float-left">
                  {moment.duration(this.props.duration).format("h:mm:ss")}
                </small>
              </Col>
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  {this.props.editMode ? (
                    <Button
                      className="btn btn-primary float-right"
                      color="danger"
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
//actions we want to use as second paranthesis
export default Queueitem;
