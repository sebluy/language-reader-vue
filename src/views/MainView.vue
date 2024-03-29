<script setup>
import MainSidebar from "@/components/MainSidebar.vue";
import ProjectX from "@/components/ProjectX.vue";
import TextReader from "@/components/TextReader.vue";
import VocabInContext from "@/components/VocabInContext.vue";
import VocabMatching from "@/components/VocabMatching.vue";
import ClozeActivity from "@/components/ClozeActivity.vue";
import Listening1 from "@/components/Listening1.vue";
import Listening2 from "@/components/Listening2.vue";
import {onMounted, reactive, shallowRef} from "vue";
import {useLanguageDB} from "@/language-db";
import {LanguageText} from "@/language-text";
import {Utility} from "@/utility";
import {Activity} from "@/activity";
import {useAudioPlayerStore} from "@/stores/audio-player-store";
import {useMasteryStore} from "@/stores/mastery-store";
import {useRuntimeData} from "@/runtime-data";
import {Word} from "@/word";
import {setMidnightWatch} from "@/nights-watch";
import {LanguageTextPageless} from "@/language-text-pageless";

const db = useLanguageDB();
const languageText = shallowRef(undefined);
const languageTextPageless = shallowRef(undefined);
const audioPlayer = useAudioPlayerStore();
const mastery = useMasteryStore();
const runtimeData = useRuntimeData();

const state = reactive({
    runtimeData: runtimeData,
    activity: Activity.READER,
});

const load = async () => {
    setMidnightWatch(updateForNewDay);
    state.runtimeData.load(await db.getRuntimeData());
    await updateForNewDay();
    mastery.setCounts(await db.getMasteryCounts());
    console.log(state.runtimeData);
    if (state.runtimeData.openTextFile) {
        const text = await db.getTextFile();
        languageText.value = await createLanguageText(text);
        languageTextPageless.value = await createLanguageTextPageless(text);
    }
    if (state.runtimeData.openAudioFile) {
        let audio = await db.getAudioFile();
        if (audio) {
            audioPlayer.src = URL.createObjectURL(audio);
        }
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

const createLanguageTextPageless = async (text) => {
    let languageText = new LanguageTextPageless(
        db,
        state.runtimeData.openTextFile,
        text,
        learnNewWord
    );
    await languageText.load();
    return languageText;
};

const learnNewWord = (word) => {
    runtimeData.definedToday.push(word);
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
        languageTextPageless.value = await createLanguageTextPageless(text);
        db.putTextFile(text);
    }
    if (audioFile) {
        state.runtimeData.openNewAudioFile(audioFile.name);
        audioPlayer.src = URL.createObjectURL(audioFile);
        db.putAudioFile(audioFile);
    }
    db.putRuntimeData(runtimeData);
};

const setPage = async (newPage) => {
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

const exportDefinedToday = async () => {
    const csv = runtimeData.definedToday
        .map((word) => `"${word.word}","${word.definition}"`)
        .join("\n");
    Utility.download("defined-today.csv", csv);
};

const updateForNewDay = async () => {
    if (state.runtimeData.isNewDay()) {
        console.log("Updating for new day " + new Date());
        const lastDay = await db.getStatistics(runtimeData.date);
        await db.putHistoryDay(lastDay);
        state.runtimeData.updateForNewDay();
    }
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
            @export-defined-today="exportDefinedToday"
            @change-activity="(activity) => (state.activity = activity)"
        />
        <TextReader
            v-if="state.activity === Activity.READER && languageText"
            :runtime-data="state.runtimeData"
            :language-text="languageText"
            @set-page="setPage"
        />
        <ProjectX
            v-if="state.activity === Activity.PROJECT_X && languageText"
            :runtime-data="state.runtimeData"
            :language-text="languageTextPageless"
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
