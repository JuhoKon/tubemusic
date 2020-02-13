import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Queue from "../queue/queue";
import Player from "../player/Player";
import Playlist from "../playlist/playlist";
import nameGenerator from "../functions/nameGenerator";
import isEqual from "react-fast-compare";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import "./homepage.css";
import {
  handleSubmit,
  getPlaylists,
  makePlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlayListById,
  getContentDetails,
  addUserPlaylist,
  deleteUserPlaylist,
  updateUserPlaylist
} from "../functions/functions";
import { authenticationService } from "../functions/authenthication";
export default class Homepage extends Component {
  constructor(props) {
    super(props);

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
    this.setPlaying = this.setPlaying.bind(this);
    this.state = {
      items: [], //from youtube API
      queue: [],
      playlist: [],
      contentDetails: [],
      Allplaylists: [], //all of the playlists, maybe render seperately somewhere
      //could add public/private playlists etc.
      playlists: [], //users playlists
      loading: false,
      updated: "",
      url: null,
      playing: true,
      playlistId: "",
      playlistName: "",
      error: false,
      title: ""
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        user: this.props.data
      });
      if (this.props.data) {
        this.setState({
          playlists: this.props.data.playlists
        });
      }
    }
  }
  setPlaying(playing) {
    this.setState({
      playing: playing
    });
  }
  setQueue(queue) {
    console.log(this.state.url);
    this.setState({
      queue: queue
    });
    console.log(this.state.url);
  }
  isSame(array1, array2) {
    //checks for two arrays if they have same items/songs
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
    //updates state to given playlist
    this.setState({
      playlist: playlistitems
    });
    console.log(playlistitems);
  }
  componentDidMount() {
    const currentUser = authenticationService.currentUserValue;

    if (currentUser && currentUser.token) {
      this.setState({
        token: currentUser.token,
        userName: currentUser.user.name
      });
    }
  }
  componentWillUnmount() {
    //authenticationService.currentUser.unsubscribe();
  }
  playPlaylist(playlist) {
    //replaces queue with active playlist

    var itemArray = [];
    for (let i = 0; i < playlist.length; i++) {
      let itemObject = {};
      if (i === 0) {
        //take first element and play it instantly
        itemObject["title"] = playlist[i].title;
        itemObject["channelTitle"] = playlist[i].channelTitle;
        itemObject["videoId"] = playlist[i].videoId;
        itemObject["uniqueId"] = Math.random();
        itemObject["duration"] = playlist[i].duration;
        this.onPlay(itemObject);
      } else {
        //other elements go to queue
        itemObject["title"] = playlist[i].title;
        itemObject["channelTitle"] = playlist[i].channelTitle;
        itemObject["videoId"] = playlist[i].videoId;
        itemObject["uniqueId"] = Math.random();
        itemObject["duration"] = playlist[i].duration;
        itemArray.push(itemObject);
      }
      //console.log(playlist[i]);
    }
    this.setState({
      queue: itemArray
    });
    toaster.notify(<span>Now playing: {this.state.playlistName}</span>, {
      duration: 1200
    });
    //this.onPlay(itemArray[0]);
  }
  addPlaylistToQueue(playlist) {
    //adds active playlist to queue
    //let playlist = this.state.playlist;
    let queue = this.state.queue;
    // console.log(playlist);
    // console.log("Hello?");

    for (let i = 0; i < playlist.length; i++) {
      let object = {};
      object["title"] = playlist[i]["title"];
      object["videoId"] = playlist[i]["videoId"];
      object["channelTitle"] = playlist[i]["channelTitle"];
      object["duration"] = playlist[i]["duration"];
      object["uniqueId"] = Math.random();
      queue.push(object);
    }
    this.setState({
      queue: queue
    });
    toaster.notify(<span>{this.state.playlistName} added to the queue!</span>, {
      duration: 1200
    });
  }
  AddToPlaylist(item) {
    console.log(item);
    //Adds item to active playlist and updates the state & database
    //if no item is found, generates name for new
    if (this.state.playlistId === "" && this.state.playlistName === "") {
      //this.makePlaylist();
      alert(
        "No playlist selected. Creating a new playlist.\n" +
          "Generating name..."
      );
      this.state.playlist.push(item);
      this.makePlaylist(nameGenerator(), this.state.playlist, true);
      this.setState({
        updated: item
      });
      setTimeout(
        () =>
          this.Updateplaylist(
            this.state.playlistName,
            this.state.playlistId,
            this.state.private
          ),
        100
      );
      toaster.notify(<span>{item.title} added to the playlist.</span>, {
        duration: 750
      });
    } else {
      this.state.playlist.push(item);
      this.Updateplaylist(
        this.state.playlistName,
        this.state.playlistId,
        this.state.private
      );

      this.setState({
        updated: item
      });
      toaster.notify(<span>{item.title} added to the playlist.</span>, {
        duration: 750
      });
    }
  }
  onDeleteFromPlaylist(item) {
    //deletes item from the active playlist from state
    if (!item) return;
    if (typeof this.state.playlist[0] === "undefined") return;

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
    //handles search-query from search bar webscraping
    this.setState({
      //set loading to true
      loading: true
    });
    const result = await handleSubmit(termFromSearch);
    console.log(result);
    //console.log(result);
    if (result === null) {
      this.setState({
        error: true
      });
      return;
    }
    this.setState({
      items: result,
      loading: false
    });
  }
  async handleSubmit2(termFromSearch) {
    //handles search-query from search bar to YouTube API
    this.setState({
      //set loading to true
      loading: true
    });
    const result = await handleSubmit(termFromSearch);
    //console.log(result);
    if (result === null) {
      this.setState({
        error: true
      });
      return;
    }
    var listOfIds = [];
    result.map(item => listOfIds.push(item.id.videoId));
    listOfIds = listOfIds.join(",");
    const contentDetails = await getContentDetails(listOfIds);
    //console.log(contentDetails);
    this.setState({
      items: result,
      contentDetails: contentDetails,
      loading: false
    });
  }
  async loadPlaylist(id) {
    //loads a single database based on the id
    const result = await getPlayListById(id);
    console.log(result.data);

    this.setState({
      playlist: result.data.playlist,
      playlistName: result.data.name,
      playlistId: result.data._id,
      loading: false,
      private: result.data.private,
      playlistOwner: result.data.owner
    });
  }
  async getPlaylist() {
    //called when making changes to the playlists, don't remove
    this.props.loadUser();
    //gets ALL playlists from database
    const result = await getPlaylists();
    //console.log(result);
    this.setState({
      Allplaylists: result.data.Playlist
    });
  }
  async makePlaylist(name, playlist, isPrivate) {
    //API request to create a new playlist (database)
    //console.log(this.state.user.name);

    this.setState({
      playlist: playlist
    });
    //let playlist = this.state.playlist;
    //console.log(isPrivate);
    const item = JSON.stringify({
      name,
      playlist,
      isPrivate,
      owner: this.state.userName
    });
    const result = await makePlaylist(item);
    addUserPlaylist(result.data._id, result.data.name, this.state.token);
    //updateUsersPlaylistarray
    //console.log(result.data._id);
    this.setState({
      playlistId: result.data._id,
      playlistName: result.data.name,
      private: isPrivate
    });
  }
  async UpdateCurrentPlaylist() {
    //updates current status of active playlist to database
    this.Updateplaylist(
      this.state.playlistName,
      this.state.playlistId,
      this.state.private
    );
  }
  async Updateplaylist(name, id, isPrivate) {
    //updates current state to name & id given to database
    let playlist = this.state.playlist;
    //console.log(playlist);
    console.log(isPrivate);
    const item = JSON.stringify({ name, playlist, private: isPrivate });
    const result = await updatePlaylist(item, id);
    updateUserPlaylist(id, name, this.state.token);
    //console.log(result);
    this.setState({
      playlistName: result.data.name,
      playlist: playlist
    });
  }
  async deletePlaylist(id) {
    //DELETE PLAYLIST BASED ON ID
    if (this.state.playlistId === id) {
      this.setState({
        playlistId: "",
        playlistName: "",
        playlist: []
      });
    }
    //await deletePlaylist(id); this is for deleting whole together a playlist from db
    await deleteUserPlaylist(id, this.state.token); //deletes playlist from the user
    //delete users playlist
    this.getPlaylist();
  }
  onAdd(item) {
    //ADDS SELECTED ITEM TO QUEUE - -> PLAYER & QUEUE
    //console.log(item);
    let object = {};
    object["title"] = item["title"];
    object["videoId"] = item["videoId"];
    object["channelTitle"] = item["channelTitle"];
    object["duration"] = item["duration"];
    object["uniqueId"] = Math.random(); //to ensure every track has an unique id.
    //item["uniqueId"] = Math.random();
    this.state.queue.push(object);
    this.setState({
      //just to trigger re-render->new props to children
      updated: object
    });
    //console.log(this.state.queue);
    //console.log(videoId);
    toaster.notify(<span>{item.title} added to the queue.</span>, {
      duration: 400
    });
  }
  onDelete(item) {
    //delete item from queue
    //console.log(item);
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
    //updates given url to the state

    this.setState({
      url: url,
      playing: true
    });
  }
  onPlay(item) {
    //sets given item to be played
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
    toaster.notify(<span>Now playing: {title}</span>, {
      duration: 1200,
      position: "bottom-left"
    });
  }
  setTitle(title) {
    this.setState({
      title: title
    });
  }
  render() {
    //console.log(this.state.error); /* ----TO CLEAN UP --- and switch to webscraping instead of youtube API (it sucks)*/
    const queue = this.state.queue;
    const url = this.state.url;
    const playlists = this.state.playlists;
    // console.log(this.props);
    const playlist = this.state.playlist;
    //console.log(this.state.private);
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
                setPlaying={this.setPlaying}
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
                userName={this.state.userName}
                playlists={playlists}
                playlistOwner={this.state.playlistOwner}
                isPrivate={this.state.private}
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
              <hr />
              <Videolist
                loading={this.state.loading}
                items={this.state.items}
                onAdd={this.onAdd}
                onPlay={this.onPlay}
                AddToPlaylist={this.AddToPlaylist}
                error={this.state.error}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
