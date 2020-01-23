import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button
} from "reactstrap";

class Queueitem extends Component {
  onRemoveClick = id => {
    //console.log(id);
    this.props.onRemove(id);
  };
  onPlayClick = id => {
    //console.log(id);

    this.props.onPlay(id);
  };

  render() {
    return (
      <div>
        <Card className="card">
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              <Button
                className="btn btn-primary float-right"
                color="danger"
                onClick={this.onRemoveClick.bind(this, this.props)}
              >
                x
              </Button>
              <Button
                className="btn btn-primary float-left "
                color="primary"
                onClick={this.onPlayClick.bind(this, this.props)}
              >
                Play
              </Button>
            </span>
            <CardTitle>{this.props.title}</CardTitle>
          </CardBody>
        </Card>
        <br />
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Queueitem;
