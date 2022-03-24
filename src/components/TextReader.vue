<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";
import { computed, onBeforeUpdate, reactive } from "vue";

const props = defineProps(["languageText", "page"]);
const emit = defineEmits(["changePageBy"]);
const state = reactive({
  selectedWordIndex: undefined,
});

const selectWord = (wordIndex) => {
  state.selectedWordIndex = wordIndex;
};

const nextSentence = () => {
  let text = props.languageText;
  const sentenceIndex = text.sentenceIndexByWordIndex;
  const currentSentenceIndex = sentenceIndex[state.selectedWordIndex];
  for (;;) {
    if (state.selectedWordIndex === text.words.length - 1) return;
    state.selectedWordIndex += 1;
    let nextSentenceIndex = sentenceIndex[state.selectedWordIndex];
    if (nextSentenceIndex !== currentSentenceIndex) return;
  }
};

const nextWord = () => {
  if (state.selectedWordIndex === undefined) return;
  if (state.selectedWordIndex === props.languageText.words.length - 1) return;
  state.selectedWordIndex += 1;
};

const selectedWord = computed(() => {
  if (state.selectedWordIndex === undefined) return undefined;
  return props.languageText.words[state.selectedWordIndex].word;
});

const selectedSentence = computed(() => {
  if (state.selectedWordIndex === undefined) return undefined;
  const text = props.languageText;
  const sentenceIndex = text.sentenceIndexByWordIndex[state.selectedWordIndex];
  return text.sentences[sentenceIndex].clean;
});

onBeforeUpdate(() => {
  console.log("Rendering TextReader", props);
});
</script>

<template>
  <MainWindow title="Reader" :subtitle="'Page ' + (props.page + 1)">
    <template v-slot:activity>
      <TextView
        :language-text="props.languageText"
        :selected-word-index="state.selectedWordIndex"
        @select-word="selectWord"
      />
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group">
          <DefinitionInput
            id="word-definition"
            :key="selectedWord"
            :text="selectedWord"
            :focus="state.selectedWordIndex !== undefined"
            @next="nextWord"
          />
          <DefinitionInput
            id="sentence-definition"
            :key="selectedSentence"
            :text="selectedSentence"
            tag="textarea"
            @next="nextSentence"
          />
        </div>
        <div class="sidebar-group">
          <button @click="emit('changePageBy', -1)">Previous Page</button>
          <button @click="emit('changePageBy', 1)">Next Page</button>
        </div>
        <div class="sidebar-group">
          <button>Toggle Highlighting</button>
        </div>
      </div>
    </template>
  </MainWindow>
</template>
