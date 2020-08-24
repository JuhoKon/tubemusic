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
} from "reactstrap";
import isEqual from "react-fast-compare";

class SaveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      playlistName: this.props.playlistName,
      checked: this.props.isPrivate,
      playlistOwner: this.props.playlistOwner,
      userName: this.props.userName,
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.boxChange = this.boxChange.bind(this);
  }
  boxChange = (evt) => {
    this.setState({ checked: evt.target.checked });
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      //console.log(this.props.isPrivate);
      this.setState({
        playlistName: this.props.playlistName,
        checked: this.props.isPrivate,
        playlistOwner: this.props.playlistOwner,
        userName: this.props.userName,
      });
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      playlistName: this.props.playlistName,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    this.props.Updateplaylist(
      this.state.playlistName,
      this.props.playlistId,
      this.state.checked
    );
    this.props.saveName(this.state.playlistName);
    this.toggle();
  };
  render() {
    //console.log(this.props);
    return (
      <div>
        <Button
          className="float-right btn-margin btn btn-secondary button"
          onClick={this.toggle}
          href="#"
          color="primary"
          disabled={
            (this.props.playlistId &&
              this.state.playlistOwner === this.state.userName) ||
            this.props.userRole === "Admin"
              ? false
              : true
          }
        >
          Save playlist as
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            cssModule={{ "modal-title": "w-100 text-center" }}
            toggle={this.toggle}
          >
            Save playlist as
            <br />
            <br />
          </ModalHeader>

          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label className="label" for="name">
                  Name:
                </Label>
                <Input
                  type="name"
                  name="playlistName"
                  id="playlistName"
                  placeholder={this.state.playlistName}
                  value={this.state.playlistName || ""}
                  className="mb-4"
                  onChange={this.onChange}
                ></Input>
                <div className="check">
                  <Label check className="float-right">
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

export default SaveModal;
