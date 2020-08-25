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
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles;
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  MenuProvider,
  contextMenu,
} from "react-contexify";

import Spinner from "../spinner/spinner4";
import "./Modal.css";

class MyAwesomeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.menu = React.createRef();
  }
  hide = () => {
    this.menu.current.hide();
  };
  render() {
    return (
      <Menu id="menu_id4" ref={this.menu}>
        <Item
          onClick={({ props }) => {
            this.hide();
            props.onPlay(props);
          }}
        >
          Play song
        </Item>
        <Item
          onClick={({ props }) => {
            this.hide();
            props.onAdd(props);
          }}
        >
          Add to Queue
        </Item>
        <Item
          onClick={({ props }) => {
            this.hide();
            props.playNext(props);
          }}
        >
          Play next
        </Item>
        <Separator />
        <Submenu label="Go to Artist" disabled={!this.props.artists}>
          {this.props.artists &&
            this.props.artists.map((artist) => (
              <Item
                onClick={({ props }) => {
                  this.hide();
                  props.toggleModal();
                  props.toggleArtistModal(artist);
                }}
              >
                {artist.name}
              </Item>
            ))}
        </Submenu>
        <Separator />
        <Submenu label="Add to playlist">
          {this.props.playlists &&
            this.props.playlists.map((playlist) => {
              return (
                <Item
                  onClick={({ props }) => {
                    this.hide();
                    props.addSongToPlaylist(props, playlist._id);
                  }}
                >
                  {playlist.name}
                </Item>
              );
            })}
        </Submenu>
      </Menu>
    );
  }
}

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
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ModalExample = (props) => {
  /*   console.log(props); */
  const [dropdownOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addingPlaylist, setAddingPlaylist] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const { title, className, show } = props;
  const [albumTracks, setalbumTracks] = useState([]);
  const [albumArtists, setArtists] = useState([]);
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [playlistVersionOfTracks, setPlaylistVersionofTracks] = useState([]);
  const [thumbnails, setthumbnails] = useState([]);

  useEffect(() => {
    const getalbumTracks = async () => {
      setLoading(true);

      const res = await getAlbum(props.albumBrowseId);

      setLoading(false);
      if (!res) return;
      setalbumTracks(res.tracks);
      setArtists(res.artist);
      setAlbumDescription(res.description);
      setAlbumTitle(res.title);
      setthumbnails(res.thumbnails);
      const playlist = [];

      for (const track of res.tracks) {
        if (track.videoId) {
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
      }
      setPlaylistVersionofTracks(playlist);
    };

    if (!props.artist) {
      getalbumTracks();
    }
  }, [props.albumBrowseId]);
  const addPlaylistToQueue = () => {
    console.log(playlistVersionOfTracks);
    props.addPlaylistToQueue(playlistVersionOfTracks, albumTitle);
  };
  const playPlaylist = () => {
    props.playPlaylist(playlistVersionOfTracks, albumTitle);
  };
  const addPlayList = async (name, id) => {
    /*     playlistVersionOfTracks.forEach((track) => {
      const item = JSON.stringify({ track });
      addSongToPlaylist(item, id);
    }); */
    setAddingPlaylist(true);
    await Promise.all(
      playlistVersionOfTracks.map(async (track) => {
        const item = JSON.stringify({ track });
        await addSongToPlaylist(item, id);
      })
    );
    setAddingPlaylist(false);
    props.loadPlaylist(id);
    toaster.notify(
      <span className="styled-toast">
        Songs added to the playlist: {name} !
      </span>,
      {
        duration: 2000,
      }
    );
  };

  const makePlaylist = async () => {
    setAddingPlaylist(true);

    await timeout(1000);
    await props.makePlaylist(
      albumTitle + " " + albumArtists[0].name,
      playlistVersionOfTracks,
      true,
      "Random"
    );
    setAddingPlaylist(false);
    toaster.notify(
      <span className="styled-toast">
        Playlist: {albumTitle + " " + albumArtists[0].name} made!
      </span>,
      {
        duration: 2000,
      }
    );
  };
  const PlayLists = props.playlists.map((playlist) => (
    <DropdownItem
      key={Math.random()}
      onClick={() => addPlayList(playlist.name, playlist._id)}
    >
      {playlist.name}
    </DropdownItem>
  ));
  PlayLists.unshift(
    <DropdownItem key={Math.random()} onClick={() => makePlaylist()}>
      Create a new playlist
    </DropdownItem>
  );
  const handleContextMenu = (e, props) => {
    console.log("HANDLECONTEXT");
    e.preventDefault();
    contextMenu.show({
      id: "menu_id4",
      event: e,
      props: props,
    });
  };
  return (
    <div>
      {addingPlaylist && show ? (
        <div className="loadingplaceformodal">
          <Spinner size={50} color="#009688" style={{ zIndex: 999999 }} />
        </div>
      ) : null}
      {loading && show ? (
        <div className="loadingplaceformodal">
          <Spinner size={50} color="#009688" style={{ zIndex: 999999 }} />
        </div>
      ) : (
        <Modal
          isOpen={show}
          toggle={() => props.toggleModal()}
          className={className}
          backdrop={true}
          keyboard={true}
          size={"xl"}
        >
          <MyAwesomeMenu artists={albumArtists} playlists={props.playlists} />
          <ModalHeader
            style={{ textAlign: "center" }}
            toggle={() => props.toggleModal()}
            className="text-center"
            cssModule={{ "modal-title": "w-100 text-center" }}
          >
            <RenderArtists artists={albumArtists} />- &nbsp;{albumTitle}{" "}
          </ModalHeader>
          <ModalBody id="modalbody123123">
            <div className="albumDescription">
              <Row>
                <Col sm="3">
                  {thumbnails[1] && (
                    <img
                      height={120}
                      src={thumbnails[1].url} // use normal <img> attributes as props
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
                    <div
                      onContextMenu={(event) =>
                        handleContextMenu(event, {
                          onDeleteFromPlaylist: props.onDeleteFromPlaylist,
                          onAdd: props.addFunc,
                          onPlay: props.onPlay,
                          playNext: props.playNext,
                          artists: artists,
                          toggleModal: props.toggleModal,
                          toggleArtistModal: props.toggleArtistModal,
                          album: { id: props.albumBrowseId, name: albumTitle },
                          toggleAlbumModal: props.toggleAlbumModal,
                          UpdateCurrentPlaylist2: props.UpdateCurrentPlaylist2,
                          addSongToPlaylist: props.addSongToPlaylist,
                          videoId,
                          title,
                          uniqueId: videoId + Math.random(),
                          duration: format(lengthMs / 1000),
                          thumbnail: thumbnails[0].url,
                          artists: albumArtists,
                        })
                      }
                      key={videoId + Math.random()}
                    >
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
                        toggleModal={props.toggleModal}
                        toggleArtistModal={props.toggleArtistModal}
                      />
                    </div>
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
      )}
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
