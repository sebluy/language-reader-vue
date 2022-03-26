<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";
import { computed, onBeforeUpdate, reactive } from "vue";
import WordCursor from "@/WordCursor";

const props = defineProps(["languageText", "page", "language"]);
const emit = defineEmits(["changePageBy"]);
const state = reactive({
  selectedWordCursor: new WordCursor(() => props.languageText),
  highlighting: false,
  page: props.page,
});

const selectedWord = computed(() => state.selectedWordCursor.selectedWord());
const selectedSentence = computed(() =>
  state.selectedWordCursor.selectedSentence()
);

const updateWordDefinition = (...args) =>
  props.languageText.updateWordDefinition(...args);
const updateSentenceDefinition = (...args) =>
  props.languageText.updateSentenceDefinition(...args);

onBeforeUpdate(() => {
  if (props.page !== state.page) state.selectedWordCursor.setIndex(undefined);
  console.log("Rendering TextReader", props);
});
</script>

<template>
  <MainWindow title="Reader" :subtitle="'Page ' + (props.page + 1)">
    <template v-slot:activity>
      <TextView
        :language-text="props.languageText"
        :selected-word-index="state.selectedWordCursor.getIndex()"
        :page="props.page"
        :highlighting="state.highlighting"
        @select-word="(i) => state.selectedWordCursor.setIndex(i)"
      />
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group">
          <DefinitionInput
            id="word-definition"
            :key="selectedWord.word"
            :text="selectedWord.word"
            :focus="state.selectedWordCursor.getIndex() !== undefined"
            :definition="selectedWord.definition"
            :language="props.language"
            @definition-update="updateWordDefinition"
            @next="state.selectedWordCursor.nextWord()"
          />
          <DefinitionInput
            tag="textarea"
            id="sentence-definition"
            :key="selectedSentence.sentence"
            :text="selectedSentence.sentence"
            :definition="selectedSentence.definition"
            :language="props.language"
            @definition-update="updateSentenceDefinition"
            @next="state.selectedWordCursor.nextSentence()"
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
