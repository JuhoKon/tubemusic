import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
class Link extends Component {
  state = {
    loading: false
  };
  async loadPlaylist(playlist) {
    this.setState({
      loading: true
    });
    await timeout(500);
    let res = await this.props.loadPlaylist(playlist._id);
    console.log(res);
    if (res) {
      this.setState({
        loading: false
      });
    }
  }
  deletePlaylist(playlist) {
    this.props.deletePlaylist(playlist._id);
  }
  render() {
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
