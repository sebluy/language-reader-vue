<script setup>
import TextView from "@/components/TextView.vue";
import SentenceActivity from "@/components/SentenceActivity.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import { Activity } from "@/activity";

const props = defineProps(["db"]);
const emit = defineEmits(["set-audio"]);

const wordOptions = (slotProps) => {
  return (raw, clean) => {
    return clean === slotProps.word.word ? { blank: true } : {};
  };
};

const poolWords = (pool) => {
  return pool.map((w) => w.word);
};

const correctAnswer = (slotProps) => {
  slotProps.correctAnswer();
  emit("set-audio");
};

</script>

<template>
  <SentenceActivity :activity="Activity.LISTENING1" :db="props.db">
    <template #sentence-activity="slotProps">
      <TextView
        :sentences="slotProps.rawSentences"
        :word-options="wordOptions(slotProps)"
      />
      <MultipleChoice
        :pool="poolWords(slotProps.poolWords)"
        :solution="slotProps.word.word"
        @correct-answer="slotProps.correctAnswer"
      />
    </template>
  </SentenceActivity>
</template>
