<script setup lang="ts">
import AudioPlayer from "@/components/AudioPlayer.vue";
import { onBeforeUpdate } from "vue";

const props = defineProps(["runtimeData", "audioSrc"]);
const emit = defineEmits(["changePageBy", "updateLanguage"]);
onBeforeUpdate(() => console.log("Sidebar will update", props));
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-group">
      <h3>{{ props.runtimeData.openTextFile }}</h3>
      <h4>{{ props.runtimeData.openAudioFile }}</h4>
      <AudioPlayer :src="props.audioSrc" />
      <button @click="$emit('openFiles')">Open Files</button>
      <input
        :value="props.runtimeData.language"
        @change="(e) => emit('updateLanguage', e.target.value)"
        placeholder="Language"
        type="text"
      />
    </div>
    <div class="sidebar-group">
      <select name="activity">
        <option value="reader">Reader</option>
        <option value="auto">Auto</option>
        <option value="vocab-in-context">Vocabulary in Context</option>
        <option value="vocab-matching">Vocabulary Matching</option>
        <option value="listening">Listening</option>
        <option value="listening2">Listening 2</option>
        <option value="cloze">Cloze</option>
        <option value="unscramble">Unscramble</option>
      </select>
    </div>
    <div class="sidebar-group">
      <button @click="emit('changePageBy', -1)">Previous Page</button>
      <button @click="emit('changePageBy', 1)">Next Page</button>
    </div>
    <!--    <Statistics {...this.props.statistics}/>-->
    <div class="sidebar-group">
      <button>Export Database</button>
      <button>Import Database</button>
    </div>
  </div>
</template>
