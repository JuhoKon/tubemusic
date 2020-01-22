import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button
} from "reactstrap";

class Videoitem extends Component {
  constructor(props) {
    super(props);
  }
  //TODO: add fucntionality to button -> add to queue
  //call videolist function, which calls app function
  //pass queue array to player from app
  //render queue and add skip this song (go to next in queue)
  //have it automatically go to next song
  //have delete button to the queue which just removes it from the queue
  //^this has to be updated to the app I think.
  //maybe it works
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              <Button className="btn btn-primary float-right">+</Button>
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
