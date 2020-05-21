import { Song } from "./SongClass";

//TODO: make it work like an actual playlist?
interface playlist {
  //here what playlist has
  songs: Array<song>;
}
interface song {
  //here what playlist has
  title: string;
  channelTitle: string;
  videoId: string;
  uniqueId: number;
  duration: string;
}
class PlaylistObject implements playlist {
  songs: Array<song>;

  constructor(songs: Array<Song>) {
    this.songs = songs;
  }
  addSong(Song: song) {
    this.songs.push(Song);
  }
}
export { PlaylistObject };
