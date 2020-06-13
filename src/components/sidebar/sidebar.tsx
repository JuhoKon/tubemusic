import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./sidebar.css";
class Sidebar extends Component<any, any> {
  state = {
    loading: false,
  };

  render() {
    console.log(this.props);

    return (
      <div className="sidebardiv">
        {this.props.playlists.map((item: any, i: any) => (
          <div key={i}>{item.name}</div>
        ))}
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Sidebar;
