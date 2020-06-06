import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./mediaplayer.css";
class MediaPlayer extends Component<any, any> {
  state = {
    loading: false,
  };

  render() {
    console.log(this.props);

    return (
      <div className="MediaPlayerdiv">
        <div>asdasd</div>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default MediaPlayer;
