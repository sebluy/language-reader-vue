<script setup lang="ts">
import MainWindow from "@/components/MainWindow.vue";
import { computed } from "vue";

const renderSentences = computed(() => {
  return "";
});
</script>

<template>
  <MainWindow title="Reader" subtitle="Page 1">
    <template v-slot:activity>
      <p>
        {{ renderSentences }}
      </p>
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group"></div>
        <div class="sidebar-group">
          <button>Previous Page</button>
          <button>Next Page</button>
        </div>
        <div class="sidebar-group">
          <button>Toggle Highlighting</button>
        </div>
      </div>
    </template>
  </MainWindow>
</template>
