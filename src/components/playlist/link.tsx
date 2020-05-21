import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
type LinkState = {
  loading: boolean;
};
type Playlist = {
  //here what playlist has
  createdAt: string;
  disabled?: boolean;
  loadPlaylist: (id: Playlist["_id"]) => string; //TODO add something to these functions
  deletePlaylist: (id: Playlist["_id"]) => void;
  name: string;
  owner: string;
  _id: string;
};
interface LinkProps {
  createdAt: string;
  disabled?: boolean;
  loadPlaylist: (id: Playlist["_id"]) => string; //TODO add something to these functions
  deletePlaylist: (id: Playlist["_id"]) => void;
  name: string;
  owner: string;
  _id: string;
}
//TODO: add universal types somewhere for playlist items, playlists and so on.
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
class Link extends Component<LinkProps, LinkState> {
  state = {
    loading: false,
  };
  async loadPlaylist(playlist: Playlist) {
    this.setState({
      loading: true,
    });
    await timeout(500);
    let res = await this.props.loadPlaylist(playlist._id);

    if (res) {
      this.setState({
        loading: false,
      });
    }
  }
  deletePlaylist(playlist: Playlist) {
    console.log(playlist);
    this.props.deletePlaylist(playlist._id);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              <Button
                className="btn btn-primary float-right btn-remove"
                color="danger"
                onClick={this.deletePlaylist.bind(this, this.props)}
              >
                x
              </Button>
              <Button
                color="primary"
                onClick={this.loadPlaylist.bind(this, this.props)}
                className={
                  this.state.loading
                    ? "loading btn btn-primary float-left"
                    : "btn btn-primary float-left"
                }
              >
                {this.state.loading ? "Loading..." : "Load"}
              </Button>
            </span>
            <CardTitle style={{ textAlign: "center" }}>
              {this.props.name}
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Link;
