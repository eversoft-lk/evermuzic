type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  localized: {
    title: string;
    description: string;
  };
};

type ContentDetails = {
  itemCount: number;
};

export type Playlist = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
};
