<script setup>
import TextView from "@/components/TextView.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import MainWindow from "@/components/MainWindow.vue";
import { Activity } from "@/activity";
import SentenceActivity from "@/sentence-activity";
import { onBeforeMount, onBeforeUpdate, reactive } from "vue";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { Word } from "@/word";

const props = defineProps(["db"]);
const emit = defineEmits(["done"]);
const audioPlayer = useAudioPlayerStore();

const sentenceActivity = reactive(
  new SentenceActivity(Word.MASTERY_LEVELS.LISTENING1, props.db, () => emit("done"))
);

const wordOptions = (raw, clean) => {
  return clean === sentenceActivity.word().word ? { blank: true } : {};
};

const wordPool = () => {
  return sentenceActivity.wordPool.map((w) => w.word);
};

onBeforeMount(() => {
  sentenceActivity.load();
});

onBeforeUpdate(() => {
  const sentence = sentenceActivity.sentence();
  audioPlayer.setAudioTimes(sentence.startTime, sentence.endTime);
  audioPlayer.play();
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
        :solution="sentenceActivity.word().word"
        @correct-answer="() => sentenceActivity.correctAnswer()"
      />
    </template>
  </MainWindow>
</template>
