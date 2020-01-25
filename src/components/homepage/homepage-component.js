import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Queue from "../queue/queue";
import Player from "../player/Player";
import Playlist from "../playlist/playlist";
import {
  handleSubmit,
  getPlaylists,
  makePlaylist,
  updatePlaylist,
  deletePlaylist
} from "../functions/functions";

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
    this.loadPlaylist = this.loadPlaylist.bind(this);
    this.playPlaylist = this.playPlaylist.bind(this);
    this.makePlaylist = this.makePlaylist.bind(this);
    this.Updateplaylist = this.Updateplaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.state = {
      items: [],
      queue: [],
      playlist: [],
      playlists: [],
      updated: "",
      url: null,
      playing: false,
      playlistId: "",
      title: "" //for rendering name
    };
  }
  isSame(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i].title !== array2[i].title) {
        return false;
      }
    }
    return true;
  }
  playPlaylist() {
    if (this.state.queue.length === this.state.playlist.length) {
      if (this.isSame(this.state.queue, this.state.playlist)) {
        return;
      }
    }
    var itemArray = [];
    for (let i = 0; i < this.state.playlist.length; i++) {
      console.log(this.state.playlist[i]);
      let itemObject = {};
      itemObject["title"] = this.state.playlist[i].title;
      itemObject["channelTitle"] = this.state.playlist[i].channelTitle;
      itemObject["videoId"] = this.state.playlist[i].videoId;
      itemObject["uniqueId"] = this.state.playlist[i].uniqueId;
      itemArray.push(itemObject);
    }
    this.setState({
      queue: itemArray
    });
  }
  addPlaylistToQueue() {
    let playlist = this.state.playlist;
    let queue = this.state.queue;
    console.log(playlist);
    console.log("Hello?");
    for (let i = 0; i < playlist.length; i++) {
      queue.push(playlist[i]);
    }
    this.setState({
      queue: queue
    });
  }
  loadPlaylist(playlist) {
    console.log(playlist);
    this.setState({
      playlist: playlist.playlist,
      playlistName: playlist.name,
      playlistId: playlist._id
    });
  }
  AddToPlaylist(item) {
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
    this.setState({
      playlists: result.data.Playlist
    });
  }
  async makePlaylist(name) {
    this.setState({
      playlist: []
    });
    let playlist = this.state.playlist;
    const item = JSON.stringify({ name, playlist });
    const result = await makePlaylist(item);
    console.log(result.data._id);
    this.setState({
      playlistId: result.data._id,
      playlistName: result.data.name
    });
  }
  async Updateplaylist(name, id) {
    let playlist = this.state.playlist;
    const item = JSON.stringify({ name, playlist });
    const result = await updatePlaylist(item, id);
    //console.log(result);
    this.setState({
      playlistName: result.data.name
    });
  }
  async deletePlaylist(id) {
    const result = await deletePlaylist(id);
    this.getPlaylist();
  }
  onAdd(item) {
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
  ref = player => {
    //reference to player Child
    this.player = player;
  };
  onPlay(item) {
    if (!item) return;
    console.log(item);
    const videoId = item.videoId;
    const title = item.title;
    const url = "https://www.youtube.com/watch?v=" + videoId;
    if (url === this.state.url) {
      this.player.seekTo0(); //Seeks to 0 incase of having same url
    }
    this.setState({
      url: url, //url gets passed to player as props
      playing: true,
      updated: true,
      title: title
    });
  }
  render() {
    const itemArray = [];
    const videoIdArray = [];
    const thumbnailArray = [];
    const queue = this.state.queue;
    const url = this.state.url;
    const playlists = this.state.playlists;
    const playlist = this.state.playlist;
    console.log(playlists);
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
                ref={this.ref}
                array={queue}
                onRemove={this.onDelete}
                url={url}
                playing={this.state.playing}
                title={this.state.title}
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
                playlistName={this.state.playlistName}
                playlistId={this.state.playlistId}
                getPlayList={this.getPlaylist}
                loadPlaylist={this.loadPlaylist}
                onDeleteFromPlaylist={this.onDeleteFromPlaylist}
                onPlay={this.onPlay}
                addPlaylistToQueue={this.addPlaylistToQueue}
                onRemove={this.onDelete}
                playPlaylist={this.playPlaylist}
                makePlaylist={this.makePlaylist}
                Updateplaylist={this.Updateplaylist}
                deletePlaylist = {this.deletePlaylist}
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
