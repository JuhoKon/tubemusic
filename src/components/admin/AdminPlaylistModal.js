import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
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
    //console.log(playlists);
    return (
      <div>
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
