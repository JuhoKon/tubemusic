import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
class Search extends Component {
  state = {
    text: ""
  };
  onChangetext = e => {
    this.setState({
      text: e.target.value
    });
  };
  submit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.text);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"></InputGroupAddon>
            <Input
              type="text"
              placeholder="Search for songs on YouTube..."
              required
              className="form-control"
              value={this.state.text}
              onChange={this.onChangetext}
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    );
  }
}

export default Search;
