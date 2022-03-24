<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";
import {onBeforeUpdate, reactive} from "vue";

const props = defineProps(["languageText", "page"]);
const emit = defineEmits(["changePageBy"]);
const state = reactive({
  selectedWord: undefined,
  selectedWordIndex: undefined,
  selectedSentence: undefined,
  selectedSentenceIndex: undefined,
});

const selectWord = (word, wordIndex, sentence, sentenceIndex) => {
  let wordO = props.languageText.words.get(word);
  let sentenceO = props.languageText.sentenceMap.get(sentence);
  state.selectedWord = wordO;
  state.selectedWordIndex = wordIndex;
  state.selectedSentence = sentenceO;
  state.selectedSentenceIndex = sentenceIndex;
};

const nextSentence = () => {
  if (state.selectedWordIndex === undefined) return;
  let sentences = props.languageText.sentences;
  let index = state.selectedSentenceIndex + 1;
  if (index >= sentences.length) return;
  let sentence = sentences[index];
  let words = sentence.getWords();
  selectWord(words[0], 0, sentence.clean, index);
};

const nextWord = () => {
  if (state.selectedWordIndex === undefined) return;
  let sentences = props.languageText.sentences;
  let wordIndex = state.selectedWordIndex + 1;
  let selectedSentence = sentences[state.selectedSentenceIndex];
  let words = selectedSentence.getWords();
  if (wordIndex >= selectedSentence.getWords().length) {
    nextSentence();
    return;
  }
  selectWord(
    words[wordIndex],
    wordIndex,
    selectedSentence.clean,
    state.selectedSentenceIndex
  );
};

onBeforeUpdate(() => {
  console.log("Rendering TextReader", props)
});
</script>

<template>
  <MainWindow title="Reader" :subtitle="'Page ' + (props.page + 1)">
    <template v-slot:activity>
      <TextView
        :language-text="props.languageText"
        :selected-sentence-index="state.selectedSentenceIndex"
        :selected-word-index="state.selectedWordIndex"
        @select-word="selectWord"
      />
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group">
          <DefinitionInput
            id="word-definition"
            :key="state.selectedWord && state.selectedWord.word"
            :text="state.selectedWord && state.selectedWord.word"
            :focus="state.selectedWord !== undefined"
            @next="nextWord"
          />
          <DefinitionInput
            id="sentence-definition"
            :key="state.selectedSentence && state.selectedSentence.sentence"
            :text="state.selectedSentence && state.selectedSentence.sentence"
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
