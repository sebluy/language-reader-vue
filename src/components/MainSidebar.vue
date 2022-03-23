<script setup lang="ts">
import {onBeforeUpdate} from "vue";

const props = defineProps(["openTextFile"]);
onBeforeUpdate(() => console.log("Sidebar will update", props))
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-group">
      <h3>{{ props.openTextFile }}</h3>
      <h4>Audio File</h4>
<!--      <AudioPlayer {...this.props.audio}/>-->
      <button @click="$emit('openFiles')">Open Files</button>
      <input
          placeholder="Language"
          type="text"
          readOnly/>
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
<!--    <Statistics {...this.props.statistics}/>-->
    <div class="sidebar-group">
      <button>Export Database</button>
      <button>Import Database</button>
    </div>
  </div>
</template>

