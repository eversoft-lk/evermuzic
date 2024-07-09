type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
};

type ResourceId = {
  kind: string;
  videoId: string;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
};

export type PlaylistItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  duration: string;
};
