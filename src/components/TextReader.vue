<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";
import { computed, onBeforeMount, onBeforeUpdate, reactive } from "vue";
import WordCursor from "@/WordCursor";
import { useAudioPlayerStore } from "@/stores/audio-player-store";

const props = defineProps(["languageText", "runtimeData"]);
const audioPlayer = useAudioPlayerStore();
const emit = defineEmits(["changePageBy"]);
const state = reactive({
  selectedWordCursor: new WordCursor(() => props.languageText),
  highlighting: false,
  page: props.runtimeData.currentPage,
});

const selectedWord = computed(() => state.selectedWordCursor.selectedWord());
const selectedSentence = computed(() =>
  state.selectedWordCursor.selectedSentence()
);

const updateWordDefinition = (...args) =>
  props.languageText.updateWordDefinition(...args);
const updateSentenceDefinition = (...args) =>
  props.languageText.updateSentenceDefinition(...args);

const updateAudioPlayer = () => {
  const sentences = props.languageText.sentences;
  const sentenceMap = props.languageText.sentenceMap;
  if (sentences.length === 0) return;
  const first = sentences[0].clean;
  const last = sentences[sentences.length - 1].clean;
  const start = sentenceMap.get(first).startTime;
  const end = sentenceMap.get(last).endTime;
  audioPlayer.setAudioTimes(start, end);
  audioPlayer.pause();
};

const clearSelectedWordForNewPage = () => {
  if (props.runtimeData.currentPage !== state.page) {
    state.selectedWordCursor.setIndex(undefined);
    state.page = props.runtimeData.currentPage;
  }
};

onBeforeUpdate(() => {
  clearSelectedWordForNewPage();
  updateAudioPlayer();
});

onBeforeMount(() => {
  updateAudioPlayer();
});
</script>

<template>
  <MainWindow
    title="Reader"
    :subtitle="'Page ' + (props.runtimeData.currentPage + 1)"
  >
    <template v-slot:activity>
      <TextView
        :sentences="props.languageText.sentences"
        :word-map="props.languageText.wordMap"
        :key="props.runtimeData.currentPage"
        :selected-word-index="state.selectedWordCursor.getIndex()"
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
            :language="props.runtimeData.language"
            @definition-update="updateWordDefinition"
            @next="state.selectedWordCursor.nextWord()"
          />
          <DefinitionInput
            tag="textarea"
            id="sentence-definition"
            :key="selectedSentence.sentence"
            :text="selectedSentence.sentence"
            :definition="selectedSentence.definition"
            :language="props.runtimeData.language"
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
