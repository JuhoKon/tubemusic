import React, { Component } from "react";

class Link extends Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <p>Load this item:</p>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Link;
