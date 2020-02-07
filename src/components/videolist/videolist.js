import React, { Component } from "react";
import Videoitem from "./videoitem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../spinner/spinner";
import "./videolist.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
class Videolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      error: this.props.error
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        loading: this.props.loading,
        error: this.props.error
      });
    }
  }
  render() {
    const items = this.props.items;
    console.log(this.state.error);

    return (
      <div id="videolist">
        {this.state.loading ? (
          <div className="loadingPlace">
            <LoadingSpinner />
          </div>
        ) : null}
        {this.state.error ? (
          <span>
            Error has occured. Most likely quote limit has been exceeded for the
            day.
          </span>
        ) : (
          ""
        )}
        {items.map(
          ({
            title,
            publishedAt,
            channelTitle,
            videoId,
            thumbnail,
            uniqueId,
            duration
          }) => (
            <CSSTransition key={uniqueId} timeout={500} classNames="fade">
              <Videoitem
                uniqueId={uniqueId}
                title={title}
                thumbnail={thumbnail}
                channelTitle={channelTitle}
                publishedAt={publishedAt}
                videoId={videoId}
                addFunc={this.props.onAdd}
                onPlay={this.props.onPlay}
                AddToPlaylist={this.props.AddToPlaylist}
                duration={duration}
              />
            </CSSTransition>
          )
        )}
      </div>
    );
  }
}
export default Videolist;
