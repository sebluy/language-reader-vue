<script setup>
import MainWindow from "@/components/MainWindow.vue";
import { computed, onMounted, reactive } from "vue";
import { Word } from "@/word";
import { RawSentence } from "@/raw-sentence";

const props = defineProps(["db", "activity"]);
const emit = defineEmits(["done"]);
const state = reactive({
  practiceWords: [],
  wordIndex: 0,
  sentences: new Map(),
  poolWords: [],
});

const word = computed(() => state.practiceWords[state.wordIndex]);
const rawSentences = computed(() => {
  if (word.value === undefined) return undefined;
  const sentence = state.sentences.get(word.value.sentenceId);
  return [new RawSentence(sentence.sentence, sentence.sentence, sentence.id)];
});

const correctAnswer = () => {
  state.wordIndex += 1;
  if (state.wordIndex === state.practiceWords.length) emit("done");
};

onMounted(async () => {
  const practiceWords = await props.db.getPracticeByType(
    Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT
  );
  const sentences = await props.db.getSentencesForWords(practiceWords);
  const poolWords = await props.db.getAllWords();
  state.practiceWords = practiceWords;
  state.sentences = sentences;
  state.poolWords = poolWords;
});
</script>

<template>
  <MainWindow v-if="word" :title="activity">
    <template #activity>
      <slot
        name="sentence-activity"
        :rawSentences="rawSentences"
        :word="word"
        :poolWords="state.poolWords"
        :correct-answer="correctAnswer"
      ></slot>
    </template>
  </MainWindow>
</template>
