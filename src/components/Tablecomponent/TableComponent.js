import React, { Component } from "react";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const list = [
      { name: "Brian Vaughn", description: "Software engineer" },
      { name: "Brian Vasughn", description: "Software engineesr" }
      // And so on...
    ];
    const playlists = this.props.playlists;
    console.log(playlists);
    return (
      <div>
        {this.props.item}
        <Table
          width={300}
          height={300}
          headerHeight={20}
          rowHeight={30}
          rowCount={playlists.length}
          rowGetter={({ index }) => playlists[index]}
        >
          <Column label="Name" dataKey="name" width={100} />
          <Column label="owner" dataKey="owner" width={100} />
          <Column label="createdAt" dataKey="createdAt" width={100} />
        </Table>
      </div>
    );
  }
}

export default TableComponent;
