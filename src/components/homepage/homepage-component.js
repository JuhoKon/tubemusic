import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Queue from "../queue/queue";
import Player from "../player/Player";
const key = "AIzaSyCc5tyizZ6BVh1XtAv_ItjIlS7QMKWhe0c";

export default class Homepage extends Component {
  constructor(props, context) {
    super(props, context);
    // Binding "this" creates new function with explicitly defined "this"
    // Now "openArticleDetailsScreen" has "ArticleListScreen" instance as "this"
    // no matter how the method/function is called.
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      items: [],
      queue: [],
      updated: ""
    };
  }

  handleSubmit = async termFromSearch => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          maxResults: 7,
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
  onAdd(videoId) {
    this.state.queue.push(videoId);
    this.setState({
      updated: videoId
    });
    console.log(this.state.queue);
    //console.log(videoId);
  }
  onDelete(item) {
    console.log(item.uniqueId);
    console.log(this.state.queue[0].uniqueId);
    for (let i = 0; i<this.state.queue.length; i++) {
      if (this.state.queue[i].uniqueId === item.uniqueId) {
        //delete se item
        break;
      }
    }
    //console.log((this.state.queue.uniqueId.indexOf(item.uniqueId)));
    //this.state.queue.splice(this.state.queue.indexOf(videoId), 1); //ei toimi oikei
    this.setState({
      updated: item.videoId
    });
  }
  render() {
    const itemArray = [];
    const videoIdArray = [];
    const thumbnailArray = [];
    const queue = this.state.queue;
    //console.log(queue);
    this.state.items.map(item => videoIdArray.push(item.id.videoId));

    this.state.items.map(item => itemArray.push(item.snippet));

    this.state.items.map(item =>
      thumbnailArray.push(item.snippet.thumbnails.medium.url)
    );
    for (let i = 0; i < itemArray.length; i++) {
      itemArray[i].videoId = videoIdArray[i];
      itemArray[i].thumbnail = thumbnailArray[i];
      itemArray[i].uniqueId = Math.random();
    }
    //console.log(itemArray);
    return (
      <div>
        <br />
        <div className="container-fluid">
          <Row>
            <Col xs="6" sm="4">
              <Player array = {queue}/>
              <br />
              <Queue queue={queue} onRemove={this.onDelete} />
            </Col>
            <Col xs="6" sm="4">
              .col-6 .col-sm-4
            </Col>
            <Col sm="4">
              <Search handleSubmit={this.handleSubmit} />
              <br />
              <Videolist items={itemArray} onAdd={this.onAdd} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
