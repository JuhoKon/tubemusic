import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  FormGroup,
  Label,
} from "reactstrap";
import classnames from "classnames";
import "./search.css";
import ReactAutocomplete from "react-autocomplete";
import { autocomplete } from "../functions/functions";

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
class Search extends Component {
  state = {
    text: "",
    dbtext: "",
    activeTab: "1",
    autoCompleteItems: [{ title: "", _id: "s" }],
    checked: false,
  };
  onChangetext = async (e) => {
    let value = e.target.value;
    this.setState({
      text: value,
      dbtext: value,
    });

    await timeout(150);
    if (value !== this.state.text) return; //we got new stuff?
    if (value === "") return;
    //let res = await handleSubmit_db(value);
    let res = await autocomplete(value);
    console.log(res);
    this.setState({
      autoCompleteItems: res,
    });
  };
  onSelect = (val) => {
    this.setState({
      dbtext: val,
      text: val,
    });
  };
  submit = (e) => {
    e.preventDefault();
    if (this.state.checked) {
      this.getArtists();
      return;
    }
    this.props.handleSubmit(this.state.text);
  };
  getArtists() {
    this.props.getArtists(this.state.text);
  }
  submitDb = async (e) => {
    e.preventDefault();
    //let res = await handleSubmit_db(this.state.text);
    this.props.handleDB(null, this.state.text);
  };
  toggle = (i) => {
    this.setState({
      activeTab: i,
    });
    this.props.setTab(i);
  };
  boxChange = (evt) => {
    this.setState({ checked: evt.target.checked });
  };
  render() {
    let { activeTab } = this.state;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Database
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              YouTube
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <form onSubmit={this.submitDb}>
                  <InputGroup>
                    {/*<Input
                      type="text"
                      placeholder="Search for songs on YouTube..."
                      required
                      className="form-control"
                      value={this.state.text}
                      onChange={this.onChangetext}
                    />*/}
                    <ReactAutocomplete
                      autoHighlight={false}
                      renderInput={function (props) {
                        return (
                          <input
                            id="autocomplete"
                            placeholder="Search for songs from our DB by Track, Album or Artist"
                            {...props}
                          />
                        );
                      }}
                      items={this.state.autoCompleteItems}
                      wrapperStyle={{
                        width: "calc(100% - 71px)",
                      }}
                      getItemValue={(item) => item.title}
                      menuStyle={{
                        zIndex: 10000,
                        borderRadius: "3px",
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                        background: "#ffffff",
                        padding: "2px 0",
                        fontSize: "90%",
                        position: "fixed",
                        overflow: "auto",
                        maxHeight: "50%", // TODO: don't cheat, let it flow to the bottom
                      }}
                      renderItem={(item, highlighted) => (
                        <div
                          key={item._id}
                          style={{
                            color: "#000000",
                            backgroundColor: highlighted
                              ? "rgb(219, 219, 219)"
                              : "transparent",
                          }}
                        >
                          {item.title}
                        </div>
                      )}
                      value={this.state.text}
                      onChange={(e) => this.onChangetext(e)}
                      onSelect={(value) => this.onSelect(value)}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary">Search</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <form onSubmit={this.submit}>
                  <InputGroup>
                    {/*<Input
                      type="text"
                      placeholder="Search for songs on YouTube..."
                      required
                      className="form-control"
                      value={this.state.text}
                      onChange={this.onChangetext}
                    />*/}
                    <ReactAutocomplete
                      renderInput={function (props) {
                        return (
                          <input
                            id="autocomplete"
                            placeholder="Search for songs on YouTube..."
                            {...props}
                          />
                        );
                      }}
                      items={this.state.autoCompleteItems}
                      wrapperStyle={{
                        width: "calc(100% - 71px)",
                      }}
                      getItemValue={(item) => item.title}
                      menuStyle={{
                        zIndex: 10000,
                        borderRadius: "3px",
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                        background: "#ffffff",
                        padding: "2px 0",
                        fontSize: "90%",
                        position: "fixed",
                        overflow: "auto",
                        maxHeight: "50%", // TODO: don't cheat, let it flow to the bottom
                      }}
                      renderItem={(item, highlighted) => (
                        <div
                          key={item._id}
                          style={{
                            color: "#000000",
                            backgroundColor: highlighted
                              ? "rgb(219, 219, 219)"
                              : "transparent",
                          }}
                        >
                          {item.title}
                        </div>
                      )}
                      value={this.state.text}
                      onChange={(e) => this.onChangetext(e)}
                      onSelect={(value) => this.onSelect(value)}
                    />

                    <InputGroupAddon addonType="append">
                      <Button color="secondary">Search</Button>
                    </InputGroupAddon>
                    <FormGroup check>
                      <Label check>
                        <Input
                          name="checked"
                          onChange={this.boxChange}
                          checked={this.state.checked}
                          type="checkbox"
                        />{" "}
                        Search for artists
                      </Label>
                    </FormGroup>
                  </InputGroup>
                </form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Search;
