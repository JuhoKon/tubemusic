import React, { Component } from "react";
import { Card, CardBody, CardText, Row, Col } from "reactstrap";

import "moment-duration-format";
import PlaylistModal from "./Playlistmodal/PlaylistModal";
import LoadingSpinner from "../../spinner/spinner";
import {
  getPlaylistTracks,
  getRequestWithToken,
} from "../../functions/functions";
class PlaylistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      description: this.props.description,
      imageUrl: this.props.imageUrl,
      name: this.props.name,
      id: this.props.id,
      key: this.props.id,
      trackRef: this.props.trackRef,
      totalTracks: this.props.totalTracks,
      ownerName: this.props.ownerName,
      token: this.props.token,
      chosenListsTracks: [],
      loading: false,
    };
    this.toggle = this.toggle.bind(this);
    this.clickOnPlayList = this.clickOnPlayList.bind(this);
  }
  async clickOnPlayList() {
    this.setState({
      loading: true,
    });
    let token = this.state.token;
    let data = await getPlaylistTracks(this.state.id, token);
    //console.log(data);
    let dataArray = [];
    let nextData = null;
    dataArray = data.items;
    console.log(dataArray);
    while (data.next !== null && typeof data.next !== "undefined") {
      nextData = await getRequestWithToken(token, data.next);
      // console.log(nextData);
      dataArray = dataArray.concat(nextData.items);
      if (nextData.next === null) {
        break;
      }
      data.next = nextData.next;
    }
    let nameArray = [];
    let tempArtistArray = [];
    let itemArray = [];
    let idArray = [];
    let albumArray = [];
    let createdAtArray = [];

    dataArray = dataArray.filter((item) => item.track !== null); //filter out those which are null (for some reason)
    dataArray.forEach((item) => console.log(item.track.name));
    dataArray.forEach((item) => nameArray.push(item.track.name));
    dataArray.forEach((item) => tempArtistArray.push(item.track.artists));
    dataArray.forEach((item) => idArray.push(item.track.id));
    dataArray.forEach((item) => albumArray.push(item.track.album.name));
    dataArray.forEach((item) => createdAtArray.push(item.added_at));
    //TODO: use map to do this better
    //console.log(dataArray);
    for (let i = 0; i < tempArtistArray.length; i++) {
      //take only max two artist names
      let itemObject = {};
      itemObject["artistName"] = tempArtistArray[i][0].name;
      if (typeof tempArtistArray[i][1] !== "undefined") {
        itemObject["artistName"] = itemObject["artistName"].concat(
          " & " + tempArtistArray[i][1].name
        );
      }
      itemObject["title"] = nameArray[i];
      itemObject["id"] = idArray[i];
      itemObject["album"] = albumArray[i];
      itemObject["createdAt"] = createdAtArray[i];
      itemArray.push(itemObject);
      //console.log(artistObject);
    }

    this.setState({
      loading: false,
      chosenListsTracks: itemArray,
    });
    this.toggleList(itemArray);
  }
  toggleList = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    //console.log(this.state.name);
    return (
      <div>
        <div>{this.state.loading ? <LoadingSpinner /> : ""}</div>
        <a
          //href="# "
          style={{ cursor: "pointer" }}
          onClick={this.clickOnPlayList.bind(this, this.state)}
        >
          <Card className="card">
            <CardBody>
              <Row>
                <Col xs="1" sm="1"></Col>
                <Col xs="8" sm="8">
                  <CardText>{this.props.name}</CardText>
                </Col>

                <Col xs="3" sm="3">
                  <small>{this.props.totalTracks} songs</small>
                </Col>
              </Row>
              <Row>
                <Col xs="6" sm="6">
                  <small className="float-left">
                    By {this.props.ownerName}
                  </small>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </a>
        <PlaylistModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          description={this.state.description}
          imageUrl={this.state.imageUrl}
          name={this.state.name}
          id={this.state.id}
          key={this.state.id}
          trackRef={this.state.trackRef}
          totalTracks={this.state.totalTracks}
          ownerName={this.state.ownerName}
          chosenListsTracks={this.state.chosenListsTracks}
        />
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default PlaylistItem;
