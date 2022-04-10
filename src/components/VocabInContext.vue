<script setup>
import TextView from "@/components/TextView.vue";
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

const wordOptions = (raw, clean) => {
  return clean === sentenceActivity.word().word ? { bold: true } : {};
};

const wordPool = () => {
  return sentenceActivity.wordPool
    .filter((w) => w.isDefined())
    .map((w) => w.definition);
};

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
  <MainWindow v-if="sentenceActivity.word()" :title="Activity.VOCAB_IN_CONTEXT">
    <template #activity>
      <TextView
        :sentences="sentenceActivity.rawSentences()"
        :word-options="wordOptions"
      />
      <MultipleChoice
        :pool="wordPool()"
        :solution="sentenceActivity.word().definition"
        @correct-answer="() => sentenceActivity.correctAnswer()"
      />
    </template>
  </MainWindow>
</template>
