interface song {
  //here what playlist has
  title: string;
  channelTitle: string;
  videoId: string;
  uniqueId: number;
  duration: string;
}
class Song implements song {
  title: string;
  channelTitle: string;
  videoId: string;
  uniqueId: number;
  duration: string;
  artists?: any;
  album?: any;
  constructor(
    title: string,
    channelTitle: string,
    videoId: string,
    uniqueId: number,
    duration: string,
    artists: any,
    album: any
  ) {
    this.title = title;
    this.channelTitle = channelTitle;
    this.videoId = videoId;
    this.uniqueId = uniqueId;
    this.duration = duration;
    this.artists = artists;
    this.album = album;
  }
}
export { Song };
