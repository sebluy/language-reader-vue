<script setup>
import MainWindow from "@/components/MainWindow.vue";
import { computed, onBeforeUnmount, onMounted, reactive } from "vue";
import { useLanguageDB } from "@/language-db";
import {useRuntimeData} from "@/runtime-data";

const props = defineProps(["languageText", "runtimeData"]);
const db = useLanguageDB();
const emit = defineEmits(["setPage"]);
const state = reactive({
    translation: '',
});

const runtimeData = useRuntimeData();

const keyListener = (e) => {
    if (e.key === 'n') {
        changeSentence(1);
    } else if (e.key === 'p') {
        changeSentence(-1);
    } else if (e.key === 't') {
        translate();
    }
};

onMounted(() => {
    document.addEventListener("keydown", keyListener);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});

const sentenceIndex = computed(() => {
    return props.runtimeData.sentenceIndex ?? 0;
});

const currentSentence = computed(() => {
    if (!props.languageText || !props.languageText.sentences[sentenceIndex.value]) {
        return null;
    }
    return props.languageText.sentences[sentenceIndex.value];
});

const subtitle = computed(() => {
    if (!props.languageText) {
        return '';
    }
    return `Sentence ${sentenceIndex.value + 1} of ${props.languageText.sentences.length}`;
});

const words = computed(() => {
    if (currentSentence.value === null) {
        return [];
    }
    return currentSentence.value.getWords();
});

const newWords = computed(() => {
    return words.value.filter((word) => {
        return !props.languageText.wordMap.get(word).isDefined();
    });
});

const translate = () => {
    const text = currentSentence.value.clean;
    const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=" +
        encodeURI(text);
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            state.translation = res[0].map(([v]) => v).join("");
        });
};

const changeSentence = (n) => {
    newWords.value.forEach((word) => {
        props.languageText.updateWordDefinition(word, '<placeholder>');
    });
    state.translation = '';
    props.runtimeData.sentenceIndex += n;
    db.putRuntimeData(runtimeData);
};

</script>

<template>
  <MainWindow
    title="Reader"
    :subtitle="subtitle"
  >
    <template v-slot:activity>
        <p class="original">{{ currentSentence?.clean }}</p>
        <p class="translation">{{ state.translation }}</p>
        <div><small class="italic">{{ newWords.length }} new words</small></div>
        <br>
        <button @click="changeSentence(-1)">Previous</button>
        <button @click="changeSentence(1)">Next</button>
        <button @click="translate">Translate</button>
    </template>
  </MainWindow>
</template>

<style>

.original {
    font-size: 18px;
}

.translation {
    font-size: 16px;
}

.italic {
    font-style: italic;
}

</style>
