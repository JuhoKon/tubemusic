import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import isEqual from "react-fast-compare";

class Queueitem extends Component {
  state = {
    editMode: this.props.editMode
  };
  onRemoveClick = id => {
    //console.log(id);
    this.props.onRemove(id);
  };
  onPlayClick = id => {
    //console.log(id);
    this.props.onPlay(id);
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        editMode: this.props.editMode
      });
    }
  }
  render() {
    //console.log(this.props);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              {this.state.editMode ? (
                <Button
                  className="btn btn-primary float-right"
                  color="danger"
                  onClick={this.onRemoveClick.bind(this, this.props)}
                >
                  x
                </Button>
              ) : null}

              <Button
                className="btn btn-primary float-left "
                color="primary"
                onClick={this.onPlayClick.bind(this, this.props)}
              >
                Play
              </Button>
            </span>
            <CardTitle>{this.props.title}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Queueitem;
