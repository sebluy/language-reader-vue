<script setup>
import TextView from "@/components/TextView.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import SentenceActivity from "@/components/SentenceActivity.vue";
import { Activity } from "@/activity";

const props = defineProps(["db"]);

const wordOptions = (word, raw, clean) => {
  return clean === word.word ? { bold: true } : {};
};

const poolWords = (pool) => {
  return pool.map((w) => w.definition).filter((d) => d !== "");
};
</script>

<template>
  <SentenceActivity :activity="Activity.VOCAB_IN_CONTEXT" :db="props.db" >
    <template #sentence-activity="slotProps">
      <TextView
        :sentences="slotProps.rawSentences"
        :word-options="(raw, clean) => wordOptions(slotProps.word, raw, clean)"
      />
      <MultipleChoice
        :pool="poolWords(slotProps.poolWords)"
        :solution="slotProps.word.definition"
        @correct-answer="slotProps.correctAnswer"
      />
    </template>
  </SentenceActivity>
</template>
