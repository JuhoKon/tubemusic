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
    this.onPlay = this.onPlay.bind(this);
    this.state = {
      items: [],
      queue: [],
      updated: "",
      url : null,
      playing : false
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
    console.log(videoId);
    this.state.queue.push(videoId);
    this.setState({
      updated: videoId
    });
    console.log(this.state.queue);
    //console.log(videoId);
  }
  onDelete(item) {
    if (!item) return;
    if (typeof this.state.queue[0] === "undefined") return;
    console.log(item.uniqueId);
    console.log(this.state.queue[0].uniqueId);
    for (let i = 0; i < this.state.queue.length; i++) {
      if (this.state.queue[i].uniqueId === item.uniqueId) {
        //delete item from queue
        this.state.queue.splice(i, 1);
        break;
      }
    }
    this.setState({
      updated: item.videoId
    });
  }
  onPlay(item) { 
    if(!item) return;
    console.log("Moi", item.uniqueId);
    //TODO: teet sillee et tää vaa soittaa sen biisin?
    //eli lataa playerin URLiin ton urlin käytännössä
    const videoId = item.videoId;
    const url = "https://www.youtube.com/watch?v=" + videoId;
    this.setState({
      url : url,
      playing : true
    });
    this.onDelete(item); //delete chosen item
  }
  render() {
    const itemArray = [];
    const videoIdArray = [];
    const thumbnailArray = [];
    const queue = this.state.queue;
    const url = this.state.url;
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
              <Player array={queue} onRemove={this.onDelete} url={url} playing = {this.state.playing}/>
              <br />
              <Queue queue={queue} onRemove={this.onDelete} onPlay = {this.onPlay}/>
            </Col>
            <Col xs="6" sm="4">
              .col-6 .col-sm-4
            </Col>
            <Col sm="4">
              <Search handleSubmit={this.handleSubmit} />
              <br />
              <Videolist items={itemArray} onAdd={this.onAdd} onPlay = {this.onPlay} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
