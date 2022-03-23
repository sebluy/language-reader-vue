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
  sentences: [],
});

const load = async () => {
  runtimeData = await db.getRuntimeData();
  runtimeData.updateForNewDay();
  console.log(runtimeData);
  if (runtimeData.openTextFile) {
    const text = await db.getTextFile();
    languageText = await createLanguageText(runtimeData, text);
    state.sentences = languageText.sentences;
    state.openTextFile = runtimeData.openTextFile;
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
  const text = await textFile.text();
  languageText = await createLanguageText(runtimeData, text);
  runtimeData.openNewTextFile(textFile.name);
  state.sentences = languageText.sentences;
  state.openTextFile = runtimeData.openTextFile;
  console.log("New runtime data", runtimeData);
  console.log("New state", state);
  db.putRuntimeData(runtimeData);
  db.putTextFile(text);
};

onMounted(load);
</script>

<template>
  <div>
    <MainSidebar
      @open-files="openFiles()"
      :open-text-file="state.openTextFile"
    />
    <TextReader :sentences="state.sentences" />
  </div>
</template>
