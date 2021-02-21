import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "moment-duration-format";

class TrackItem extends Component {
  state = {
    artistName: this.props.artistName,
    title: this.props.title,
    imported: this.props.imported,
    date: this.props.date,
    duration: this.props.duration,
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    return false;
  }*/
  addToImport(props) {
    //console.log(props);
    this.props.addToImport(props);
  }
  removeFromPlaylist(props) {
    this.props.removeFromPlaylist(props);
  }
  render() {
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="2" sm="2">
                {this.props.thumbnail && (
                  <img
                    height={60}
                    src={this.props.thumbnail} // use normal <img> attributes as props
                    width={60}
                    style={{ position: "absolute" }}
                    id="thumbnail44"
                    alt="foo"
                  />
                )}
              </Col>

              <Col xs="8" sm="8">
                <CardText>{this.state.title}</CardText>
              </Col>
              {/*tänne tavaraa mm. milloin lisätty? ovat nyt propeissa  */}
              <Col xs="2" sm="2">
                {this.state.imported ? (
                  <Button
                    onClick={this.removeFromPlaylist.bind(this, this.props)}
                    className="btn btn-secondary"
                    color="secondary"
                  >
                    x
                  </Button>
                ) : (
                  <Button
                    onClick={this.addToImport.bind(this, this.props)}
                    className="btn btn-secondary"
                    color="secondary"
                  >
                    +
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs="10" sm="10">
                <span className="float-right">{this.state.duration}</span>
              </Col>
              <Col xs="2" sm="2"></Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default TrackItem;
