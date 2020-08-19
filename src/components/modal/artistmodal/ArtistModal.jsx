import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Card,
  CardBody,
  Row,
  Col,
  CardText,
} from "reactstrap";
import { getAlbum, addSongToPlaylist } from "../../functions/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ShowMoreText from "react-show-more-text";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import LoadingSpinner from "../../spinner/spinner";

import "./Modal.css";
function pad(string) {
  return ("0" + string).slice(-2);
}
function format(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}.${pad(mm)}.${ss}`;
  }
  return `${mm}.${ss}`;
}

const ModalExample = (props) => {
  /*   console.log(props); */
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const PlayLists = props.playlists.map((playlist) => (
    <DropdownItem /* onClick={() => addPlayList(playlist._id)} */>
      {playlist.name}
    </DropdownItem>
  ));
  return (
    <div>
      <Modal
        isOpen={props.show}
        toggle={() => props.toggleModal()}
        className={props.className}
        backdrop={true}
        keyboard={true}
        size={"xl"}
      >
        <ModalHeader
          style={{ textAlign: "center" }}
          toggle={() => props.toggleModal()}
          className="text-center"
          cssModule={{ "modal-title": "w-100 text-center" }}
        >
          {props.artistName}
        </ModalHeader>
        <ModalBody>
          <div className="albumDescription">
            <Row>
              <Col sm="3">
                {props.artistThumbnails && (
                  <img
                    src={props.artistThumbnails[1].url} // use normal <img> attributes as props
                    width={480}
                    style={{ position: "relative", display: "inline-block" }}
                    id="thumbnail"
                    alt="foo"
                  />
                )}
              </Col>
              {/*   <Col sm="3">
                <Button
                  style={{
                    position: "relative",
                    display: "inline-block",
                    top: "50%",
                  }}
          
                >
                  Play album
                </Button>
              </Col>
              <Col sm="3">
                <ButtonDropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    top: "50%",
                  }}
                >
                  <DropdownToggle caret>Add to playlist</DropdownToggle>
                  <DropdownMenu>{PlayLists}</DropdownMenu>
                </ButtonDropdown>
              </Col>
              <Col sm="3">
                <Button
                  style={{
                    position: "relative",
                    display: "inline-block",
                    top: "50%",
                  }}
              
                >
                  Queue album
                </Button>
              </Col> */}
            </Row>
          </div>
          <hr />
          <ShowMoreText
            /* Default options */
            lines={3}
            more="Show more"
            less="Show less"
            anchorClass=""
            expanded={false}
          >
            {props.artistDescription}
          </ShowMoreText>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => props.toggleModal()}>
            Go back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const RenderArtists = (props) => {
  /*   console.log(props); */
  return props.artists.map((artist) => <>{artist.name} &nbsp;</>);
};

const Song = (props) => {
  /*   console.log(props); */
  return (
    <Card
      onDoubleClick={() =>
        props.onPlay({
          uniqueId: Math.random(),
          title: props.title,
          videoId: props.videoId,
          duration: props.duration,
          publishedAt: props.publishedAt,
          channelTitle: props.channelTitle,
          artists: props.artists,
          thumbnail: props.thumbnail,
          thumbnails: props.thumbnails,
          album: props.album,
        })
      }
    >
      <CardBody>
        <Row>
          <Col xs="2" sm="2">
            <div
              className="thumbnailbuttonplaylist "
              onClick={() =>
                props.onPlay({
                  uniqueId: Math.random(),
                  title: props.title,
                  videoId: props.videoId,
                  duration: props.duration,
                  publishedAt: props.publishedAt,
                  channelTitle: props.channelTitle,
                  artists: props.artists,
                  thumbnail: props.thumbnail,
                  thumbnails: props.thumbnails,
                  album: props.album,
                })
              }
            >
              {props.thumbnails && (
                <img
                  height={60}
                  src={props.thumbnails[0].url} // use normal <img> attributes as props
                  width={60}
                  style={{ position: "absolute" }}
                  id="thumbnail"
                  alt="foo"
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
          <Col xs="6" sm="6">
            <CardText>{props.title} </CardText> {props.artist}
          </Col>
          <Col xs="1" sm="1">
            <small className="float-left">{props.duration}</small>
          </Col>
          <Col xs="2" sm="2">
            <br />
            <br />
            <div className="placeforbutton">
              <Button
                className="btn btn-primary btn-item"
                color="secondary"
                onClick={() => props.AddToPlaylist(props)}
              >
                +P
              </Button>
            </div>
          </Col>
          <Col xs="1" sm="1">
            <div className="placeforbutton">
              <Button
                className="btn btn-secondary float-right btn-item"
                color="info"
                onClick={() => props.playNext(props)}
              >
                +N
              </Button>
              <Button
                className="btn btn-secondary float-right btn-item"
                color="info"
                onClick={() => props.addFunc(props)}
              >
                +Q
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ModalExample;
