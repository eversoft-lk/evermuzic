interface Channel {
  id: string;
  name: string;
  link: string;
  handle: string | null;
  verified: boolean;
  thumbnail: string;
}

export interface Song {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  channel: Channel;
  description: string;
  views: number;
  uploaded: string;
  duration: number;
  durationString: string;
}