import { reactive } from "vue";

class AudioPlayerStore {
  src: undefined | string;
  startTime: undefined | number;
  endTime: undefined | number;
  paused = true;

  setAudioTimes(start: number, end: number) {
    this.startTime = start;
    this.endTime = end;
    return this;
  }

  play() {
    this.paused = false;
    return this;
  }

  pause() {
    this.paused = true;
    return this;
  }

  getCurrentTime() {
    // Overridden at run time by audio player
    return undefined;
  }
}

const store = reactive(new AudioPlayerStore());
export const useAudioPlayerStore = () => store;
