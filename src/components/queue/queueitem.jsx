import React, { Component } from "react";
import { Card, CardBody, Button, CardText, Row, Col } from "reactstrap";
import isEqual from "react-fast-compare";
import "./queue.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Queueitem extends Component {
  state = {
    editMode: this.props.editMode,
  };

  async onRemoveClick(id) {
    //console.log(id);

    this.props.onRemove(id);
  }
  onPlayClick = (id) => {
    //console.log(id);
    this.props.onPlay(id);
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        editMode: this.props.editMode,
      });
    }
  }
  render() {
    return (
      <div>
        <Card
          className="card"
          onDoubleClick={this.onPlayClick.bind(this, this.props)}
        >
          <CardBody>
            <Row>
              <Col xs="2" sm="2">
                <div
                  className="thumbnailbuttonplaylist d-none d-xl-block"
                  onClick={this.onPlayClick.bind(this, this.props)}
                >
                  {this.props.thumbnail && (
                    <LazyLoadImage
                      height={60}
                      src={this.props.thumbnail} // use normal <img> attributes as props
                      width={60}
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
                <CardText className="hoverEffect">{this.props.title} </CardText>{" "}
                {this.props.artists && (
                  <RenderArtists
                    toggleArtistModal={this.props.toggleArtistModalItem}
                    artists={this.props.artists}
                  />
                )}
              </Col>

              <Col xs="1" sm="1">
                <small className="float-left">{this.props.duration}</small>
              </Col>
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  {this.props.editMode ? (
                    <Button
                      className="btn btn-secondary button float-right"
                      color="secondary"
                      onClick={this.onRemoveClick.bind(this, this.props)}
                    >
                      x
                    </Button>
                  ) : null}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
const RenderArtists = (props) => {
  return props.artists.map((artist, index) => (
    <div
      key={index}
      className="artistStuff2 hoverEffect"
      id={artist.id}
      onClick={() =>
        props.toggleArtistModal({ name: artist.name, id: artist.id })
      }
    >
      {artist.name} &nbsp;
    </div>
  ));
};
export default Queueitem;
