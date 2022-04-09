<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import { computed, onMounted, reactive } from "vue";
import { Word } from "@/word";
import { RawSentence } from "@/raw-sentence";

const props = defineProps(["db"]);
const emit = defineEmits(["done"]);
const state = reactive({
  practiceWords: [],
  wordIndex: 0,
  sentences: new Map(),
});

const word = computed(() => state.practiceWords[state.wordIndex]);
const rawSentences = computed(() => {
  if (word.value === undefined) return undefined;
  const sentence = state.sentences.get(word.value.sentenceId);
  return [new RawSentence(sentence.sentence, sentence.sentence, sentence.id)];
});

const wordClass = (raw, clean) => {
  return clean === word.value.word ? { bold: true } : {};
};

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
  state.poolWords = poolWords.map((w) => w.definition).filter((d) => d !== "");
});
</script>

<template>
  <MainWindow title="Vocabulary in Context">
    <template v-if="word" v-slot:activity>
      <TextView :sentences="rawSentences" :word-class="wordClass" />
      <MultipleChoice
        :pool="state.poolWords"
        :solution="word.definition"
        @correct-answer="correctAnswer"
      />
    </template>
  </MainWindow>
</template>
