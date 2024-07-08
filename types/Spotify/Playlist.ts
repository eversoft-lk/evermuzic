type ExternalUrls = {
  spotify: string;
};

type Image = {
  height: number | null;
  url: string;
  width: number | null;
};

type Owner = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

type Tracks = {
  href: string;
  total: number;
};

export type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
};
