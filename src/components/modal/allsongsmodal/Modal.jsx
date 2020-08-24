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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import "toasted-notes/src/styles.css"; // optional styles;
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

  const { title, className, show } = props;
  console.log(props);
  return (
    <div>
      <Modal
        isOpen={show}
        toggle={() => props.toggleModal()}
        className={className}
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
          All songs from {props.artistName}
        </ModalHeader>
        <ModalBody id="modalbody123123">
          {/* Tänne kaikki buttonit add to playlist jne. queue jne.*/}
          <div className="artistTracks">
            {/* Tästä listasta pitää tehdä virtualisoitu lista! */}
            {props.allSongs.map(
              ({ artists, thumbnails, videoId, title, duration }) => {
                return (
                  <Song
                    uniqueId={videoId + Math.random()}
                    title={title}
                    videoId={videoId}
                    artists={artists}
                    thumbnails={thumbnails}
                    duration={duration}
                    thumbnail={thumbnails[0].url}
                    addFunc={props.addFunc}
                    onPlay={props.onPlay}
                    playNext={props.playNext}
                    AddToPlaylist={props.AddToPlaylist}
                    toggleModal={props.toggleModal}
                    toggleArtistModal={props.toggleArtistModal}
                  />
                );
              }
            )}
          </div>
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
  console.log(props.artists);
  /*   console.log(props); */
  return (
    <Card
      onDoubleClick={() => {
        if (props.videoId) {
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
          });
        }
      }}
    >
      <CardBody>
        <Row>
          <Col xs="2" sm="2">
            <div
              className="thumbnailbuttonplaylist"
              onClick={() => {
                if (props.videoId) {
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
                  });
                }
              }}
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
              {props.videoId ? (
                <FontAwesomeIcon
                  className="Active"
                  size={"lg"}
                  icon={faPlay}
                  id="thumbnail2"
                />
              ) : null}
            </div>
          </Col>
          <Col xs="3" sm="3">
            <CardText>
              <div className="hoverEffect">{props.title}</div>{" "}
            </CardText>
          </Col>
          <Col xs="3" sm="3">
            <RenderArtists2
              toggleModal={props.toggleModal}
              toggleArtistModal={props.toggleArtistModal}
              artists={props.artists}
            />
          </Col>
          <Col xs="2" sm="2">
            <small className="float-left">
              {props.videoId ? props.duration : "Deleted by artist"}
            </small>
          </Col>
          <Col xs="1" sm="1">
            <br />
            <br />
            <div className="placeforbutton">
              <Button
                className="btn btn-primary btn-item"
                color="secondary"
                onClick={() => props.AddToPlaylist(props)}
                disabled={!props.videoId}
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
                disabled={!props.videoId}
              >
                +N
              </Button>
              <Button
                className="btn btn-secondary float-right btn-item"
                color="info"
                onClick={() => props.addFunc(props)}
                disabled={!props.videoId}
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
const RenderArtists2 = (props) => {
  return props.artists.map((artist) => (
    <div
      onClick={() => {
        props.toggleModal();
        props.toggleArtistModal(artist);
      }}
      className="artistStuff hoverEffect"
    >
      {artist.name} &nbsp;
    </div>
  ));
};
export default ModalExample;
