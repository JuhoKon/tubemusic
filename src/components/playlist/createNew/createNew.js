import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class CreateNew extends Component {
  state = {
    modal: false,
    name: "",
    checked: false
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
    console.log(e);
    this.props.makePlaylist(this.state.name, [], this.state.checked); //if true, we have a private playlist
    this.toggle();
  };
  boxChange = evt => {
    this.setState({ checked: evt.target.checked });
  };
  render() {
    console.log(this.state.checked);
    return (
      <div>
        <Button
          className="float-left btn-margin btn-secondary btn button"
          onClick={this.toggle}
          href="#"
          color="secondary"
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
                <div className="check">
                  <Label check className="float-right ">
                    <Input
                      name="checked"
                      onChange={this.boxChange}
                      checked={this.state.checked}
                      type="checkbox"
                    />
                    Make the playlist private?
                  </Label>
                </div>
                <br />
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
