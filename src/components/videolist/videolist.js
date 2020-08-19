import React, { Component } from "react";
import Videoitem from "./videoitem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../spinner/spinner";
import "./videolist.css";
import "simplebar/dist/simplebar.min.css";
import ModalExample from "../modal/Modal";

class Videolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      error: this.props.error,
      errorText: this.props.errorText,
      showModal: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        loading: this.props.loading,
        error: this.props.error,
        errorText: this.props.errorText,
      });
    }
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  render() {
    const items = this.props.items;
    //console.log(this.state.error);
    console.log(items);
    return (
      <div id="videolist33">
        <ModalExample
          show={this.state.showModal}
          toggleModal={this.toggleModal}
        />
        {this.state.loading ? (
          <div className="loadingPlace">
            <LoadingSpinner color="#545454" />
          </div>
        ) : null}
        {this.state.error ? <span>{this.state.errorText}</span> : ""}

        {items.map(
          ({
            title,
            publishedAt,
            channelTitle,
            videoId,
            thumbnail,
            uniqueId,
            duration,
            thumbnails,
            artists,
            resultType,
            artist,
            browseId,
          }) => {
            return (
              <CSSTransition key={uniqueId} timeout={500} classNames="fade">
                <Videoitem
                  playNext={this.props.playNext}
                  uniqueId={uniqueId}
                  title={title}
                  thumbnail={thumbnail && thumbnail}
                  channelTitle={channelTitle}
                  publishedAt={publishedAt}
                  videoId={videoId}
                  addFunc={this.props.onAdd}
                  onPlay={this.props.onPlay}
                  AddToPlaylist={this.props.AddToPlaylist}
                  duration={duration}
                  artists={artists}
                  resultType={resultType}
                  artist={artist}
                  browseId={browseId}
                  thumbnails={thumbnails}
                  toggleModal={this.toggleModal}
                />
              </CSSTransition>
            );
          }
        )}
      </div>
    );
  }
}
export default Videolist;
