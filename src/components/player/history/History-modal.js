import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Form, Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import HistoryItem from "./history-item";
import isEqual from "react-fast-compare";
class HistoryModal extends Component {
  state = {
    modal: false,
    name: "",
    history: this.props.history
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    /* console.log(this.props.playlistId);
    this.props.Updateplaylist(this.state.name, this.props.playlistId);
    this.toggle();*/
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        history: this.props.history
      });
    }
  }
  render() {
    //console.log(this.props);
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader className="mb-4" toggle={this.props.toggle}>
            Recently played songs:
          </ModalHeader>
          <Button className="float-right">Clear All</Button>
          <ModalBody>
            <div id="videolist">
              {this.state.history.map(({ title, videoId, url }) => (
                <CSSTransition
                  key={Math.random()}
                  timeout={500}
                  classNames="fade"
                >
                  <HistoryItem
                    url={url}
                    name={title}
                    videoId={videoId}
                    addFunc={this.props.addFunc}
                    onPlay={this.props.onPlay}
                    AddToPlaylist={this.props.AddToPlaylist}
                  />
                </CSSTransition>
              ))}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default HistoryModal;
