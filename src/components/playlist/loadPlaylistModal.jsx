import React, { Component } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Link from "./link.tsx";

class LoadPlaylistModal extends Component {
  state = {
    modal: false,
  };
  toggle = () => {
    this.props.getPlayList();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const playlists = this.props.playlists;
    console.log(playlists);
    return (
      <div>
        <Button
          disabled={playlists ? false : true}
          className="btn-margin btn btn-secondary button"
          onClick={this.toggle}
          color="secondary"
          href="#"
        >
          {this.props.name}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className="mb-4" toggle={this.toggle}>
            Playlists
            <br />
            <br />
          </ModalHeader>

          <p className="formText text-center">
            Select a playlist and load it :)
          </p>
          <div id="videolist">
            {playlists.map(({ playlist, name, _id, owner, createdAt }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <Link
                  deletePlaylist={this.props.deletePlaylist}
                  _id={_id}
                  owner={owner}
                  createdAt={createdAt}
                  name={name}
                  loadPlaylist={this.props.loadPlaylist}
                  disabled={this.props.disabled}
                ></Link>
              </CSSTransition>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

export default LoadPlaylistModal;
