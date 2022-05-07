<script setup>
import MainSidebar from "@/components/MainSidebar.vue";
import TextReader from "@/components/TextReader.vue";
import VocabInContext from "@/components/VocabInContext.vue";
import VocabMatching from "@/components/VocabMatching.vue";
import ClozeActivity from "@/components/ClozeActivity.vue";
import Listening1 from "@/components/Listening1.vue";
import Listening2 from "@/components/Listening2.vue";
import { onMounted, reactive, shallowRef } from "vue";
import { useLanguageDB } from "@/language-db";
import { LanguageText } from "@/language-text";
import { Utility } from "@/utility";
import { Activity } from "@/activity";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { useMasteryStore } from "@/stores/mastery-store";
import { useRuntimeData } from "@/runtime-data";
import { Word } from "@/word";

const db = useLanguageDB();
const languageText = shallowRef(undefined);
const audioPlayer = useAudioPlayerStore();
const mastery = useMasteryStore();
const runtimeData = useRuntimeData();

const state = reactive({
  runtimeData: runtimeData,
  activity: Activity.READER,
});

const load = async () => {
  runtimeData.load(await db.getRuntimeData());
  state.runtimeData = runtimeData;
  if (runtimeData.isNewDay()) {
    const lastDay = await db.getStatistics(runtimeData.date)
    await db.putHistoryDay(lastDay);
    state.runtimeData.updateForNewDay();
  }
  mastery.setCounts(await db.getMasteryCounts());
  console.log(state.runtimeData);
  if (state.runtimeData.openTextFile) {
    const text = await db.getTextFile();
    languageText.value = await createLanguageText(text);
  }
  if (state.runtimeData.openAudioFile) {
    let audio = await db.getAudioFile();
    audioPlayer.src = URL.createObjectURL(audio);
  }
};

const createLanguageText = async (text) => {
  let languageText = new LanguageText(
    db,
    state.runtimeData.openTextFile,
    text,
    state.runtimeData.currentPage,
    learnNewWord
  );
  await languageText.load();
  return languageText;
};

const learnNewWord = () => {
  runtimeData.definedToday += 1;
  runtimeData.learnedToday += 1 / Word.MASTERY_LEVEL_COUNT;
  mastery.incrementAll();
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
    audioPlayer.src = URL.createObjectURL(audioFile);
    db.putAudioFile(audioFile);
  }
  db.putRuntimeData(runtimeData);
};

const changePageBy = async (n) => {
  let newPage = state.runtimeData.currentPage + n;
  let valid = languageText.value.setPage(newPage);
  if (!valid) return;
  await languageText.value.load();
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

onMounted(load);
</script>

<template>
  <div>
    <MainSidebar
      :runtime-data="state.runtimeData"
      @open-files="openFiles"
      @update-language="updateLanguage"
      @import-database="importDatabase"
      @export-database="exportDatabase"
      @change-activity="(activity) => (state.activity = activity)"
    />
    <TextReader
      v-if="state.activity === Activity.READER && languageText"
      :runtime-data="state.runtimeData"
      :language-text="languageText"
      @change-page-by="changePageBy"
    />
    <VocabInContext
      v-if="state.activity === Activity.VOCAB_IN_CONTEXT"
      @done="state.activity = Activity.READER"
    />
    <VocabMatching
      v-if="state.activity === Activity.VOCAB_MATCHING"
      @done="state.activity = Activity.READER"
    />
    <ClozeActivity
      v-if="state.activity === Activity.CLOZE"
      @done="state.activity = Activity.READER"
    />
    <Listening1
      v-if="state.activity === Activity.LISTENING1"
      @done="state.activity = Activity.READER"
    />
    <Listening2
      v-if="state.activity === Activity.LISTENING2"
      @done="state.activity = Activity.READER"
    />
  </div>
</template>
