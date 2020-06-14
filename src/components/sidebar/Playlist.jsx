import React from "react";
//Tänne myös contet menu? Load playlist && Delete playlist tms.
//contextiin voisi tehdä mm. save-as model
//tänne voisi laittaa sen create new jutunkin
//pitää miettii uudelleen minne laittaa sen put to queue ja play playlist
//nekin voisi löytyä siitä context - menusta.
//&edit modalkin voisi olla siellä context menussa linkkinä?
//oikeet propsit vaa ni toimii.
//playlist-itemien eli niiden osittolistojen nimiä täytyy parsia että ei oo koko mitaltaan siellä
//lisää toolboxin kaikkiin niiihin, johon tulee sitten se nimi näkyviin.
import isEqual from "react-fast-compare";
export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name.substring(0, 400),
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      this.setState({
        name: this.props.name,
      });
    }
  }
  loadPlaylist(id) {
    this.props.loadPlaylist(id);
  }
  render() {
    //console.log(this.props);
    return (
      <div
        onClick={this.loadPlaylist.bind(this, this.props._id)}
        className="sidebar-playlist"
      >
        {this.state.name}
      </div>
    );
  }
}
