import { defineStore } from "pinia";
import type { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import type { Song } from "~/types/YT";

type getSongsResponse = {
  result: Song[];
};

type PlayerType = YouTubePlayerType | null;

export const usePlayer = defineStore("player", {
  state: () => ({
    player: null as PlayerType,
    songs: [] as string[],
    lastPlayTime: 0,
    isPlaying: false,
    nowPlaying: 0,
  }),
  getters: {},
  actions: {
    addToQueue(id: string) {
      this.songs.push(id);
    },
    playNow(id: string) {
      if (!this.player) {
        return;
      }
      // reset songs
      this.songs = [];
      this.nowPlaying = 0;
      this.songs.push(id);

      // load and play new one
      this.player.loadVideoById(this.songs[this.nowPlaying]);
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
      this.player.loadVideoById(this.songs[this.nowPlaying]);
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
      this.player.loadVideoById(this.songs[this.nowPlaying]);
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
