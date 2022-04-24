<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useAudioPlayerStore } from "@/stores/audio-player-store";

const audio = ref(null);
const store = useAudioPlayerStore();
store.getCurrentTime = () => {
  return audio.value.currentTime;
};
let startTime;
let endTime;
let timeout;

const play = () => {
  // TODO: Fix playback for 0
  if (audio.value.paused) {
    audio.value.play();
    store.play();
    resetTimeout();
  }
};

const resetTimeout = () => {
  clearTimeout(timeout);
  if (endTime && !audio.value.paused) {
    let remaining = endTime - audio.value.currentTime;
    timeout = window.setTimeout(() => {
      pause();
      reset();
    }, remaining * 1000);
  }
};

const reset = () => {
  if (startTime) audio.value.currentTime = startTime;
};

const toggle = () => {
  if (audio.value.paused) play();
  else pause();
};

const replay = () => {
  reset();
  resetTimeout();
  play();
};

const pause = () => {
  if (!audio.value.paused) {
    audio.value.pause();
    store.pause();
    resetTimeout();
  }
};

const keyListener = (e) => {
  let input =
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement;
  if (input) return;
  if (e.key === "p") {
    toggle();
  } else if (e.key === "r") {
    replay();
  }
};

onMounted(() => {
  document.addEventListener("keydown", keyListener);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});

watch(store, () => {
  if (startTime !== store.startTime || endTime !== store.endTime) {
    startTime = store.startTime;
    endTime = store.endTime;
    reset();
    resetTimeout();
  }
  if (audio.value.paused !== store.paused) {
    toggle();
  }
});
</script>

<template>
  <audio controls :src="store.src" ref="audio" />
</template>
