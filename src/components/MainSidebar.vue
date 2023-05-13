<script setup lang="ts">
import AudioPlayer from "@/components/AudioPlayer.vue";
import StatisticsTable from "@/components/StatisticsTable.vue";
import { onBeforeUpdate, reactive } from "vue";

const props = defineProps(["runtimeData"]);
const emit = defineEmits([
  "updateLanguage",
  "importDatabase",
  "exportDatabase",
  "openFiles",
  "changeActivity",
  "exportDefinedToday",
]);

const state = reactive({
  isShowingStatistics: false,
});

onBeforeUpdate(() => console.log("Sidebar will update", props));
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-group">
      <h3>{{ props.runtimeData.openTextFile }}</h3>
      <h4>{{ props.runtimeData.openAudioFile }}</h4>
      <AudioPlayer />
      <button @click="$emit('openFiles')">Open Files</button>
      <input
        :value="props.runtimeData.language"
        @change="(e) => emit('updateLanguage', e.target.value)"
        placeholder="Language"
        type="text"
      />
    </div>
    <div class="sidebar-group">
      <button @click="state.isShowingStatistics = true">Show Statistics</button>
      <StatisticsTable
        v-if="state.isShowingStatistics"
        @hide="state.isShowingStatistics = false"
      />
    </div>
    <div class="sidebar-group">
      <button @click="emit('exportDatabase')">Export Database</button>
      <button @click="emit('importDatabase')">Import Database</button>
      <button @click="emit('exportDefinedToday')">
        Export Defined Today ({{ props.runtimeData.definedToday.length }})
      </button>
    </div>
  </div>
</template>
