import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Link from "./link.js";
import isEqual from "react-fast-compare";

class LoadPlaylistModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    age: Date,
    message: null,
    messageTest: [],
    playlists: this.props.playlists
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlists: this.props.playlists
      });
    }
  }
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
  loadPlaylist = () => {
    this.props.loadPlaylist();
  };
  render() {
    const playlists = this.state.playlists;

    return (
      <div>
        <Button onClick={this.toggle} href="#">
          Available playlists:
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
                playlist={playlist}
                name={name}
                loadPlaylist={this.loadPlaylist.bind(this)}
              ></Link>
            </CSSTransition>
          ))}
        </Modal>
      </div>
    );
  }
}

export default LoadPlaylistModal;
