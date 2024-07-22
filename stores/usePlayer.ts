import { defineStore } from "pinia";
import type { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import type { Song as YTSong } from "~/types/YT";

type getSongsResponse = {
  result: YTSong[];
};

type PlayerType = YouTubePlayerType | null;
type NowPlaylingType = "nothing" | "song" | "playlist" | "artist";
type Song = {
  id: string;
  name: string;
  artist: string;
  thumbnail: string;
};
type ErrorType = {
  id: string;
  name: string;
  index: number;
  result: YTSong[];
} | null;

export const usePlayer = defineStore("player", {
  state: () => ({
    searchQuery: null as string | null,
    player: null as PlayerType,
    songs: [] as Song[],
    lastPlayTime: 0,
    isPlaying: false,
    lastLocationBeforePlay: "",
    nowPlaying: 0,
    nowPlayingType: "nothing" as NowPlaylingType,
    playlistId: "",
    error: null as ErrorType,
  }),
  getters: {},
  actions: {
    addToQueue(song: Song) {
      this.songs.push(song);
    },
    playNow(song: Song) {
      if (!this.player) {
        return;
      }

      this.nowPlayingType = "song";
      // reset songs
      this.songs = [];
      this.nowPlaying = 0;
      this.songs.push(song);

      // load and play new one
      this.player.loadVideoById(this.songs[this.nowPlaying].id);
      this.player.playVideo();
    },
    playOrPause() {
      if (!this.player) {
        return;
      }
      if (this.isPlaying) {
        this.player.pauseVideo();
      } else {
        this.player.playVideo();
      }
    },
    next() {
      if (!this.player) {
        return;
      }
      if (!this.songs.length) {
        return;
      }
      if (this.nowPlaying + 1 >= this.songs.length) {
        this.nowPlaying = 0;
        return;
      }
      this.nowPlaying++;
      this.player.loadVideoById(this.songs[this.nowPlaying].id);
      this.player.playVideo();
    },
    async prev() {
      if (!this.player) {
        return;
      }
      if (!this.songs.length) {
        return;
      }
      const currentTime = await this.player?.getCurrentTime();
      if (currentTime > 10) {
        await this.player.seekTo(0, true);
        return;
      }
      if (this.nowPlaying - 1 < 0) {
        this.nowPlaying = this.songs.length - 1;
        return;
      }
      this.nowPlaying--;
      this.player.loadVideoById(this.songs[this.nowPlaying].id);
      this.player.playVideo();
    },
    async getYTID(name: string) {
      const { data } = await useFetch<getSongsResponse>(
        useRuntimeConfig().public.youtubeApi + `/videos?q=${name}`
      );

      if (!data.value) {
        return;
      }

      return data.value.result[0].id;
    },
  },
});
