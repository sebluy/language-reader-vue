<script setup>
import { onBeforeUnmount, onMounted, onUpdated, ref } from "vue";

const props = defineProps(["src"]);
const audio = ref(null);
let playing = false;
let keyListener;

onMounted(() => {
  keyListener = (e) => {
    let input =
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement;
    if (input) return;
    if (e.key === "p") {
      playing = !playing;
      if (playing) {
        audio.value.pause();
      } else {
        audio.value.play();
      }
    }
  };
  document.addEventListener("keydown", keyListener);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});
</script>

<template>
  <audio controls :src="props.src" ref="audio" />
</template>
