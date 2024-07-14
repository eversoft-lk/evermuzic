import { defineStore } from "pinia";
import type { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";

type PlayerType = YouTubePlayerType | null;

export const usePlayer = defineStore("player", {
  state: () => ({
    player: null as PlayerType,
    songs: [] as string[],
    lastPlayTime: 0,
    isPlaying: false,
  }),
  getters: {},
  actions: {},
});
