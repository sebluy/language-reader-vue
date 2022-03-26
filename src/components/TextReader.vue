<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";
import { computed, onBeforeUpdate, reactive } from "vue";

const props = defineProps(["languageText", "page", "language"]);
const emit = defineEmits(["changePageBy"]);
const state = reactive({
  selectedWordIndex: undefined,
  highlighting: false,
  page: props.page,
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
  if (state.selectedWordIndex === undefined) return {};
  return props.languageText.words[state.selectedWordIndex];
});

const selectedSentence = computed(() => {
  if (state.selectedWordIndex === undefined) return {};
  const text = props.languageText;
  const sentenceIndex = text.sentenceIndexByWordIndex[state.selectedWordIndex];
  const clean = text.sentences[sentenceIndex].clean;
  return text.sentenceMap.get(clean);
});

const updateWordDefinition = (...args) =>
  props.languageText.updateWordDefinition(...args);
const updateSentenceDefinition = (...args) =>
  props.languageText.updateSentenceDefinition(...args);

onBeforeUpdate(() => {
  if (props.page !== state.page) state.selectedWordIndex = undefined;
  console.log("Rendering TextReader", props);
});
</script>

<template>
  <MainWindow title="Reader" :subtitle="'Page ' + (props.page + 1)">
    <template v-slot:activity>
      <TextView
        :language-text="props.languageText"
        :selected-word-index="state.selectedWordIndex"
        :page="props.page"
        :highlighting="state.highlighting"
        @select-word="selectWord"
      />
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group">
          <DefinitionInput
            id="word-definition"
            :key="selectedWord.word"
            :text="selectedWord.word"
            :focus="state.selectedWordIndex !== undefined"
            :definition="selectedWord.definition"
            :language="props.language"
            @definition-update="updateWordDefinition"
            @next="nextWord"
          />
          <DefinitionInput
            tag="textarea"
            id="sentence-definition"
            :key="selectedSentence.sentence"
            :text="selectedSentence.sentence"
            :definition="selectedSentence.definition"
            :language="props.language"
            @definition-update="updateSentenceDefinition"
            @next="nextSentence"
          />
        </div>
        <div class="sidebar-group">
          <button @click="emit('changePageBy', -1)">Previous Page</button>
          <button @click="emit('changePageBy', 1)">Next Page</button>
        </div>
        <div class="sidebar-group">
          <button @click="state.highlighting = !state.highlighting">
            Toggle Highlighting
          </button>
        </div>
      </div>
    </template>
  </MainWindow>
</template>
