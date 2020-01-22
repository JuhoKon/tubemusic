import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Player from "../player/Player";
const key = "AIzaSyCc5tyizZ6BVh1XtAv_ItjIlS7QMKWhe0c";

export default class Homepage extends Component {
  state = {
    items: []
  };

  handleSubmit = async termFromSearch => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          maxResults: 10,
          key: key,
          q: termFromSearch
        }
      })
      .then(res => {
        //console.log(res.data.items);
        this.setState({
          items: res.data.items
        });
      });
  };
  render() {
    const itemArray = [];
    const videoIdArray = [];
    const thumbnailArray = [];
    this.state.items.map(item => videoIdArray.push(item.id.videoId));

    this.state.items.map(item => itemArray.push(item.snippet));

    this.state.items.map(item =>
      thumbnailArray.push(item.snippet.thumbnails.medium.url)
    );
    for (let i = 0; i < itemArray.length; i++) {
      itemArray[i].videoId = videoIdArray[i];
      itemArray[i].thumbnail = thumbnailArray[i];
    }
    console.log(itemArray);
    return (
      <div>
        <br />
        <div className="container-fluid">
          <Row>
            <Col xs="6" sm="4">
              Jono <br />
              <Player />
            </Col>
            <Col xs="6" sm="4">
              .col-6 .col-sm-4
            </Col>
            <Col sm="4">
              <Search handleSubmit={this.handleSubmit} />
              <Videolist items={itemArray} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
