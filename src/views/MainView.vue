<script setup>
import MainSidebar from "@/components/MainSidebar.vue";
import TextReader from "@/components/TextReader.vue";
import { onMounted, reactive } from "vue";
import { LanguageDb } from "@/language-db";
import { LanguageText } from "@/language-text";
import { Utility } from "@/utility";

const db = new LanguageDb();

let runtimeData;
let languageText;

const state = reactive({
  openTextFile: "",
  openAudioFile: "",
  audioSrc: "",
  languageText: undefined,
  page: 0,
});

const load = async () => {
  runtimeData = await db.getRuntimeData();
  runtimeData.updateForNewDay();
  console.log(runtimeData);
  if (runtimeData.openTextFile) {
    const text = await db.getTextFile();
    languageText = await createLanguageText(runtimeData, text);
    state.languageText = languageText;
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
    languageText = await createLanguageText(runtimeData, text);
    state.languageText = languageText;
    state.openTextFile = runtimeData.openTextFile;
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

const changePageBy = (n) => {
  let newPage = state.page + n;
  let valid = languageText.setPage(newPage);
  if (!valid) return;
  state.page = newPage;
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
    />
    <TextReader
      :language-text="state.languageText"
      :page="state.page"
      @change-page-by="changePageBy"
    />
  </div>
</template>
