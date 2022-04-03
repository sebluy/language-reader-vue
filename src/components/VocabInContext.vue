<script setup>
import MainWindow from "@/components/MainWindow.vue";
import { computed, onMounted, reactive } from "vue";
import { Word } from "@/word";

const props = defineProps(["db"]);
const state = reactive({
  words: [],
  wordIndex: 0,
  sentences: new Map(),
});

const word = computed(() => state.words[state.wordIndex]);
const sentence = computed(() => {
  return word.value && state.sentences.get(word.value.sentenceId);
});

onMounted(async () => {
  state.words = await props.db.getPracticeByType(
    Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT
  );
  state.sentences = await props.db.getSentencesForWords(state.words);
});

</script>

<template>
  <MainWindow title="Vocabulary in Context">
    <template v-slot:activity>
      <p>{{ word && word.word }}</p>
      <p>{{ sentence && sentence.sentence }}</p>
      <p>{{ word && word.definition }}</p>
      <button @click="state.wordIndex += 1">Next</button>
    </template>
    <template v-slot:sidebar> </template>
  </MainWindow>
</template>
