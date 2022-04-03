<script setup>
import MainWindow from "@/components/MainWindow.vue";
import { computed, onMounted, reactive } from "vue";
import { Word } from "@/word";

const props = defineProps(["db"]);
const state = reactive({
  words: [],
  wordIndex: 0,
});

const word = computed(() => state.words[state.wordIndex]);

onMounted(async () => {
  state.words = await props.db.getPracticeByType(
    Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT
  );
});

const next = () => {
  state.wordIndex = (state.wordIndex + 1) % state.words.length;
};
</script>

<template>
  <MainWindow title="Vocabulary in Context">
    <template v-slot:activity>
      <p>{{ word && word.word }}</p>
      <p>Sentence</p>
      <p>{{ word && word.definition }}</p>
      <button @click="next">Next</button>
    </template>
    <template v-slot:sidebar> </template>
  </MainWindow>
</template>
