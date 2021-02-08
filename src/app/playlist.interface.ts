export interface Playlist {
  name?: string;
  createdDate?: string;
  songs?: songs[];
}

export interface songs {
  albumId?: number;
  duration?: string;
  id?: number;
  singer?: string;
  thumbnailUrl?: string;
  title?: string;
  url?: string;
  status?:string
}
