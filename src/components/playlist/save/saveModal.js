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

class SaveModal extends Component {
  state = {
    modal: false,
    name: ""
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
    console.log(this.props.playlistId);
    this.props.Updateplaylist(this.state.name, this.props.playlistId);
    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          className="float-right btn-remove"
          onClick={this.toggle}
          href="#"
          color="primary"
          disabled={this.props.playlistId ? false : true}
        >
          Save
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className="mb-4" toggle={this.toggle}>
            Save playlist as
          </ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder={this.props.playlistName}
                  className="mb-4"
                  onChange={this.onChange}
                ></Input>

                <Button className="btn btn-primary my-4 btn-block">Save</Button>
              </FormGroup>
            </ModalBody>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default SaveModal;
