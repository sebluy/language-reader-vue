<script setup>
import { reactive, toRaw, watch } from "vue";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { useLanguageDB } from "@/language-db";

const props = defineProps(["sentence"]);
const audioPlayer = useAudioPlayerStore();
const db = useLanguageDB();

const state = reactive({
  startTime: props.sentence.startTime,
  endTime: props.sentence.endTime,
});

watch(props, () => {
  state.startTime = props.sentence.startTime;
  state.endTime = props.sentence.endTime;
});

const parseTime = (str) => {
  if (str === "") return undefined;
  return Number.parseFloat(str);
};

const updateAudioTimes = () => {
  let start = parseTime(state.startTime);
  let end = parseTime(state.endTime);

  props.sentence.updateTimes(start, end);
  audioPlayer.setAudioTimes(start, end);
  db.putSentence(toRaw(props.sentence));
};
</script>

<template>
  <input
    ref="definitionInput"
    type="number"
    placeholder="Start Time"
    v-model="state.startTime"
    @blur="updateAudioTimes"
  />
  <input
    ref="definitionInput"
    type="number"
    placeholder="End Time"
    v-model="state.endTime"
    @blur="updateAudioTimes"
  />
</template>
