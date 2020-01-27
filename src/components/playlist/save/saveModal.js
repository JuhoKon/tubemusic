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
import isEqual from "react-fast-compare";

class SaveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      playlistName: this.props.playlistName
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlistName: this.props.playlistName
      });
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      playlistName: this.props.playlistName
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.props.playlistId);
    this.props.Updateplaylist(this.state.playlistName, this.props.playlistId);
    this.toggle();
  };
  render() {
    //console.log(this.props);
    return (
      <div>
        <Button
          className="float-right btn-remove"
          onClick={this.toggle}
          href="#"
          color="primary"
          disabled={this.props.playlistId ? false : true}
        >
          Save as
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
                  name="playlistName"
                  id="playlistName"
                  placeholder={this.state.playlistName}
                  value={this.state.playlistName || ""}
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
