<script setup>
import MainWindow from "@/components/MainWindow.vue";
import { reactive } from "vue";

const props = defineProps(["languageText"]);
const state = reactive({
  word: undefined,
});
</script>

<template>
  <MainWindow title="Vocabulary in Context">
    <template v-slot:activity>
      <p>Word</p>
      <p>Sentence</p>
      <p>Definition</p>
    </template>
    <template v-slot:sidebar>
    </template>
  </MainWindow>
</template>
