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
  thumbnail?: any;
  thumbnails?: any;
  constructor(
    title: string,
    channelTitle: string,
    videoId: string,
    uniqueId: number,
    duration: string,
    artists: any,
    album: any,
    thumbnail: any,
    thumbnails: any
  ) {
    this.title = title;
    this.channelTitle = channelTitle;
    this.videoId = videoId;
    this.uniqueId = uniqueId;
    this.duration = duration;
    this.artists = artists;
    this.album = album;
    this.thumbnail = thumbnail;
    this.thumbnails = thumbnails;
  }
}
export { Song };
