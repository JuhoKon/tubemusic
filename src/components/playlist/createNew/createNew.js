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

class CreateNew extends Component {
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
    this.props.makePlaylist(this.state.name);
    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          className="float-left btn-remove"
          onClick={this.toggle}
          href="#"
          color="primary"
        >
          Create new
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className="mb-4" toggle={this.toggle}>
            Create a new playlist here :)
          </ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name for the playlist:</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="epic-partylist"
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

export default CreateNew;
