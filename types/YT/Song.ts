type Thumbnail = {
  sm: string;
  md: string;
  lg: string;
};

export type Song = {
  name: string;
  artist: string;
  thumbnail: Thumbnail;
  duration: string;
  url: string;
};
