import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Queue from "../queue/queue";

import ArtistModal from "../modal/artistmodal/ArtistModal";
import AlbulModal from "../modal/Modal";
import AllSongsModal from "../modal/allsongsmodal/Modal";

import Playlist from "../playlist/playlist";
import SideBar from "../sidebar/sidebar";
import nameGenerator from "../functions/nameGenerator";
import { Song } from "../classes/index";
import MediaPlayer from "../mediaplayer/mediaplayer";
import isEqual from "react-fast-compare";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import "./homepage.css";
import {
  handleSubmit,
  handleSubmit_db,
  makePlaylist,
  updatePlaylist,
  getPlayListById,
  getContentDetails,
  addUserPlaylist,
  deleteUserPlaylist,
  updateUserPlaylist,
  searchArtists,
  getArtistData,
  getArtistAlbumData,
  getPlaylist,
  addSongToPlaylist,
} from "../functions/functions";
import { authenticationService } from "../functions/authenthication";
import Spinner from "../spinner/spinner4";

var stringSimilarity = require("string-similarity");

type HomepageState = {
  items: Array<Song>;
  queue: Array<Song>;
  playlist: Array<Song>;
  contentDetails: Array<any>;
  Allplaylists: Array<any>;
  playlists: Array<any>;
  loading: boolean;
  updated: boolean;
  url: string;
  playing: boolean;
  playlistId: string;
  playlistName: string;
  error: boolean;
  title: string;
  user: any;
  token: string;
  userName: string;
  userRole: string;
  private?: boolean;
  playlistOwner?: string;
  loadingPlaylist?: boolean;
  loadingPlaylists?: boolean;
  duration?: string;
  focusedTab: string;
  dbitems: any;
  shuffle: boolean;
  artist?: string;
  showModal?: boolean;
  showArtistModal?: boolean;
  artistAlbums?: any;
  artistSubscribers?: any;
  artistSingles?: any;
  artistViews?: any;
  artistDescription?: any;
  artistSongs?: any;
  artistThumbnails?: any;
  artistName?: any;
  isArtist?: boolean;
  albumBrowseId?: any;
  albumThumbnails?: any;
  albumTitle?: any;
  albumYear?: any;
  currentSong?: any;
  showAllSongsModal?: boolean;
  loadingAllSongs?: boolean;
  allSongs?: any;
  playlistIndex: number;
};
export default class Homepage extends Component<any, HomepageState> {
  player: any;
  constructor(props: any) {
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
    this.playNext = this.playNext.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.handleDB = this.handleDB.bind(this);
    this.setTab = this.setTab.bind(this);
    this.setShuffle = this.setShuffle.bind(this);
    this.state = {
      items: [], //from youtube API
      queue: [],
      playlist: [],
      contentDetails: [],
      Allplaylists: [], //all of the playlists, maybe render seperately somewhere
      //could add public/private playlists etc.
      playlists: this.props?.data?.playlists || [], //users playlists
      loading: false,
      updated: false,
      url: "",
      playing: true,
      playlistId: "",
      playlistName: "",
      error: false,
      title: "",
      user: null,
      token: "",
      userName: "",
      userRole: "",
      loadingPlaylists: false,
      loadingPlaylist: false,
      duration: "",
      focusedTab: "1",
      dbitems: [],
      shuffle: false,
      artist: "",
      allSongs: [],
      playlistIndex: 0,
    };
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  toggleArtistModal2 = () => {
    this.setState({
      showArtistModal: !this.state.showArtistModal,
    });
  };
  toggleArtistModal = async (artist: any) => {
    if (artist.id) {
      this.setState({
        showArtistModal: false,
      });
      this.setLoading(true);
      const res = await getArtistData(artist.id);

      let albums = [];
      if (res && res.albums && res.albums.browseId) {
        const albumData = await getArtistAlbumData(
          res.albums.browseId,
          res.albums.params
        );

        albums = albumData;
      }
      this.setLoading(false);

      if (!res.albums || !albums) {
        albums = [0, 1];
      }
      /*   console.log(res); */
      this.setState({
        artistAlbums: albums.length > 0 ? albums : res.albums.results,
        artistSubscribers: res.subscribers,
        artistSingles: res.singles,
        artistViews: res.views,
        artistDescription: res.description,
        artistSongs: res.songs,
        artistThumbnails: res.thumbnails,
        showArtistModal: true,
        artistName: res.name,
      });
    }
  };
  toggleAllSongsModal = async (browseid: string) => {
    this.setState({
      showAllSongsModal: false,
      loadingAllSongs: true,
    });
    const res = await getPlaylist(browseid);
    this.setState({
      allSongs: res.tracks,
    });
    //
    // Get data from that browseid and pass them to our state and ẃe pass the state to the new modal:P
    // Not the most performant shit but w.e really. It's couple re-renders.
    //

    this.setState({
      showAllSongsModal: true,
      loadingAllSongs: false,
    });
  };
  toggleAllSongsModal123 = () => {
    this.setState({
      showAllSongsModal: !this.state.showAllSongsModal,
    });
  };
  toggleAlbumModal = (props: any) => {
    this.setState({
      showModal: !this.state.showModal,
      albumBrowseId: props.browseId,
      albumThumbnails: props.thumbnails,
      albumTitle: props.title,
      albumYear: props.year,
      isArtist: false,
    });
  };
  componentDidUpdate(prevProps: any) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        user: this.props.data,
      });

      this.setState({
        playlists: this.props.data.playlists,
      });
    }
  }
  getArtists = async (query: any) => {
    if (!query) return;
    this.setState({
      error: false,
      loading: true,
      items: [],
    });
    const result = await searchArtists(query);
    this.setState({
      items: result,
      loading: false,
    });
  };
  setShuffle() {
    this.setState({
      shuffle: !this.state.shuffle,
    });
  }
  setArtist = (artists: any) => {
    if (!artists || !artists[0]) {
      this.setState({
        artist: "",
      });
      return;
    }
    this.setState({
      artist: artists[0].name,
    });
  };
  playNext(item: Song) {
    let a = Object.assign({}, item);
    a["uniqueId"] = Math.random();
    this.state.queue.unshift(a);
    this.setState({
      updated: true,
    });
    toaster.notify(<span>{item.title} added to in front of the queue.</span>, {
      duration: 800,
    });
  }
  setPlaying(playing: boolean) {
    this.setState({
      playing: playing,
    });
  }
  setQueue(queue: Array<Song>) {
    this.setState({
      queue: queue,
    });
  }
  isSame(array1: Array<Song>, array2: Array<Song>) {
    //checks for two arrays if they have same items/songs
    for (let i = 0; i < array1.length; i++) {
      if (array1[i].title !== array2[i].title) {
        return false;
      }
    }
    return true;
  }
  sortBySimilarity = (items: any, term: string) => {
    for (const item of items) {
      item.similarity = stringSimilarity.compareTwoStrings(item.title, term);
    }
    items.sort(function (a: any, b: any) {
      return b.similarity - a.similarity;
    });
    return items;
  };
  async handleDB(items: any, term: string) {
    if (!term) return;
    this.setState({
      error: false,
      loading: true,
    });
    const result = await handleSubmit_db(term);
    /*  let sorted = this.sortBySimilarity(result, term); */
    this.setState({
      dbitems: result,
      loading: false,
    });
    if (result.length === 0) {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }
  addSongToPlaylist = async (track: any, id: string) => {
    let itemCopy = Object.assign({}, track);
    itemCopy["uniqueId"] = Date.now() + Math.random(); //ensure that all elements have unique keys
    const item = JSON.stringify({ track: itemCopy });

    if (this.state.playlistId === id) {
      this.setState((prevState) => ({
        playlist: [...prevState.playlist, itemCopy],
      }));
    }
    await addSongToPlaylist(item, id);
  };
  shuffleQueue() {
    //Fiter-Yates shuffle
    //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    let Array = this.state.queue;
    for (let i = Array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [Array[i], Array[j]] = [Array[j], Array[i]];
    }
    this.setState({
      queue: Array,
    });
  }
  clearQueue() {
    if (typeof this.state.queue[0] !== "undefined") {
      this.setState({
        queue: [],
      });
    }
  }
  setPlaylist(playlistitems: Array<Song>) {
    //updates state to given playlist
    this.setState({
      playlist: playlistitems,
    });
  }
  componentDidMount() {
    const currentUser = authenticationService.currentUserValue;

    if (currentUser && currentUser.token) {
      this.setState({
        token: currentUser.token,
        userName: currentUser.user.name,
        userRole: currentUser.user.role,
      });
    }
  }
  componentWillUnmount() {
    //authenticationService.currentUser.unsubscribe();
  }
  playPlaylist(playlist: Array<Song>, playlistname: string) {
    //replaces queue with active playlist

    var itemArray = [];
    for (let i = 0; i < playlist.length; i++) {
      if (i === 0) {
        //take first element and play it instantly
        const song = new Song(
          playlist[i].title,
          playlist[i].channelTitle,
          playlist[i].videoId,
          Math.random(),
          playlist[i].duration,
          playlist[i].artists,
          playlist[i].album,
          playlist[i].thumbnail,
          playlist[i].thumbnails
        );

        this.onPlay(song);
      } else {
        //other elements go to queue
        const song = new Song(
          playlist[i].title,
          playlist[i].channelTitle,
          playlist[i].videoId,
          Math.random(),
          playlist[i].duration,
          playlist[i].artists,
          playlist[i].album,
          playlist[i].thumbnail,
          playlist[i].thumbnails
        );
        itemArray.push(song);
      }
    }
    this.setState({
      queue: itemArray,
    });
    toaster.notify(
      <span className="styled-toast">
        Now playing: {playlistname ? playlistname : this.state.playlistName}
      </span>,
      {
        duration: 1200,
      }
    );
    //this.onPlay(itemArray[0]);
  }
  setTab = (i: string) => {
    this.setState({
      focusedTab: i,
    });
  };
  addPlaylistToQueue(playlist: Array<Song>, playlistname: string) {
    //adds active playlist to queue
    //let playlist = this.state.playlist;
    let queue = this.state.queue;
    // console.log(playlist);
    // console.log("Hello?");

    for (let i = 0; i < playlist.length; i++) {
      const song = new Song(
        playlist[i].title,
        playlist[i].channelTitle,
        playlist[i].videoId,
        Math.random(),
        playlist[i].duration,
        playlist[i].artists,
        playlist[i].album,
        playlist[i].thumbnail,
        playlist[i].thumbnails
      );
      queue.push(song);
    }
    this.setState({
      queue: queue,
    });

    toaster.notify(
      <span>
        {playlistname ? playlistname : this.state.playlistName} added to the
        queue!
      </span>,
      {
        duration: 1200,
      }
    );
  }
  async AddToPlaylist(item: Song) {
    //Adds item to active playlist and updates the state & database
    //if no item is found, generates name for new
    if (this.state.playlistId === "" && this.state.playlistName === "") {
      //this.makePlaylist();
      alert(
        "No playlist selected. Creating a new playlist.\n" +
          "Generating name..."
      );
      this.state.playlist.push(item);
      /*     this.setState((prevState) => ({
        playlist: [...prevState.playlist, item],
      })); */
      await this.makePlaylist(
        nameGenerator(),
        this.state.playlist,
        true,
        "Random"
      );
      this.setState({
        updated: !this.state.updated,
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
        duration: 750,
      });
    } else {
      this.state.playlist.push(item);
      const playlistName = this.state.playlistName;
      const playlist = this.state.playlist;
      const playlistId = this.state.playlistId;
      const isPrivate = this.state.private;
      if (this.updateTimer) {
        clearTimeout(this.updateTimer);
      }
      this.updateTimer = setTimeout(() => {
        this.UpdatePlaylistInParameters(
          playlist,
          playlistName,
          playlistId,
          isPrivate
        );
      }, 2000);

      this.setState({
        updated: !this.state.updated,
      });
      toaster.notify(<span>{item.title} added to the playlist.</span>, {
        duration: 750,
      });
    }
    this.setState({
      playlistIndex: this.state.playlistIndex + 1,
    });
  }
  updateTimer: any;
  onDeleteFromPlaylist(item: Song) {
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
      updated: !this.state.updated,
    });

    //this.Updateplaylist(this.state.playlistName, this.state.playlistId);
  }
  async handleSubmit(termFromSearch: String, tries = 10) {
    if (!termFromSearch) return;
    //handles search-query from search bar webscraping
    this.setState({
      //set loading to true
      loading: true,
      error: false,
      items: [],
    });
    const result = await handleSubmit(termFromSearch);
    //const result = await handleSubmit_db(termFromSearch);

    if (!result) {
      this.setState({
        error: true,
        loading: false,
        items: [],
      });
      return;
    }
    //console.log(result);
    if (result.length === 0) {
      if (tries > 0) {
        this.handleSubmit(termFromSearch, tries - 1);
        return;
      }
      this.setState({
        error: true,
        loading: false,
        items: [],
      });
      return;
    }
    this.setState({
      items: result,
      loading: false,
    });
  }
  async handleSubmitdb(termFromSearch: String, tries = 10) {
    //handles search-query from search bar webscraping
    this.setState({
      //set loading to true
      loading: true,
      error: false,
      items: [],
    });
    //const result = await handleSubmit(termFromSearch);
    const result = await handleSubmit_db(termFromSearch);

    if (!result) {
      this.setState({
        error: true,
        loading: false,
        items: [],
      });
      return;
    }
    //console.log(result);
    if (result.length === 0) {
      this.setState({
        error: true,
        loading: false,
        items: [],
      });
      return;
    }
    this.setState({
      items: result,
      loading: false,
    });
  }
  async handleSubmit2(termFromSearch: String) {
    //handles search-query from search bar to YouTube API
    this.setState({
      //set loading to true
      loading: true,
    });
    const result = await handleSubmit(termFromSearch);

    if (result === null) {
      this.setState({
        error: true,
      });
      return;
    }
    var listOfIds: any = [];
    result.map((item: any) => listOfIds.push(item.id.videoId));
    listOfIds = listOfIds.join(",");
    const contentDetails = await getContentDetails(listOfIds);
    //console.log(contentDetails);
    this.setState({
      items: result,
      contentDetails: contentDetails,
      loading: false,
    });
  }
  async loadPlaylist(id: String) {
    //loads a single database based on the id

    this.setState({
      loadingPlaylist: true,
      playlist: [],
      playlistName: "Loading...",
    });
    const result: any = await getPlayListById(id);

    this.setState({
      playlist: result.data.playlist,
      playlistName: result.data.name,
      playlistId: result.data._id,
      loading: false,
      private: result.data.private,
      playlistOwner: result.data.owner,
      loadingPlaylist: false,
      playlistIndex: this.state.playlistIndex + 1,
    });
    return "OK";
  }
  setLoading(status: boolean) {
    this.setState({
      loadingPlaylists: status,
    });
  }
  async getPlaylist() {
    //called when making changes to the playlists, don't remove

    await this.props.loadUser();

    //gets ALL playlists from database
  }
  async makePlaylist(
    name: String,
    playlist: Array<Song>,
    isPrivate: boolean,
    genre: String
  ) {
    //API request to create a new playlist (database)
    //console.log(this.state.user.name);

    this.setState({
      playlist: playlist,
    });
    //let playlist = this.state.playlist;
    //console.log(isPrivate);
    const item = JSON.stringify({
      name,
      playlist,
      isPrivate,
      owner: this.state.userName,
      genre,
    });
    this.setLoading(true);
    const result: any = await makePlaylist(item);
    const data = result.data;

    addUserPlaylist(
      data._id,
      data.name,
      data.private,
      data.owner,
      data.createdAt,
      this.state.token
    );
    //updateUsersPlaylistarray
    //console.log(result.data._id);
    this.setState({
      playlistId: result.data._id,
      playlistName: result.data.name,
      private: isPrivate,
    });
    this.forceUpdate();
    await this.getPlaylist();
    this.setLoading(false);
  }
  async UpdateCurrentPlaylist() {
    //updates current status of active playlist to database
    this.Updateplaylist(
      this.state.playlistName,
      this.state.playlistId,
      this.state.private
    );
  }
  UpdatePlayListStatus = async (
    name: String,
    id: String,
    playlist: any,
    isPrivate?: boolean
  ) => {
    const item = JSON.stringify({ name, playlist, private: isPrivate });
    await updatePlaylist(item, id);
    updateUserPlaylist(id, name, isPrivate, this.state.token);
  };
  async Updateplaylist(name: String, id: String, isPrivate?: boolean) {
    //updates current state to name & id given to database
    let playlist = this.state.playlist;
    //console.log(playlist);

    const item = JSON.stringify({ name, playlist, private: isPrivate });
    const result = await updatePlaylist(item, id);
    updateUserPlaylist(id, name, isPrivate, this.state.token);
    //console.log(result);
    this.setState({
      playlistName: result.data.name,
      playlist: playlist,
    });

    await this.getPlaylist();
  }
  async UpdatePlaylistInParameters(
    playlist: any,
    name: String,
    id: String,
    isPrivate?: boolean
  ) {
    //updates current state to name & id given to database

    //console.log(playlist);

    const item = JSON.stringify({ name, playlist, private: isPrivate });
    await updatePlaylist(item, id);
    updateUserPlaylist(id, name, isPrivate, this.state.token);
    //console.log(result);
    /*     this.setState({
      playlistName: result.data.name,
      playlist: playlist,
    });

    await this.getPlaylist(); */
  }
  async deletePlaylist(id: String) {
    //DELETE PLAYLIST BASED ON ID
    if (this.state.playlistId === id) {
      this.setState({
        playlistId: "",
        playlistName: "",
        playlist: [],
      });
    }
    for (let i = 0; i < this.state.playlists.length; i++) {
      if (this.state.playlists[i]._id === id) {
        //delete item from playlists
        this.state.playlists.splice(i, 1);
        break;
      }
    }
    this.setState({
      //trigger re-render
      updated: true,
    });
    //await deletePlaylist(id); this is for deleting whole together a playlist from db
    this.setLoading(true);
    await deleteUserPlaylist(id, this.state.token); //deletes playlist from the user
    //delete users playlist
    this.setLoading(false);

    this.getPlaylist();
  }
  onAdd(item: Song) {
    //ADDS SELECTED ITEM TO QUEUE - -> PLAYER & QUEUE
    //console.log(item);
    let itemCopy = Object.assign({}, item);
    itemCopy["uniqueId"] = Date.now() + Math.random(); //ensure that all elements have unique keys
    this.state.queue.push(itemCopy);
    this.setState({
      //just to trigger re-render->new props to children
      updated: !this.state.updated,
    });
    //console.log(this.state.queue);
    //console.log(videoId);
    toaster.notify(<span>{item.title} added to the queue.</span>, {
      duration: 800,
    });
  }
  onDelete(item: Song) {
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
      updated: !this.state.updated,
    });
  }
  ref = (player: any) => {
    //reference to player Child
    this.player = player;
  };
  setUrl(url: string) {
    //updates given url to the state

    this.setState({
      url: url,
      playing: true,
    });
  }
  onPlay(item: any) {
    //sets given item to be played
    if (!item) return;

    this.state.queue.unshift(item);

    const videoId = item.videoId;
    const title = item.title;
    const duration = item.duration;
    const artist = item.artists && item.artists[0] && item.artists[0].name;
    //console.log(item);
    const url = "https://www.youtube.com/watch?v=" + videoId;
    if (url === this.state.url) {
      this.player.seekTo0(); //Seeks to 0 incase of having same url
    }
    this.setState({
      url: url, //url gets passed to player as props
      duration: duration,
      playing: true,
      updated: true,
      title: title,
      artist: artist ? artist : null,
    });
    this.setCurrentSong(item);
    /*this.setState({
      title: title,
    });
    toaster.notify(<span>Now playing: {title}</span>, {
      duration: 1200,
      position: "bottom",
    });*/
    this.player.handleEnded();
  }
  setTitle(title: string) {
    this.setState({
      title: title,
    });
  }
  setCurrentSong = (song: Song) => {
    this.setState({
      currentSong: song,
    });
  };
  render() {
    const queue = this.state.queue;
    const url = this.state.url;
    const playlists = this.state.playlists;

    return (
      <div className={this.props.darkMode ? "homepage-div" : "homepage-div2"}>
        <div id="spinnerDivHomePage">
          {this.state.loadingPlaylist ? (
            <Spinner size={50} color="#009688" />
          ) : null}
          {this.state.loadingPlaylists ? (
            <Spinner size={50} color="#009688" style={{ zIndex: 999999 }} />
          ) : null}
          <AlbulModal
            show={this.state.showModal}
            toggleModal={this.toggleModal}
            artist={this.state.isArtist}
            albumBrowseId={this.state.albumBrowseId}
            albumThumbnails={this.state.albumThumbnails}
            albumTitle={this.state.albumTitle}
            albumYear={this.state.albumYear}
            addFunc={this.onAdd}
            onPlay={this.onPlay}
            addPlaylistToQueue={this.addPlaylistToQueue}
            playPlaylist={this.playPlaylist}
            playNext={this.playNext}
            playlists={this.state.playlists}
            AddToPlaylist={this.AddToPlaylist}
            loadPlaylist={this.loadPlaylist}
            makePlaylist={this.makePlaylist}
            toggleArtistModal={this.toggleArtistModal}
            addSongToPlaylist={this.addSongToPlaylist}
          />
          <ArtistModal
            loading={this.state.loadingAllSongs}
            show={this.state.showArtistModal}
            toggleModal={this.toggleArtistModal2}
            artistAlbums={this.state.artistAlbums}
            artistSingles={this.state.artistSingles}
            artistName={this.state.artistName}
            artistDescription={this.state.artistDescription}
            artistSongs={this.state.artistSongs}
            artistSubscribers={this.state.artistSubscribers}
            artistThumbnails={this.state.artistThumbnails}
            artistViews={this.state.artistViews}
            artist={this.state.isArtist}
            addFunc={this.onAdd}
            onPlay={this.onPlay}
            addPlaylistToQueue={this.addPlaylistToQueue}
            playPlaylist={this.playPlaylist}
            playNext={this.playNext}
            playlists={this.state.playlists}
            AddToPlaylist={this.AddToPlaylist}
            loadPlaylist={this.loadPlaylist}
            toggleAlbumModal={this.toggleAlbumModal}
            toggleAllSongsModal={this.toggleAllSongsModal}
          />
          <AllSongsModal
            show={this.state.showAllSongsModal}
            toggleModal={this.toggleAllSongsModal123}
            allSongs={this.state.allSongs}
            addFunc={this.onAdd}
            onPlay={this.onPlay}
            addPlaylistToQueue={this.addPlaylistToQueue}
            playPlaylist={this.playPlaylist}
            playNext={this.playNext}
            artistName={this.state.artistName}
            AddToPlaylist={this.AddToPlaylist}
          />
          <Row>
            <Col sm="8" className="homepage2">
              <Row>
                <Col sm="2" className="sidebar">
                  <SideBar
                    loadPlaylist={this.loadPlaylist}
                    playlists={playlists}
                    getPlaylist={this.getPlaylist}
                    deletePlaylist={this.deletePlaylist}
                    makePlaylist={this.makePlaylist}
                    playlistName={this.state.playlistName}
                    setLoading={this.setLoading}
                  />
                </Col>
                <Col sm="10" className="playlist">
                  <br />
                  <Playlist
                    playNext={this.playNext}
                    userName={this.state.userName}
                    userRole={this.state.userRole}
                    playlists={playlists}
                    playlistOwner={this.state.playlistOwner}
                    isPrivate={this.state.private}
                    playlist={this.state.playlist}
                    playlistName={this.state.playlistName}
                    playlistId={this.state.playlistId}
                    getPlayList={this.getPlaylist}
                    onDeleteFromPlaylist={this.onDeleteFromPlaylist}
                    onPlay={this.onPlay}
                    addPlaylistToQueue={this.addPlaylistToQueue}
                    playPlaylist={this.playPlaylist}
                    onRemove={this.onDelete}
                    makePlaylist={this.makePlaylist}
                    Updateplaylist={this.Updateplaylist}
                    deletePlaylist={this.deletePlaylist}
                    onAdd={this.onAdd}
                    UpdateCurrentPlaylist={this.UpdateCurrentPlaylist}
                    setPlaylist={this.setPlaylist}
                    setLoading={this.setLoading}
                    toggleModal={this.toggleModal}
                    toggleArtistModal2={this.toggleArtistModal2}
                    toggleArtistModal={this.toggleArtistModal}
                    toggleAlbumModal={this.toggleAlbumModal}
                    playlistIndex={this.state.playlistIndex}
                    addSongToPlaylist={this.addSongToPlaylist}
                    UpdatePlayListStatus={this.UpdatePlayListStatus}
                  />
                </Col>
              </Row>
            </Col>

            <Col sm="4" className="homepage3">
              <br />
              <Search
                handleSubmit={this.handleSubmit}
                handleSubmitdb={this.handleSubmitdb}
                handleDB={this.handleDB}
                setTab={this.setTab}
                getArtists={this.getArtists}
              />
              <hr />
              <Videolist
                addSongToPlaylist={this.addSongToPlaylist}
                toggleArtistModal={this.toggleArtistModal}
                toggleAlbumModal={this.toggleAlbumModal}
                loadPlaylist={this.loadPlaylist}
                makePlaylist={this.makePlaylist}
                playNext={this.playNext}
                playlists={playlists}
                loading={this.state.loading}
                items={
                  this.state.focusedTab === "1"
                    ? this.state.dbitems
                    : this.state.items
                }
                onAdd={this.onAdd}
                onPlay={this.onPlay}
                addPlaylistToQueue={this.addPlaylistToQueue}
                playPlaylist={this.playPlaylist}
                AddToPlaylist={this.AddToPlaylist}
                error={this.state.error}
                errorText={
                  this.state.focusedTab === "1"
                    ? "Please try searching for that on YouTube! Cannot find it from our DB yet :(."
                    : "Please try again"
                }
              />
              <Queue
                addSongToPlaylist={this.addSongToPlaylist}
                queue={queue}
                onRemove={this.onDelete}
                onPlay={this.onPlay}
                shuffleQueue={this.shuffleQueue}
                clearQueue={this.clearQueue}
                setQueue={this.setQueue}
                isShuffle={this.state.shuffle}
                toggleArtistModal={this.toggleArtistModal}
                toggleAlbumModal={this.toggleAlbumModal}
                playlists={playlists}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="12" className="mediaplayer">
              <MediaPlayer
                setArtist={this.setArtist}
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
                duration={this.state.duration}
                playlistId={this.state.playlistId}
                setShuffle={this.setShuffle}
                isShuffle={this.state.shuffle}
                artist={this.state.artist}
                setCurrentSong={this.setCurrentSong}
                currentSong={this.state.currentSong}
                toggleArtistModal={this.toggleArtistModal}
                toggleAlbumModal={this.toggleAlbumModal}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
