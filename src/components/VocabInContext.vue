<script setup>
import TextView from "@/components/TextView.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import MainWindow from "@/components/MainWindow.vue";
import { Activity } from "@/activity";
import SentenceActivity from "@/sentence-activity";
import { reactive } from "vue";

const props = defineProps(["db"]);
const emit = defineEmits(["done"]);

const sentenceActivity = reactive(
  new SentenceActivity(props.db, () => emit("done"))
);
sentenceActivity.load();

const wordOptions = (raw, clean) => {
  return clean === sentenceActivity.word().word ? { bold: true } : {};
};

const wordPool = () => {
  return sentenceActivity.wordPool
    .filter((w) => w.isDefined())
    .map((w) => w.definition);
};
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
