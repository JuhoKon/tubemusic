import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "./videolist.css";
import "moment-duration-format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getArtistData } from "../functions/functions";
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
    });
  };
  onAddToPlaylist = (id) => {
    console.log(id);
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
  async componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      if (this.props.browseId !== prevProps.browseId) {
        const res = await getArtistData(this.props.browseId);

        if (!res) return;
        this.setState({
          albums: res.albums,
          subscribers: res.subscribers,
          singles: res.singles,
          views: res.views,
          description: res.description,
          songs: res.songs,
          thumbnails: res.thumbnails,
        });
      }
    }
  }
  async componentDidMount() {
    if (this.props.browseId) {
      const res = await getArtistData(this.props.browseId);
      /*   console.log(res); */
      this.setState({
        albums: res.albums,
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
    /*     console.log(this.state); */
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
        case "song":
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
                      {/*     <Button
                    className="btn btn-secondary float-right btn-item"
                    onClick={this.onPlayClick.bind(this, this.props)}
                  >
                    Play
                  </Button> */}
                    </div>
                  </Col>
                  <Col xs="7" sm="7">
                    <CardText>
                      {this.props.title} -{" "}
                      {this.props.artists[0] && (
                        <RenderArtists artists={this.props.artists} />
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
                  <Col xs="12" sm="12">
                    <small className="float">
                      {/*     Length&nbsp; */}
                      {this.props.duration}
                    </small>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          );
        case "artist":
          return (
            <Card
              className="card-2"
              id="videoitem"
              /*     onDoubleClick={this.onPlayClick.bind(this, this.props)} */
            >
              <CardBody>
                <Row>
                  <Col xs="2" sm="2">
                    <div
                      className="thumbnailbutton2"
                      onClick={() =>
                        this.props.toggleArtistModal({
                          albums,
                          subscribers,
                          views,
                          description,
                          songs,
                          thumbnails,
                          singles,
                          artist: this.props.artist,
                        })
                      }
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
                      onClick={() =>
                        this.props.toggleArtistModal({
                          albums,
                          subscribers,
                          views,
                          description,
                          songs,
                          thumbnails,
                          singles,
                          artist: this.props.artist,
                        })
                      }
                    >
                      <h5>{this.props.artist}</h5>
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
                      {/*     <Button
                      className="btn btn-secondary float-right btn-item"
                      onClick={this.onPlayClick.bind(this, this.props)}
                    >
                      Play
                    </Button> */}
                    </div>
                  </Col>
                  <Col xs="7" sm="7">
                    <CardText>
                      {this.props.title} -{" "}
                      {this.props.artists[0] && (
                        <RenderArtists artists={this.props.artists} />
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
                  <Col xs="12" sm="12">
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
  return props.artists.map((artist) => <>{artist.name} &nbsp;</>);
};
const RenderAlbums = (props) => {
  if (!props.albums) return null;
  if (!props.albums.results) return null;
  return props.albums.results.map((album) => (
    <div onClick={() => props.toggleAlbumModal(album)}>
      <CustomBadge title={album.title} />
    </div>
  ));
};
//actions we want to use as second paranthesis
export default Videoitem;
