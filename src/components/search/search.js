import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import ReactAutocomplete from "react-autocomplete";
class Search extends Component {
  state = {
    text: "",
    dbtext: "",
  };
  onChangetext = (e) => {
    this.setState({
      text: e.target.value,
      dbtext: e.target.value,
    });
  };
  onSelect = (val) => {
    this.setState({
      dbtext: val,
    });
  };
  submit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.text);
  };
  render() {
    let { dbtext } = this.state;
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
            {/*<ReactAutocomplete
              items={[
                { id: "foo", label: "foo" },
                { id: "bar", label: "bar" },
                { id: "baz", label: "baz" },
              ]}
              shouldItemRender={(item, value) =>
                item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={(item) => item.label}
              renderItem={(item, highlighted) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: highlighted ? "#eee" : "transparent",
                  }}
                >
                  {item.label}
                </div>
              )}
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
              onSelect={(value) => this.setState({ value })}
                />*/}
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
