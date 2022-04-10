<script setup>
import MultipleChoice from "@/components/MultipleChoice.vue";
import MainWindow from "@/components/MainWindow.vue";
import { Activity } from "@/activity";
import SentenceActivity from "@/sentence-activity";
import { onBeforeMount, onBeforeUpdate, reactive } from "vue";
import useEmitter from "@/composables/useEmitter";
import { GlobalEvents } from "@/global-events";

const props = defineProps(["db"]);
const emit = defineEmits(["done"]);
const emitter = useEmitter();

const sentenceActivity = reactive(
  new SentenceActivity(props.db, () => emit("done"))
);

const emitSentenceAudio = () => {
  const sentence = sentenceActivity.sentence();
  emitter.emit(GlobalEvents.SET_AUDIO_TIMES_AND_PLAY, {
    start: sentence.startTime,
    end: sentence.endTime,
  });
};

onBeforeMount(() => {
  sentenceActivity.load();
});

onBeforeUpdate(() => {
  emitSentenceAudio();
});
</script>

<template>
  <MainWindow v-if="sentenceActivity.sentence()" :title="Activity.LISTENING2">
    <template #activity>
      <MultipleChoice
        :pool="sentenceActivity.sentencePool"
        :solution="sentenceActivity.sentence().definition"
        @correct-answer="() => sentenceActivity.correctAnswer()"
      />
    </template>
  </MainWindow>
</template>
