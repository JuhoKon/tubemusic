import React, { Component } from "react";
import { getPlaylists, getPlayListById } from "../functions/functions";
import { authenticationService } from "../functions/authenthication";
import PlaylistsList from "./playlistsList";
import PlayListItem from "./playListItem";
import PlayListEditor from "./playlistEditor/playlistEditor";
import TableComponent from "../Tablecomponent/TableComponent";
//import PlaylistsList from "../admin/PlaylistsList";
import isEqual from "react-fast-compare";
import Spinner from "../spinner/spinnerNo2";
import { Row, Col, Input } from "reactstrap";
import GenresOptions from "../functions/genres";
import "./styles.css";
import Spinner2 from "../spinner/spinner3";
//https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class PublicPlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      token: "",
      filter: "",
      tracks: [],
      loading: false,
      filteredData: [],
      genreFilteredData: [],
      sortedPlaylists: [],
      data: this.props.data
    };
    this.loadPlaylists = this.loadPlaylists.bind(this);
    this.getPlayListById = this.getPlayListById.bind(this);
    // redirect to home if already logged in
  }

  async loadPlaylists() {
    this.setState({
      loadingPlaylists: true
    });
    await timeout(300);
    const res = await getPlaylists();
    this.setState({
      playlists: res.data.Playlist.reverse(),
      filteredData: res.data.Playlist,
      genreFilteredData: res.data.Playlist,
      sortedPlaylists: res.data.Playlist,
      loadingPlaylists: false
    });
  }
  async getPlayListById(id) {
    this.setState({
      loading: true
    });
    //tähä vois laittaa ihan pienen delayn.
    await timeout(2500);
    const result = await getPlayListById(id);
    this.setState({
      tracks: result.data.playlist,
      loading: false
    });
    //console.log(result);
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        user: this.props.data
      });
      if (this.props.data) {
        this.setState({
          Userplaylists: this.props.data.playlists,
          data: this.props.data
        });
      }
    }
  }
  componentDidMount() {
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      this.setState({
        token: currentUser.token,
        data: this.props.data
      });
      this.loadPlaylists();
    }
    this.props.loadUser();
  }
  onSortChange = e => {
    let filter = e.target.value;
    const { playlists } = this.state;
    switch (filter) {
      case "Latest":
        playlists.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
        break;
      case "Last":
        playlists.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
        break;
      case "By name":
        playlists.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "By owner":
        playlists.sort((a, b) => (a.owner > b.owner ? 1 : -1));
        break;
      default:
        break;
    }
    console.log("Yeps...");
    this.setState({
      sortedPlaylists: playlists
    });
  };
  onChange = e => {
    //genre
    let filter = e.target.value;
    console.log(filter);
    if (e.target.value === "All") filter = "";
    this.setState({ genreFilter: filter });
    const { playlists } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    //console.log(playlist);
    const filteredData = playlists.filter(item => {
      if (item === null || typeof item === "undefined") return playlists; //problems
      return Object.keys(item).some(
        key =>
          typeof item[key] === "string" &&
          key !== "_id" && //TODO: make it so only it can be filtered only by name or owner?
          //only filter based on name
          item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    this.setState({
      genreFilter: e.target.value,
      genreFilteredData: filteredData
    });
  };
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    console.log(this.state);
    const { token, filter } = this.state;
    const { playlists, genreFilteredData, sortedPlaylists } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    console.log(this.state.loadingPlaylists);
    let finalSorted = sortedPlaylists.filter(
      item => -1 !== genreFilteredData.indexOf(item)
    );

    console.log(sortedPlaylists);
    console.log(genreFilteredData);
    const filteredData = finalSorted.filter(item => {
      if (item === null || typeof item === "undefined") return finalSorted; //problems
      return Object.keys(item).some(
        key =>
          typeof item[key] === "string" &&
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt" && //TODO: make it so only it can be filtered only by name or owner?
          //only filter based on name
          item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    console.log(filteredData);
    return (
      <div className="container-fluid homepage-div">
        <div id="spinnerDiv">
          {this.state.loading ? <Spinner color="white" /> : null}
        </div>
        <div id="spinnerDiv2">
          {this.state.playlistsLoading ? (
            <Spinner size={50} color="white" />
          ) : null}
        </div>
        {/*tee uus spinneri sinne spinner kansioo , vähä elegantimpi ja tähä*/}
        <br />
        <div className="container-fluid">
          <Row>
            <Col xs="4" sm="4" className="spotifypage1">
              Playlists to choose from :)!
              <br />
              You can subscribe to public playlists or just load a playlist by
              clicking on the name and editing on the playlist-editor on the
              right side.
              <br />
              <br />
              <div className="inputDiv">
                <Input
                  id="filterId"
                  value={filter}
                  onChange={this.handleChange}
                  placeholder="Filter playlists..."
                />
                <Input
                  onChange={this.onSortChange}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  <option key={"Latest"} value={"Latest"}>
                    Latest
                  </option>
                  <option key={"Last"} value={"Last"}>
                    Last
                  </option>
                  <option key={"By name"} value={"By name"}>
                    By name
                  </option>
                  <option key={"By owner"} value={"By owner"}>
                    By owner
                  </option>
                </Input>
                {GenresOptions(this.onChange, true)}
              </div>
              <PlaylistsList
                userData={this.state.Userplaylists}
                loadPlaylists={this.loadPlaylists}
                token={token}
                playlists={filteredData}
                getPlayListById={this.getPlayListById}
                loading={this.state.loadingPlaylists}
              />
            </Col>
            <Col xs="8" sm="8" className="spotifypage2">
              Chosen playlist. With options to A) Make a copy to your playlists
              B) If it's a yhteissoittolista: "subscribe"
              <div
                className={
                  this.state.tracks.length
                    ? "playListEditorActive"
                    : "playListEditorNotActive"
                }
              >
                {this.state.tracks.length ? (
                  <PlayListEditor
                    data={this.props.data}
                    loadPlaylists={this.loadPlaylists}
                    token={token}
                    playlists={filteredData}
                    getPlayListById={this.getPlayListById}
                    tracks={this.state.tracks}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
