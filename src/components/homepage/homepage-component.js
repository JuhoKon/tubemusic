import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Queue from "../queue/queue";
import Player from "../player/Player";
import Playlist from "../playlist/playlist";
import { handleSubmit, getPlaylists } from "../functions/functions";
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
    this.getPlaylist = this.getPlaylist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.AddToPlaylist = this.AddToPlaylist.bind(this);
    this.onDeleteFromPlaylist = this.onDeleteFromPlaylist.bind(this);
    this.addPlaylistToQueue = this.addPlaylistToQueue.bind(this);
    this.state = {
      items: [],
      queue: [],
      playlist: [],
      playlists: [],
      updated: "",
      url: null,
      playing: false
    };
  }
  addPlaylistToQueue() {
    let playlist = this.state.playlist;

    for (let i = 0; i < playlist.length; i++) {
      this.onAdd(playlist[i]);
    }
    this.setState({
      updated: true
    });
  }
  loadPlaylist(playlists) {
    console.log(playlists);
  }
  AddToPlaylist(item) {
    console.log(item);
    this.state.playlist.push(item);
    this.setState({
      updated: item
    });
  }
  onDeleteFromPlaylist(item) {
    if (!item) return;
    if (typeof this.state.playlist[0] === "undefined") return;

    //console.log(item.uniqueId);
    //console.log(this.state.queue[0].uniqueId);
    for (let i = 0; i < this.state.playlist.length; i++) {
      if (this.state.playlist[i].uniqueId === item.uniqueId) {
        //delete item from playlist
        this.state.playlist.splice(i, 1);
        break;
      }
    }
    this.setState({
      updated: item.videoId
    });
  }
  async handleSubmit(termFromSearch) {
    const result = await handleSubmit(termFromSearch);
    // console.log(result);
    this.setState({
      items: result
    });
  }
  async getPlaylist() {
    const result = await getPlaylists();
    //console.log(result.data.Playlist);
    this.setState({
      playlists: result.data.Playlist
    });
  }
  onAdd(item) {
    //console.log(item);
    this.state.queue.push(item);
    this.setState({
      updated: item
    });
    //console.log(this.state.queue);
    //console.log(videoId);
  }
  onDelete(item) {
    //delete from queue
    if (!item) return;
    if (typeof this.state.queue[0] === "undefined") return;
    console.log("Moi", item.uniqueId);
    console.log(this.state.queue[0].uniqueId);
    for (let i = 0; i < this.state.queue.length; i++) {
      if (this.state.queue[i].uniqueId === item.uniqueId) {
        //delete item from queue
        console.log("löyty");
        this.state.queue.splice(i, 1);
        break;
      }
    }
    this.setState({
      updated: item.videoId
    });
  }
  onPlay(item) {
    if (!item) return;
    const videoId = item.videoId;
    const url = "https://www.youtube.com/watch?v=" + videoId;
    this.setState({
      url: url, //url gets passed to player as props
      playing: true
    });
    this.onDelete(item); //delete chosen item
  }
  render() {
    const itemArray = [];
    const videoIdArray = [];
    const thumbnailArray = [];
    const queue = this.state.queue;
    const url = this.state.url;
    const playlists = this.state.playlists;
    const playlist = this.state.playlist;
    //console.log(playlist);
    // console.log(this.state.items);
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
            <Col sm="4">
              <Player
                array={queue}
                onRemove={this.onDelete}
                url={url}
                playing={this.state.playing}
              />
              <br />
              <Queue
                queue={queue}
                onRemove={this.onDelete}
                onPlay={this.onPlay}
              />
            </Col>
            <Col sm="4">
              <Playlist
                playlists={playlists}
                playlist={playlist}
                getPlayList={this.getPlaylist}
                loadPlaylist={this.loadPlaylist}
                onDeleteFromPlaylist={this.onDeleteFromPlaylist}
                onPlay={this.onPlay}
                addPlaylistToQueue={this.addPlaylistToQueue}
                onRemove={this.onDelete}
              />
            </Col>
            <Col sm="4">
              <Search handleSubmit={this.handleSubmit} />
              <br />
              <Videolist
                items={itemArray}
                onAdd={this.onAdd}
                onPlay={this.onPlay}
                AddToPlaylist={this.AddToPlaylist}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
