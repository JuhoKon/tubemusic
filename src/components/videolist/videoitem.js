import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button
} from "reactstrap";
import "./videolist.css";
class Videoitem extends Component {
  onAddClick = id => {
    this.props.addFunc(id);
  };
  onPlayClick = id => {
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
                onClick={this.onAddClick.bind(this, this.props)}
              >
                +
              </Button>
              <Button
                className="btn btn-primary float-left"
                onClick={this.onPlayClick.bind(this, this.props)}
              >
                Play
              </Button>
            </span>
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>{this.props.channelTitle}</CardText>
            <CardText>
              <small className="text-muted">Tehtysilloinjatällöin</small>
            </CardText>
            <CardImg
              width="10px"
              bottom
              src={this.props.thumbnail}
              alt={this.props.thumbnail}
            />
          </CardBody>
        </Card>
        <br />
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Videoitem;
