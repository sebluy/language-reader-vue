<script setup>
import MainSidebar from "@/components/MainSidebar.vue";
import TextReader from "@/components/TextReader.vue";
import { onMounted, reactive, shallowRef } from "vue";
import { LanguageDb } from "@/language-db";
import { LanguageText } from "@/language-text";
import { Utility } from "@/utility";

const db = new LanguageDb();

let runtimeData;
let languageText = shallowRef(undefined);

const state = reactive({
  openTextFile: "",
  openAudioFile: "",
  audioSrc: "",
  page: undefined,
  language: "",
});

const load = async () => {
  runtimeData = await db.getRuntimeData();
  runtimeData.updateForNewDay();
  state.language = runtimeData.language;
  console.log(runtimeData);
  if (runtimeData.openTextFile) {
    const text = await db.getTextFile();
    languageText.value = await createLanguageText(runtimeData, text);
    state.page = runtimeData.currentPage;
    state.openTextFile = runtimeData.openTextFile;
  }
  if (runtimeData.openAudioFile) {
    let audio = await db.getAudioFile();
    state.audioSrc = URL.createObjectURL(audio);
    state.openAudioFile = runtimeData.openAudioFile;
  }
};

const createLanguageText = async (runtimeData, text) => {
  let languageText = new LanguageText(
    db,
    runtimeData.openTextFile,
    text,
    runtimeData.currentPage
  );
  await languageText.onLoad();
  return languageText;
};

const openFiles = async () => {
  const files = await Utility.openFiles();
  const textFile = files.text;
  const audioFile = files.audio;
  if (textFile) {
    const text = await textFile.text();
    runtimeData.openNewTextFile(textFile.name);
    languageText.value = await createLanguageText(runtimeData, text);
    state.openTextFile = runtimeData.openTextFile;
    state.page = runtimeData.currentPage;
    db.putTextFile(text);
  }
  if (audioFile) {
    runtimeData.openNewAudioFile(audioFile.name);
    state.openAudioFile = runtimeData.openAudioFile;
    state.audioSrc = URL.createObjectURL(audioFile);
    db.putAudioFile(audioFile);
  }
  console.log("New runtime data", runtimeData);
  console.log("New state", state);
  db.putRuntimeData(runtimeData);
};

const changePageBy = async (n) => {
  let newPage = state.page + n;
  let valid = languageText.value.setPage(newPage);
  if (!valid) return;
  runtimeData.currentPage = newPage;
  db.putRuntimeData(runtimeData);
  await languageText.value.onLoad();
  state.page = newPage;
};

const updateLanguage = (language) => {
  state.language = language;
  runtimeData.language = language;
  db.putRuntimeData(runtimeData);
};

onMounted(load);
</script>

<template>
  <div>
    <MainSidebar
      @open-files="openFiles"
      :open-text-file="state.openTextFile"
      :open-audio-file="state.openAudioFile"
      :audio-src="state.audioSrc"
      :language="state.language"
      @change-page-by="changePageBy"
      @update-language="updateLanguage"
    />
    <TextReader
      v-if="languageText"
      :language="state.language"
      :language-text="languageText"
      :page="state.page"
    />
  </div>
</template>
