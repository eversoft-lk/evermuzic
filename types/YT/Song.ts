type Thumbnail = {
  sm: string;
  md: string;
  lg: string;
};

export type Song = {
  id: string;
  name: string;
  artist: string;
  thumbnail: Thumbnail;
  duration: string;
  url: string;
};
