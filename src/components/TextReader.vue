<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";
import { computed, onBeforeMount, onBeforeUpdate, onBeforeUnmount, onMounted, reactive, watch } from "vue";
import WordCursor from "@/WordCursor";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { useLanguageDB } from "@/language-db";
import { CommonSubstring } from "@/common-substring";
import { Utility } from "@/utility";

const props = defineProps(["languageText", "runtimeData"]);
const db = useLanguageDB();
const audioPlayer = useAudioPlayerStore();
const emit = defineEmits(["setPage"]);
const pageStats = () => {
  const definitions = props.languageText.getDefinitionArray();
  const defined = definitions.filter((str) => str !== "").length;
  const total = definitions.length;
  const notDefined = total - defined;
  const percentage = defined / total;
  return { defined, total, notDefined, percentage };
};
const state = reactive({
  selectedWordCursor: new WordCursor(() => props.languageText),
  highlighting: false,
  page: props.runtimeData.currentPage,
  marker: undefined,
  pageStats: pageStats(),
  similarWords: [],
});

const substringLookup = new CommonSubstring(4, 5);
Utility.benchmark(async () => {
  const wordPool = (await db.getAllWords()).filter((word) => word.isDefined());
  wordPool.forEach((word) => {
    substringLookup.addWord(word.word);
  });
});

const selectedWord = computed(() => state.selectedWordCursor.selectedWord());
const selectedSentence = computed(() =>
  state.selectedWordCursor.selectedSentence()
);

watch(selectedWord, async (word) => {
  state.similarWords = await Promise.all(
    substringLookup.lookup(word.word).map((match) => db.getWord(match))
  );
});

const updateWordDefinition = (...args) => {
  props.languageText.updateWordDefinition(...args);
  state.pageStats = pageStats();
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
  state.pageStats = pageStats();
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
        <strong>
          {{ state.pageStats.defined }} of {{ state.pageStats.total }},
          {{ state.pageStats.notDefined }} remaining,
          {{ (state.pageStats.percentage * 100).toFixed(2) + '%' }}
        </strong>
      </p>
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group">
          <div class="matching-words">
            <ul>
              <li :key="word.word" v-for="word in state.similarWords">
                {{ `${word.word} - ${word.definition}` }}
              </li>
            </ul>
          </div>
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
