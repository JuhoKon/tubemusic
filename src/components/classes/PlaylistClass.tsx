//TODO: make it work like an actual playlist?
interface playlist {
  //here what playlist has
  createdAt: string;
  disabled?: boolean;
  loadPlaylist: (id: Playlist["_id"]) => string; //TODO add something to these functions
  deletePlaylist: (id: Playlist["_id"]) => void;
  name: string;
  owner: string;
  _id: string;
}
class Playlist implements playlist {
  createdAt: string;
  disabled?: boolean;
  name: string;
  owner: string;
  _id: string;

  constructor(
    createdAt: string,
    disabled: boolean,
    name: string,
    owner: string,
    _id: string
  ) {
    this.createdAt = createdAt;
    this.disabled = disabled;
    this.name = name;
    this.owner = owner;
    this._id = _id;
  }
  deletePlaylist(id: string) {}
  loadPlaylist(id: string) {
    return "string";
  }
}
export { Playlist };
