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

  render() {
    return (
      <div>
        <Card className="card">
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              <Button
                className="btn btn-primary float-right"
                onClick={this.onRemoveClick.bind(this, this.props.videoId)}
              >
                +
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
