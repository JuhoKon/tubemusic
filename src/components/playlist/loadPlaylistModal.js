import React, { Component } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Link from "./link.js";

class LoadPlaylistModal extends Component {
  state = {
    modal: false
  };
  toggle = () => {
    this.props.getPlayList();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const playlists = this.props.playlists;

    return (
      <div>
        <Button className="btn-margin" onClick={this.toggle} href="#">
          Available playlists
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className="mb-4" toggle={this.toggle}>
            Playlists
          </ModalHeader>
          <p className="formText text-center">
            Select a playlist and load it :)
          </p>
          {playlists.map(({ playlist, name, _id }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <Link
                deletePlaylist={this.props.deletePlaylist}
                _id={_id}
                playlist={playlist}
                name={name}
                loadPlaylist={this.props.loadPlaylist}
              ></Link>
            </CSSTransition>
          ))}
        </Modal>
      </div>
    );
  }
}

export default LoadPlaylistModal;
