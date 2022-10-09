<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";
import { computed, onBeforeMount, onBeforeUpdate, onBeforeUnmount, onMounted, reactive } from "vue";
import WordCursor from "@/WordCursor";
import { useAudioPlayerStore } from "@/stores/audio-player-store";

const props = defineProps(["languageText", "runtimeData"]);
const audioPlayer = useAudioPlayerStore();
const emit = defineEmits(["setPage"]);
const definedPercentage = () => {
  const definitions = props.languageText.getDefinitionArray();
  return definitions.filter((str) => str !== "").length / definitions.length;
};
const state = reactive({
  selectedWordCursor: new WordCursor(() => props.languageText),
  highlighting: false,
  page: props.runtimeData.currentPage,
  marker: undefined,
  defined: definedPercentage(),
});

const selectedWord = computed(() => state.selectedWordCursor.selectedWord());
const selectedSentence = computed(() =>
  state.selectedWordCursor.selectedSentence()
);

const updateWordDefinition = (...args) => {
  props.languageText.updateWordDefinition(...args);
  state.defined = definedPercentage();
};
const updateSentenceDefinition = (...args) =>
  props.languageText.updateSentenceDefinition(...args);

const changePageBy = (n) => {
  emit("setPage", props.runtimeData.currentPage + n);
};

const setPage = (e) => {
  emit("setPage", Number(e.target.value) - 1);
};

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

const mark = () => {
  if (state.marker === undefined) {
    audioPlayer.play();
    state.marker = 0;
  } else {
    state.marker += 1;
  }
  let sentences = props.languageText.sentences;
  if (state.marker > 0) {
    let lastSentence = sentences[state.marker - 1];
    let lastData = props.languageText.sentenceMap.get(lastSentence.clean);
    props.languageText.updateSentenceTimes(
      lastData,
      null,
      audioPlayer.getCurrentTime()
    );
  }
  if (state.marker === sentences.length) {
    audioPlayer.pause();
    state.marker = undefined;
    return;
  }
  let sentence = sentences[state.marker];
  let sentenceData = props.languageText.sentenceMap.get(sentence.clean);
  props.languageText.updateSentenceTimes(
    sentenceData,
    audioPlayer.getCurrentTime(),
    null
  );
};

const keyListener = (e) => {
  let input =
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement;
  if (input) return;
  if (e.key === "m") {
    mark();
  }
};

onMounted(() => {
  document.addEventListener("keydown", keyListener);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});

onBeforeUpdate(() => {
  clearSelectedWordForNewPage();
  updateAudioPlayer();
  state.defined = definedPercentage();
});

onBeforeMount(() => {
  updateAudioPlayer();
});
</script>

<template>
  <MainWindow
    title="Reader"
    :subtitle="`Page ${(props.runtimeData.currentPage + 1)} of  ${languageText.pages.length}`"
  >
    <template v-slot:activity>
      <TextView
        :sentences="props.languageText.sentences"
        :word-map="props.languageText.wordMap"
        :key="props.runtimeData.currentPage"
        :selected-word-index="state.selectedWordCursor.getIndex()"
        :selected-sentence-index="state.marker"
        :highlighting="state.highlighting"
        @select-word="(i) => state.selectedWordCursor.setIndex(i)"
      />
      <p class="footer">
        <strong>{{ (state.defined * 100).toFixed(2) + '%' }}</strong>
      </p>
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
          <button @click="changePageBy(-1)">Previous Page</button>
          <button @click="changePageBy(1)">Next Page</button>
          <input placeholder="Page" @input="setPage"/>
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
