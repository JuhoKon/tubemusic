import React, { Component } from "react";
import Videoitem from "./videoitem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../spinner/spinner";
import "./videolist.css";
import "simplebar/dist/simplebar.min.css";
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
class Videolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      error: this.props.error,
      errorText: this.props.errorText,
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
  render() {
    const items = this.props.items;
    //console.log(this.state.error);
    console.log(items);
    return (
      <div id="videolist33">
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
