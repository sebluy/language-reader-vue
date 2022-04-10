<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import useEmitter from "@/composables/useEmitter";
import { GlobalEvents } from "@/global-events";

const props = defineProps(["audio"]);
const audio = ref(null);
const emitter = useEmitter();
let startTime;
let endTime;
let timeout;

const play = () => {
  // TODO: Fix playback for 0
  clearTimeout(timeout);
  audio.value.play();
  if (endTime) {
    let remaining = endTime - audio.value.currentTime;
    timeout = window.setTimeout(reset, remaining * 1000);
  }
};

const reset = () => {
  if (startTime) audio.value.currentTime = startTime;
  pause();
};

const toggle = () => {
  if (audio.value.paused) play();
  else pause();
};

const replay = () => {
  reset();
  play();
};

const pause = () => {
  clearTimeout(timeout);
  if (!audio.value.paused) audio.value.pause();
};

const setTimes = (start, end) => {
  startTime = start;
  endTime = end;
  reset();
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
  emitter.on(GlobalEvents.SET_AUDIO_TIMES, ({ start, end }) => {
    setTimes(start, end);
  });
  emitter.on(GlobalEvents.SET_AUDIO_TIMES_AND_PLAY, ({ start, end }) => {
    setTimes(start, end);
    play();
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});
</script>

<template>
  <audio controls :src="props.audio.src" ref="audio" />
</template>
