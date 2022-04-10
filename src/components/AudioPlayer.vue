<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import useEmitter from "@/composables/useEmitter";
import { GlobalEvents } from "@/global-events";

const props = defineProps(["audio"]);
const audio = ref(null);
const emitter = useEmitter();
let playing = false;
let startTime;
let endTime;
let timeout;

const play = () => {
  // TODO: Fix playback for 0
  clearTimeout(timeout);
  audio.value.play();
  if (endTime) {
    let remaining = endTime - audio.value.currentTime;
    timeout = window.setTimeout(() => {
      audio.value.currentTime = startTime;
      audio.value.pause();
    }, remaining * 1000);
  }
};

const pause = () => {
  clearTimeout(timeout);
  if (!audio.value.paused) audio.value.pause();
};

const setTimes = (start, end) => {
  if (start !== undefined) audio.value.currentTime = startTime;
  pause();
  startTime = start;
  endTime = end;
};

const keyListener = (e) => {
  let input =
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement;
  if (input) return;
  if (e.key !== "p") return;
  playing = !playing;
  if (playing) pause();
  else play();
};

onMounted(() => {
  document.addEventListener("keydown", keyListener);
  emitter.on(GlobalEvents.SET_AUDIO_TIMES, ({ start, end }) => {
    setTimes(start, end);
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});
</script>

<template>
  <audio controls :src="props.audio.src" ref="audio" />
</template>
