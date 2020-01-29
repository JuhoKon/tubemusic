import React, { Component } from "react";
import Videoitem from "./videoitem";
import { CSSTransition } from "react-transition-group";
import isEqual from "react-fast-compare";
import LoadingSpinner from "../spinner/spinner";
import "./videolist.css";

class Videolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        loading: this.props.loading
      });
    }
  }
  render() {
    const items = this.props.items;
    console.log(this.state.loading);

    return (
      <div id="videolist">
        {this.state.loading ? (
          <div className="loadingPlace">
            <LoadingSpinner />
          </div>
        ) : null}
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
        <Videoitem
          uniqueId={"uniqueId"}
          title={"Eminem - Never Love Again (Music To Be Murska)"}
          thumbnail={"humbnail"}
          channelTitle={"Visionary"}
          publishedAt={"2020-01-17T06:14:47.000Z"}
          videoId={"6lWb5nSjt-4"}
          addFunc={this.props.onAdd}
          onPlay={this.props.onPlay}
          AddToPlaylist={this.props.AddToPlaylist}
          duration={"PT2M58S"}
        />
      </div>
    );
  }
}
export default Videolist;
