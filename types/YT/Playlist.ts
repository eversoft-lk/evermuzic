interface Channel {
  id: string;
  name: string;
  link: string;
  handle: string | null;
  verified: boolean;
  thumbnail: string;
}

interface Video {
  id: string;
  title: string;
  link: string;
  duration: number;
  durationString: string;
  thumbnail: string;
}

export interface Playlist {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  channel: Channel;
  videoCount: number;
  videos: Video[];
}
