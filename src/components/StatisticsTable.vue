<script setup>
import { reactive, onBeforeMount } from "vue";
import { useLanguageDB } from "@/language-db";
import { useRuntimeData } from "@/runtime-data";

const db = useLanguageDB();
const runtimeData = useRuntimeData();
const emit = defineEmits(["hide"]);
const state = reactive({
  totalWordsTranslated: 0,
  wordsLearnedToday: 0,
  xpToday: 0,
  xpLast: 0,
  loading: true,
});

onBeforeMount(async () => {
  state.totalWordsTranslated = await db.getNumberOfWordsTranslated();
  state.wordsLearnedToday = runtimeData.wordsLearnedToday;
  state.xpToday = runtimeData.xpToday;
  state.xpLast = runtimeData.xpLast;
  state.loading = false;
});
</script>

<template>
  <div id="stats-modal" v-if="!state.loading">
    <table>
      <tbody>
        <tr>
          <td>Total Words Translated</td>
          <td>{{ state.totalWordsTranslated }}</td>
        </tr>
        <tr>
          <td>Words Learned Today</td>
          <td>{{ state.wordsLearnedToday }}</td>
        </tr>
        <tr>
          <td>Today's XP</td>
          <td>{{ state.xpToday }}</td>
        </tr>
        <tr>
          <td>Last XP</td>
          <td>{{ state.xpLast }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="emit('hide')">Hide</button>
  </div>
</template>
