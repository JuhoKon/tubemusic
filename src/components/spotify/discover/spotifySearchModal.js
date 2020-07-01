import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { CSSTransition } from "react-transition-group";
import { searchSpotifyPlaylists } from "../../functions/functions";
import isEqual from "react-fast-compare";
import SpotifyItem from "../spotifyplaylist/spotifPlaylistitem";

import LoadingSpinner from "../../spinner/spinner";
import "./discovery.css";
class DiscoveryModal extends Component {
  state = {
    modal: false,
    name: "",
    token: this.props.token,
    search: "",
    playlists: [],
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = async (e) => {
    e.preventDefault();
    let res = await searchSpotifyPlaylists(this.state.search, this.state.token);
    console.log(res);
    this.setState({
      playlists: res.playlists.items,
    });
  };
  onChangeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        token: this.props.token,
      });
    }
  }

  render() {
    console.log(this.state);
    const { search } = this.state;
    return (
      <div>
        <Modal
          id="discovery"
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          size="lg"
          style={{ maxWidth: "1600px", width: "100%", margin: "10px auto" }}
        >
          <ModalHeader className="mb-4" toggle={this.props.toggle}>
            <span className="inthemiddle">The discover</span>
          </ModalHeader>
          <Row>
            <div className="inputDiv2">
              <form onSubmit={this.submit}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Search for playlists..."
                    required
                    className="form-control"
                    value={this.state.search}
                    onChange={this.onChangeSearch}
                  />
                  <InputGroupAddon addonType="append">
                    <Button color="secondary">Search</Button>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </div>
          </Row>
          <Row>
            <div
              id={
                this.state.playlists.length > 0
                  ? "spotifyPlaylist2"
                  : "template"
              }
            >
              {this.state.loading ? (
                <div className="loadingPlace2">
                  <LoadingSpinner color="#545454" />
                </div>
              ) : (
                <div>
                  {this.state.playlists.map(
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
          </Row>

          <ModalBody>
            <div>asdasd asdasdasd</div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DiscoveryModal;
