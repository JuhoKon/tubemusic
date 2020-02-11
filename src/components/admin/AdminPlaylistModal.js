import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Link from "../playlist/link";
import ChosenPlaylist from "./ChosenPlaylist";
class AdminPlaylistModal extends Component {
  state = {
    modal: false
  };
  toggle = () => {
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
    console.log(playlists);
    return (
      <div>
        <Button
          disabled={playlists ? false : true}
          className="btn-margin"
          onClick={this.toggle}
          href="#"
        >
          {this.props.name}
        </Button>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader className="mb-4" toggle={this.props.toggle}>
            {this.props.name}
          </ModalHeader>
          <ModalBody>
            <p className="formText text-center">Hello</p>
            <ChosenPlaylist playlists={playlists || []}></ChosenPlaylist>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminPlaylistModal;
