import React, { Component } from "react";
import { Card, CardBody, CardText, Row, Col, Button } from "reactstrap";
import Moment from "react-moment";
import "moment-duration-format";
import { getPlayListById } from "../functions/functions";

class PlayListItem extends Component {
  constructor(props) {
    super(props);
  }

  clickOnPlayList() {
    this.props.getPlayListById(this.props.id);
  }

  render() {
    //console.log(this.props);
    //console.log(this.state);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="6" sm="6">
                <Button
                  href="# "
                  color="secondary"
                  style={{ cursor: "pointer" }}
                  onClick={this.clickOnPlayList.bind(this, this.state)}
                >
                  <CardText>{this.props.name}</CardText>
                </Button>
              </Col>

              <Col xs="4" sm="4">
                <small className="text-muted">
                  Created at:{" "}
                  <Moment format="DD-MM-YYYY HH:mm">
                    {this.props.createdAt}
                  </Moment>
                </small>
              </Col>
              <Col xs="2" sm="2">
                By {this.props.owner}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default PlayListItem;
