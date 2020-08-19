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
import { getAlbum, addSongToPlaylist } from "../functions/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ShowMoreText from "react-show-more-text";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import LoadingSpinner from "../spinner/spinner";

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
  const [loading, setLoading] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const { title, className, show } = props;
  const [albumTracks, setalbumTracks] = useState([]);
  const [albumArtists, setArtists] = useState([]);
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [playlistVersionOfTracks, setPlaylistVersionofTracks] = useState([]);
  useEffect(() => {
    const getalbumTracks = async () => {
      const res = await getAlbum(props.albumBrowseId);
      if (!res) return;
      setalbumTracks(res.tracks);
      setArtists(res.artist);
      setAlbumDescription(res.description);
      setAlbumTitle(res.title);
      const playlist = [];

      for (const track of res.tracks) {
        console.log(track);
        playlist.push({
          uniqueId: track.videoId + Math.random(),
          title: track.title,
          videoId: track.videoId,
          artists: res.artist,
          artist: track.artists,
          thumbnails: track.thumbnails,
          duration: format(track.lengthMs / 1000),
          album: { id: props.albumBrowseId, name: res.title },
          thumbnail: track.thumbnails[0].url,
          addFunc: props.addFunc,
          onPlay: props.onPlay,
          playNext: props.playNext,
        });
      }
      console.log(playlist);
      setPlaylistVersionofTracks(playlist);
    };

    if (!props.artist) {
      getalbumTracks();
    }
  }, props.albumBrowseId);
  const addPlaylistToQueue = () => {
    console.log(playlistVersionOfTracks);
    props.addPlaylistToQueue(playlistVersionOfTracks, albumTitle);
  };
  const playPlaylist = () => {
    props.playPlaylist(playlistVersionOfTracks, albumTitle);
  };
  const addPlayList = async (id) => {
    /*     playlistVersionOfTracks.forEach((track) => {
      const item = JSON.stringify({ track });
      addSongToPlaylist(item, id);
    }); */
    setLoading(true);
    await Promise.all(
      playlistVersionOfTracks.map(async (track) => {
        const item = JSON.stringify({ track });
        await addSongToPlaylist(item, id);
      })
    );
    setLoading(false);
    props.loadPlaylist(id);
  };
  console.log(props.playlists);
  const PlayLists = props.playlists.map((playlist) => (
    <DropdownItem onClick={() => addPlayList(playlist._id)}>
      {playlist.name}
    </DropdownItem>
  ));

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
        {loading ? (
          <div className="loadingPlace">
            <LoadingSpinner color="#545454" />
          </div>
        ) : null}

        <ModalHeader
          style={{ textAlign: "center" }}
          toggle={() => props.toggleModal()}
          className="text-center"
          cssModule={{ "modal-title": "w-100 text-center" }}
        >
          <RenderArtists artists={albumArtists} />- &nbsp;{albumTitle}
        </ModalHeader>
        <ModalBody>
          <div className="albumDescription">
            <Row>
              <Col sm="3">
                {props.albumThumbnails && (
                  <img
                    height={120}
                    src={props.albumThumbnails[1].url} // use normal <img> attributes as props
                    width={120}
                    style={{ position: "relative", display: "inline-block" }}
                    id="thumbnail"
                    alt="foo"
                  />
                )}
              </Col>

              <Col sm="3">
                <Button
                  style={{
                    position: "relative",
                    display: "inline-block",
                    top: "50%",
                  }}
                  onClick={() => playPlaylist()}
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
                  onClick={() => addPlaylistToQueue()}
                >
                  Queue album
                </Button>
              </Col>
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
            {albumDescription}
          </ShowMoreText>
          <div className="artistTracks">
            {albumTracks.map(
              ({ artists, thumbnails, videoId, title, lengthMs }) => {
                return (
                  <Song
                    uniqueId={videoId + Math.random()}
                    title={title}
                    videoId={videoId}
                    artists={albumArtists}
                    artist={artists}
                    thumbnails={thumbnails}
                    duration={format(lengthMs / 1000)}
                    album={{ id: props.albumBrowseId, name: albumTitle }}
                    thumbnail={thumbnails[0].url}
                    addFunc={props.addFunc}
                    onPlay={props.onPlay}
                    playNext={props.playNext}
                    AddToPlaylist={props.AddToPlaylist}
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
