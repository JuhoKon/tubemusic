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
import isEqual from "react-fast-compare";

class SaveModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    age: Date,
    message: null,
    messageTest: []
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
    return (
      <div>
        <Button
          className="float-right btn-remove"
          onClick={this.toggle}
          href="#"
          color="primary"
        >
          Save
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className="mb-4" toggle={this.toggle}>
            Save playlist as
          </ModalHeader>
          <p className="formText text-center">
            Choose a name for the playlist and save it.
          </p>
        </Modal>
      </div>
    );
  }
}

export default SaveModal;
