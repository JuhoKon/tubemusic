import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardText,
  Row,
  Col
} from "reactstrap";
import isEqual from "react-fast-compare";
import moment from "moment";
import "moment-duration-format";

class Queueitem extends Component {
  onClick(props) {
    //launch modal
    alert(props.name);
  }
  render() {
    //console.log(this.props);
    return (
      <div>
        <a
          style={{ cursor: "pointer" }}
          onClick={this.onClick.bind(this, this.props)}
        >
          <Card className="card">
            <CardBody>
              <Row>
                <Col xs="2" sm="2"></Col>
                <Col xs="7" sm="7">
                  <CardText>{this.props.name}</CardText>
                </Col>
                <Col xs="1" sm="1"></Col>
                <Col xs="2" sm="2"></Col>
              </Row>
            </CardBody>
          </Card>
        </a>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Queueitem;
