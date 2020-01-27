import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Queue from "../queue/queue";
import Player from "../player/Player";
import Playlist from "../playlist/playlist";
import nameGenerator from "../functions/nameGenerator";
import {
  handleSubmit,
  getPlaylists,
  makePlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlayListById
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
    this.UpdateCurrentPlaylist = this.UpdateCurrentPlaylist.bind(this);
    this.shuffleQueue = this.shuffleQueue.bind(this);
    this.clearQueue = this.clearQueue.bind(this);
    this.setQueue = this.setQueue.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.setPlaylist = this.setPlaylist.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.state = {
      items: [], //from youtube API
      queue: [],
      playlist: [],
      playlists: [],
      updated: "",
      url: null,
      playing: true,
      playlistId: "",
      playlistName: "",
      title: "" //for rendering name
    };
  }
  setQueue(queue) {
    console.log(this.state.url);
    this.setState({
      queue: queue
    });
    console.log(this.state.url);
  }
  isSame(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i].title !== array2[i].title) {
        return false;
      }
    }
    return true;
  }
  shuffleQueue() {
    //Fiter-Yates shuffle
    //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    let Array = this.state.queue;
    for (let i = Array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [Array[i], Array[j]] = [Array[j], Array[i]];
    }
    this.setState({
      queue: Array
    });
  }
  clearQueue() {
    if (typeof this.state.queue[0] !== "undefined") {
      this.setState({
        queue: []
      });
    }
  }
  setPlaylist(playlistitems) {
    this.setState({
      playlist: playlistitems
    });
  }
  playPlaylist() {
    if (this.state.queue.length === this.state.playlist.length) {
      if (this.isSame(this.state.queue, this.state.playlist)) {
        return;
      }
    }
    var itemArray = [];
    for (let i = 0; i < this.state.playlist.length; i++) {
      let itemObject = {};
      if (i === 0) {
        //take first element and play it instantly
        itemObject["title"] = this.state.playlist[i].title;
        itemObject["channelTitle"] = this.state.playlist[i].channelTitle;
        itemObject["videoId"] = this.state.playlist[i].videoId;
        itemObject["uniqueId"] = Math.random();
        this.onPlay(itemObject);
      } else {
        //other elements go to queue
        itemObject["title"] = this.state.playlist[i].title;
        itemObject["channelTitle"] = this.state.playlist[i].channelTitle;
        itemObject["videoId"] = this.state.playlist[i].videoId;
        itemObject["uniqueId"] = Math.random();
        itemArray.push(itemObject);
      }
      //console.log(this.state.playlist[i]);
    }
    this.setState({
      queue: itemArray
    });
    //this.onPlay(itemArray[0]);
  }
  addPlaylistToQueue() {
    let playlist = this.state.playlist;
    let queue = this.state.queue;
    // console.log(playlist);
    // console.log("Hello?");

    for (let i = 0; i < playlist.length; i++) {
      let object = {};
      object["title"] = playlist[i]["title"];
      object["videoId"] = playlist[i]["videoId"];
      object["channelTitle"] = playlist[i]["channelTitle"];
      object["uniqueId"] = Math.random();
      queue.push(object);
    }
    this.setState({
      queue: queue
    });
  }
  AddToPlaylist(item) {
    if (this.state.playlistId === "" && this.state.playlistName === "") {
      //this.makePlaylist();
      alert(
        "No playlist selected. Creating a new playlist.\n" +
          "Generating name..."
      );
      this.state.playlist.push(item);
      this.makePlaylist(nameGenerator(), this.state.playlist);
      this.setState({
        updated: item
      });
      setTimeout(
        () =>
          this.Updateplaylist(this.state.playlistName, this.state.playlistId),
        2000
      );
    } else {
      this.state.playlist.push(item);
      this.Updateplaylist(this.state.playlistName, this.state.playlistId);

      this.setState({
        updated: item
      });
    }
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
    //this.Updateplaylist(this.state.playlistName, this.state.playlistId);
  }
  async handleSubmit(termFromSearch) {
    const result = await handleSubmit(termFromSearch);
    // console.log(result);
    this.setState({
      items: result
    });
  }
  async loadPlaylist(id) {
    //const id = playlist._id;
    //console.log(id);
    const result = await getPlayListById(id);
    //console.log(result.data);
    this.setState({
      playlist: result.data.playlist,
      playlistName: result.data.name,
      playlistId: result.data._id
    });
  }
  async getPlaylist() {
    //TODO: muuta nimi getPlayLists
    const result = await getPlaylists();
    //console.log(result);
    this.setState({
      playlists: result.data.Playlist
    });
  }
  async makePlaylist(name, playlist) {
    this.setState({
      playlist: playlist
    });
    //let playlist = this.state.playlist;
    const item = JSON.stringify({ name, playlist });
    const result = await makePlaylist(item);
    //console.log(result.data._id);
    this.setState({
      playlistId: result.data._id,
      playlistName: result.data.name
    });
  }
  async UpdateCurrentPlaylist() {
    this.Updateplaylist(this.state.playlistName, this.state.playlistId);
  }
  async Updateplaylist(name, id) {
    let playlist = this.state.playlist;
    console.log(playlist);
    const item = JSON.stringify({ name, playlist });
    const result = await updatePlaylist(item, id);
    //console.log(result);
    this.setState({
      playlistName: result.data.name,
      playlist: playlist
    });
  }
  async deletePlaylist(id) {
    if (this.state.playlistId === id) {
      this.setState({
        playlistId: "",
        playlistName: "",
        playlist: []
      });
    }
    await deletePlaylist(id);
    this.getPlaylist();
  }
  onAdd(item) {
    //ADDS SELECTED ITEM TO QUEUE - PLAYER
    console.log(item);
    let object = {};
    object["title"] = item["title"];
    object["videoId"] = item["videoId"];
    object["channelTitle"] = item["channelTitle"];
    object["uniqueId"] = Math.random();
    //item["uniqueId"] = Math.random();
    this.state.queue.push(object);
    this.setState({
      //just to trigger re-render->new props to children
      updated: object
    });
    //console.log(this.state.queue);
    //console.log(videoId);
  }
  onDelete(item) {
    //delete from queue
    console.log(item);
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
  setUrl(url) {
    this.setState({
      url: url
    });
  }
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
  setTitle(title) {
    this.setState({
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
    //console.log(playlists);
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
                onAdd={this.onAdd}
                AddToPlaylist={this.AddToPlaylist}
                onPlay={this.onPlay}
                setUrl={this.setUrl}
                setTitle={this.setTitle}
              />

              <Queue
                queue={queue}
                onRemove={this.onDelete}
                onPlay={this.onPlay}
                shuffleQueue={this.shuffleQueue}
                clearQueue={this.clearQueue}
                setQueue={this.setQueue}
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
                deletePlaylist={this.deletePlaylist}
                onAdd={this.onAdd}
                UpdateCurrentPlaylist={this.UpdateCurrentPlaylist}
                setPlaylist={this.setPlaylist}
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
