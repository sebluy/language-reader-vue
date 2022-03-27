<script setup>
import MainSidebar from "@/components/MainSidebar.vue";
import TextReader from "@/components/TextReader.vue";
import { onMounted, reactive, shallowRef } from "vue";
import { LanguageDb } from "@/language-db";
import { LanguageText } from "@/language-text";
import { Utility } from "@/utility";
import { RuntimeData } from "@/runtime-data";

const db = new LanguageDb();
const languageText = shallowRef(undefined);
let runtimeData = new RuntimeData();

const state = reactive({
  runtimeData: runtimeData,
  audioSrc: "",
});

const load = async () => {
  runtimeData = await db.getRuntimeData();
  state.runtimeData = runtimeData;
  state.runtimeData.updateForNewDay();
  console.log(state.runtimeData);
  if (state.runtimeData.openTextFile) {
    const text = await db.getTextFile();
    languageText.value = await createLanguageText(text);
  }
  if (state.runtimeData.openAudioFile) {
    let audio = await db.getAudioFile();
    state.audioSrc = URL.createObjectURL(audio);
  }
  updateStats();
};

const createLanguageText = async (text) => {
  let languageText = new LanguageText(
    db,
    state.runtimeData.openTextFile,
    text,
    state.runtimeData.currentPage,
    learnNewWord
  );
  await languageText.onLoad();
  return languageText;
};

const learnNewWord = () => {
  state.runtimeData.wordsLearnedToday += 1;
  state.runtimeData.xpToday += 1;
  db.putRuntimeData(runtimeData);
};

const openFiles = async () => {
  const files = await Utility.openFiles();
  const textFile = files.text;
  const audioFile = files.audio;
  if (textFile) {
    const text = await textFile.text();
    state.runtimeData.openNewTextFile(textFile.name);
    languageText.value = await createLanguageText(text);
    db.putTextFile(text);
  }
  if (audioFile) {
    state.runtimeData.openNewAudioFile(audioFile.name);
    state.audioSrc = URL.createObjectURL(audioFile);
    db.putAudioFile(audioFile);
  }
  updateStats();
  console.log("New state", state);
  db.putRuntimeData(runtimeData);
};

const changePageBy = async (n) => {
  let newPage = state.runtimeData.currentPage + n;
  let valid = languageText.value.setPage(newPage);
  if (!valid) return;
  await languageText.value.onLoad();
  state.runtimeData.currentPage = newPage;
  db.putRuntimeData(runtimeData);
};

const updateLanguage = (language) => {
  state.runtimeData.language = language;
  db.putRuntimeData(runtimeData);
};

const importDatabase = async () => {
  const file = await Utility.uploadText();
  const text = await file.text();
  await db.import(JSON.parse(text));
  await load();
};

const exportDatabase = async () => {
  let object = await db.export();
  Utility.download("language-db.json", JSON.stringify(object));
};

const updateStats = () => {
  let statistics = languageText.value.updateStats();
  statistics.wordsLearnedToday = state.runtimeData.wordsLearnedToday;
  statistics.xpToday = state.runtimeData.xpToday;
  statistics.xpLast = state.runtimeData.xpLast;
  state.statistics = statistics;
};

onMounted(load);
</script>

<template>
  <div>
    <MainSidebar
      :runtime-data="state.runtimeData"
      :audio-src="state.audioSrc"
      :statistics="state.statistics"
      @open-files="openFiles"
      @change-page-by="changePageBy"
      @update-language="updateLanguage"
      @update-stats="updateStats"
      @import-database="importDatabase"
      @export-database="exportDatabase"
    />
    <TextReader
      v-if="languageText"
      :runtime-data="state.runtimeData"
      :language-text="languageText"
    />
  </div>
</template>
