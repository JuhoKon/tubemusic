import React, { Component } from "react";
import SpotifyItem from "./spotifPlaylistitem";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../../spinner/spinner";
import { Input } from "reactstrap";
import "./spotifyPlaylist.css";
class SpotifyPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      userPlaylists: [],
      sortedPlaylists: [],
      filteredData: [],
      filter: "",
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        loading: this.props.loading,
        userPlaylists: this.props.Userplaylists,
        filteredData: this.props.Userplaylists,
        sortedPlaylists: this.props.Userplaylists,
      });
    }
  }
  onSortChange = (e) => {
    let filter = e.target.value;
    const playlists = [...this.state.userPlaylists];
    //shallow copy so we won't change props when sorting..........

    let sorted;
    switch (filter) {
      case "Latest":
        sorted = playlists;
        break;
      case "Last":
        sorted = playlists.sort((a, b) => (a < b ? 1 : -1));
        break;
      case "By name":
        sorted = playlists.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "By owner":
        sorted = playlists.sort((a, b) => (a.ownerName > b.ownerName ? 1 : -1));
        break;
      default:
        break;
    }

    this.setState({
      sortedPlaylists: sorted,
    });
  };
  handleChange = (event) => {
    const playlists = this.state.userPlaylists;
    const filter = event.target.value;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = playlists.filter((item) => {
      if (item === null || typeof item === "undefined") return playlists; //problems
      return Object.keys(item).some(
        (key) =>
          typeof item[key] === "string" &&
          key !== "imageUrl" &&
          key !== "description" &&
          key !== "trackRef" && //TODO: make it so only it can be filtered only by name or owner?
          //only filter based on name
          item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

    this.setState({ filter: event.target.value, filteredData: filteredData });
  };
  render() {
    const { filteredData, filter, sortedPlaylists } = this.state;
    //console.log(filteredData);
    let finalSorted = sortedPlaylists.filter(
      (item) => -1 !== filteredData.indexOf(item)
    );

    return (
      <div>
        <p>
          Click on a playlist to see what songs there are, and to choose which
          songs will be imported.
        </p>
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
        </div>
        <div id={finalSorted.length > 0 ? "spotifyPlaylist" : "template"}>
          {this.state.loading ? (
            <div className="loadingPlace2">
              <LoadingSpinner color="#545454" />
            </div>
          ) : (
            <div>
              {finalSorted.map(
                ({
                  id,
                  name,
                  description,
                  imageUrl,
                  trackRef,
                  totalTracks,
                  ownerName,
                }) => (
                  <SpotifyItem
                    description={description}
                    imageUrl={imageUrl}
                    name={name}
                    id={id}
                    key={id}
                    trackRef={trackRef}
                    totalTracks={totalTracks}
                    ownerName={ownerName}
                    token={this.props.token}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default SpotifyPlaylist;
