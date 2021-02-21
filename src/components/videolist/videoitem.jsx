import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "./videolist.css";
import "moment-duration-format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { faPlay, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getArtistData, getArtistAlbumData } from "../functions/functions";
import CustomBadge from "../badge/Badge";
import isEqual from "react-fast-compare";

class Videoitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      subscribers: "",
      views: "",
      description: "",
      songs: [],
      loading: false,
    };
  }
  onAddClick = (id) => {
    this.props.addFunc({
      uniqueId: Math.random(),
      title: id.title,
      videoId: id.videoId,
      duration: id.duration,
      publishedAt: id.publishedAt,
      channelTitle: id.channelTitle,
      artists: id.artists,
      thumbnail: id.thumbnail,
      thumbnails: id.thumbnails,
      album: id.album,
    });
  };
  onPlayClick = (id) => {
    this.props.onPlay({
      uniqueId: Math.random(),
      title: id.title,
      videoId: id.videoId,
      duration: id.duration,
      publishedAt: id.publishedAt,
      channelTitle: id.channelTitle,
      artists: id.artists,
      album: id.album,
    });
  };
  onAddToPlaylist = (id) => {
    this.props.AddToPlaylist({
      uniqueId: Math.random(),
      title: id.title,
      videoId: id.videoId,
      duration: id.duration,
      publishedAt: id.publishedAt,
      channelTitle: id.channelTitle,
      thumbnail: id.thumbnail,
      artists: id.artists,
      date: Date.now(),
      album: id.album,
    });
  };
  playNextClick = (item) => {
    this.props.playNext(item);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props, nextProps)) {
      return true;
    }
    if (!isEqual(this.state, nextState)) {
      return true;
    }
    return false;
  }

  async componentDidMount() {
    if (this.props.browseId) {
      this.setState({
        loading: true,
      });
      const res = await getArtistData(this.props.browseId);

      let albums = [];

      if (res && res.albums && res.albums.browseId && res.albums.params) {
        const albumData = await getArtistAlbumData(
          res.albums.browseId,
          res.albums.params
        ).catch((e) => null);

        if (albumData !== null) {
          albums = albumData;
        }
      }
      this.setState({
        loading: false,
      });

      if (!res.albums) {
        albums = [0, 1];
      }
      /*   console.log(res); */
      this.setState({
        albums: albums.length > 0 ? albums : res.albums.results,
        subscribers: res.subscribers,
        singles: res.singles,
        views: res.views,
        description: res.description,
        songs: res.songs,
        thumbnails: res.thumbnails,
      });
    }
  }

  render() {
    const {
      albums,
      subscribers,
      views,
      description,
      songs,
      thumbnails,
      singles,
    } = this.state;

    const RenderCard = (props) => {
      switch (props.resultType) {
        case "artist":
          return (
            <Card
              className="card-2"
              id="videoitem"
              onDoubleClick={() => {
                if (!this.state.loading) {
                  this.props.toggleArtistModal({
                    albums,
                    subscribers,
                    views,
                    description,
                    songs,
                    thumbnails,
                    singles,
                    artist: this.props.artist,
                  });
                }
              }}
            >
              <CardBody>
                <Row>
                  <Col xs="2" sm="2">
                    <div
                      className="thumbnailbutton2"
                      onClick={() => {
                        if (!this.state.loading) {
                          this.props.toggleArtistModalItem({
                            name: this.props.artist,
                            id: this.props.browseId,
                          });
                        }
                      }}
                    >
                      {this.props.thumbnails && (
                        <LazyLoadImage
                          height={100}
                          src={this.props.thumbnails[1].url} // use normal <img> attributes as props
                          width={100}
                          style={{ position: "absolute" }}
                          id="thumbnail"
                        />
                      )}
                    </div>
                  </Col>
                  <Col xs="7" sm="7">
                    <CardText
                      onClick={() => {
                        if (!this.state.loading) {
                          this.props.toggleArtistModalItem({
                            name: this.props.artist,
                            id: this.props.browseId,
                          });
                        }
                      }}
                    >
                      <h5>
                        <div className="hoverEffect">
                          {this.props.artist}&nbsp;&nbsp;{" "}
                        </div>
                        {this.state.loading ? (
                          <FontAwesomeIcon
                            className="fa-spin"
                            icon={faSpinner}
                          />
                        ) : null}
                      </h5>
                    </CardText>
                  </Col>
                  <Col xs="2" sm="2">
                    <br />
                    <br />
                    <div className="placeforbutton">
                      {this.state.subscribers}
                    </div>
                  </Col>
                  <Col xs="1" sm="1"></Col>
                </Row>

                <Row>
                  <Col xs="12" sm="12">
                    <div className="badgeWrapper">
                      {
                        <RenderAlbums
                          toggleAlbumModal={this.props.toggleAlbumModal}
                          albums={this.state.albums}
                        />
                        /*     Length&nbsp; */
                      }
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          );
        default:
          return (
            <Card
              className="card-2"
              id="videoitem"
              onDoubleClick={this.onPlayClick.bind(this, this.props)}
            >
              <CardBody>
                <Row>
                  <Col xs="2" sm="2">
                    <div
                      className="thumbnailbutton"
                      onClick={this.onPlayClick.bind(this, this.props)}
                    >
                      {this.props.thumbnail && (
                        <LazyLoadImage
                          height={70}
                          src={this.props.thumbnail} // use normal <img> attributes as props
                          width={70}
                          style={{ position: "absolute" }}
                          id="thumbnail"
                        />
                      )}
                      <FontAwesomeIcon
                        className="Active"
                        size={"lg"}
                        icon={faPlay}
                        id="thumbnail2"
                      />
                    </div>
                  </Col>
                  <Col xs="7" sm="7">
                    <CardText>
                      <div className="hoverEffect"> {this.props.title}</div>
                      <br />
                      {this.props.album && (
                        <div
                          onClick={() => {
                            this.props.toggleAlbumModal({
                              artist:
                                (this.props.artists[0] &&
                                  this.props.artists[0].name) ||
                                "Various Artists",
                              browseId: this.props.album.id,
                              type: "Album",
                              thumbnails: [
                                { height: 60, url: this.props.thumbnail },
                                { height: 60, url: this.props.thumbnail },
                              ],
                              title: this.props.album.name,
                            });
                          }}
                          style={{ cursor: "pointer" }}
                          className="hoverEffect d-none d-xl-block"
                        >
                          {this.props.album.name}
                        </div>
                      )}
                    </CardText>
                    <CardText>
                      {this.props.artists[0] && (
                        <div className="artists123">
                          <RenderArtists
                            toggleArtistModal={this.props.toggleArtistModalItem}
                            artists={this.props.artists}
                          />
                        </div>
                      )}
                    </CardText>
                  </Col>
                  <Col xs="2" sm="2">
                    <br />
                    <br />
                    <div className="placeforbutton">
                      <Button
                        className="btn btn-primary btn-item"
                        color="secondary"
                        onClick={this.onAddToPlaylist.bind(this, this.props)}
                      >
                        +P
                      </Button>
                    </div>
                  </Col>
                  <Col xs="1" sm="1">
                    <div className="placeforbutton">
                      <Button
                        className="btn btn-secondary  float-right btn-item"
                        color="secondary"
                        onClick={this.playNextClick.bind(this, this.props)}
                      >
                        +N
                      </Button>
                      <Button
                        className="btn btn-secondary  float-right btn-item"
                        color="secondary"
                        onClick={this.onAddClick.bind(this, this.props)}
                      >
                        +Q
                      </Button>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col></Col>
                  <Col xs="6" sm="6">
                    <small className="float">
                      {/*     Length&nbsp; */}
                      {this.props.duration}
                    </small>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          );
      }
    };
    //TODO: make it look much better
    return (
      <div>
        <RenderCard resultType={this.props.resultType} />
      </div>
    );
  }
}
const RenderArtists = (props) => {
  return props.artists.map((artist, index) => (
    <div
      key={index}
      className="videolistArtists artistStuff hoverEffect"
      onClick={() =>
        props.toggleArtistModal({ name: artist.name, id: artist.id })
      }
    >
      {artist.name} &nbsp;
    </div>
  ));
};
const RenderAlbums = (props) => {
  if (!props.albums) return null;

  return props.albums.map((album) => (
    <div key={Math.random()} onClick={() => props.toggleAlbumModal(album)}>
      <CustomBadge key={Math.random()} title={album.title} />
    </div>
  ));
};
//actions we want to use as second paranthesis
export default Videoitem;
