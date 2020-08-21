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
import CustomBadge from "../../badge/Badge";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Spinner from "../../spinner/spinner4";
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
  console.log(props);

  return (
    <div>
      {props.loading && props.show ? (
        <div className="loadingplaceformodal">
          <Spinner size={50} color="white" style={{ zIndex: 999999 }} />
        </div>
      ) : null}
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
              <Col sm="6">
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
              <Col sm="6">
                <div style={{ color: "white" }}>
                  <p>
                    Subscribers: {props.artistSubscribers}{" "}
                    <Button
                      onClick={() => {
                        props.toggleAllSongsModal(props.artistSongs.browseId);
                      }}
                      className="float-right"
                    >
                      All songs
                    </Button>
                  </p>
                  <p>Total views: {props.artistViews}</p>
                  <p> Albums: {}</p>
                  <div className="badgeWrapper">
                    {
                      <RenderAlbums
                        toggleAlbumModal={props.toggleAlbumModal}
                        albums={props.artistAlbums}
                      />
                      /*     Length&nbsp; */
                    }
                  </div>
                </div>{" "}
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

const RenderAlbums = (props) => {
  if (!props.albums) return null;

  return props.albums.map((album) => (
    <div key={Math.random()} onClick={() => props.toggleAlbumModal(album)}>
      <CustomBadge key={Math.random()} title={album.title} />
    </div>
  ));
};

export default ModalExample;
