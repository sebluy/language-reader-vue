<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import { computed, onMounted, reactive } from "vue";
import { Word } from "@/word";
import { RawSentence } from "@/raw-sentence";

const props = defineProps(["db"]);
const state = reactive({
  words: [],
  wordIndex: 0,
  sentences: new Map(),
});

const word = computed(() => state.words[state.wordIndex]);
const rawSentences = computed(() => {
  if (word.value === undefined) return undefined;
  const sentence = state.sentences.get(word.value.sentenceId);
  return [new RawSentence(sentence.sentence, sentence.sentence, sentence.id)];
});

const wordClass = (raw, clean) => {
  return clean === word.value.word ? {bold: true} : {};
};

onMounted(async () => {
  const words = await props.db.getPracticeByType(
    Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT
  );
  const sentences = await props.db.getSentencesForWords(words);
  state.words = words;
  state.sentences = sentences;
});
</script>

<template>
  <MainWindow title="Vocabulary in Context">
    <template v-slot:activity>
      <TextView
          :sentences="rawSentences"
          :word-class="wordClass"
      />
      <p>{{ word && word.word }}</p>
      <p>{{ word && word.definition }}</p>
      <button @click="state.wordIndex += 1">Next</button>
    </template>
    <template v-slot:sidebar> </template>
  </MainWindow>
</template>
