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
  constructor(
    title: string,
    channelTitle: string,
    videoId: string,
    uniqueId: number,
    duration: string
  ) {
    this.title = title;
    this.channelTitle = channelTitle;
    this.videoId = videoId;
    this.uniqueId = uniqueId;
    this.duration = duration;
  }
}
export { Song };
