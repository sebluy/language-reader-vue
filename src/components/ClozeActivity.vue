<script setup>
import TextView from "@/components/TextView.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import MainWindow from "@/components/MainWindow.vue";
import { Activity } from "@/activity";
import SentenceActivity from "@/sentence-activity";
import { onBeforeMount, reactive } from "vue";
import { Word } from "@/word";

// TODO: deduplicate with other sentence activities
const emit = defineEmits(["done"]);

const sentenceActivity = reactive(
  new SentenceActivity(Word.MASTERY_LEVELS.CLOZE, () => emit("done"))
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
</script>

<template>
  <MainWindow v-if="sentenceActivity.word()" :title="Activity.CLOZE">
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
