<script setup lang="ts">
import AudioPlayer from "@/components/AudioPlayer.vue";
import StatisticsTable from "@/components/StatisticsTable.vue";
import { Word } from "@/word";
import { Activity } from "@/activity";
import { onBeforeUpdate } from "vue";

const props = defineProps([
  "runtimeData",
  "audio",
  "statistics",
  "masteryCounts",
]);
const emit = defineEmits([
  "updateLanguage",
  "importDatabase",
  "exportDatabase",
  "openFiles",
  "changeActivity",
]);
onBeforeUpdate(() => console.log("Sidebar will update", props));
const masteryOf = (type: number) => {
  if (props.masteryCounts === undefined) return "";
  const count = props.masteryCounts[type];
  return count > 0 ? `(${count})` : "";
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-group">
      <h3>{{ props.runtimeData.openTextFile }}</h3>
      <h4>{{ props.runtimeData.openAudioFile }}</h4>
      <AudioPlayer :audio="props.audio" />
      <button @click="$emit('openFiles')">Open Files</button>
      <input
        :value="props.runtimeData.language"
        @change="(e) => emit('updateLanguage', e.target.value)"
        placeholder="Language"
        type="text"
      />
    </div>
    <div class="sidebar-group">
      <button @click="emit('changeActivity', Activity.READER)">Reader</button>
      <button @click="emit('changeActivity', Activity.VOCAB_IN_CONTEXT)">
        Vocabulary in Context
        {{ masteryOf(Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT) }}
      </button>
      <button>
        Vocabulary Matching
        {{ masteryOf(Word.MASTERY_LEVELS.VOCAB_MATCHING) }}
      </button>
      <button @click="emit('changeActivity', Activity.CLOZE)">
        Cloze
        {{ masteryOf(Word.MASTERY_LEVELS.CLOZE) }}
      </button>
      <button>
        Listening 1
        {{ masteryOf(Word.MASTERY_LEVELS.LISTENING1) }}
      </button>
      <button>
        Listening 2
        {{ masteryOf(Word.MASTERY_LEVELS.LISTENING2) }}
      </button>
    </div>
<!--    <StatisticsTable v-if="props.statistics" :statistics="props.statistics" />-->
    <div class="sidebar-group">
      <button @click="emit('exportDatabase')">Export Database</button>
      <button @click="emit('importDatabase')">Import Database</button>
    </div>
  </div>
</template>
