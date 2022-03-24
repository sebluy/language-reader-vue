<script setup>
import MainWindow from "@/components/MainWindow.vue";
import TextView from "@/components/TextView.vue";
import DefinitionInput from "@/components/DefinitionInput.vue";

const props = defineProps(["sentences", "page"]);
const emit = defineEmits(["changePageBy"]);
</script>

<template>
  <MainWindow title="Reader" :subtitle="'Page ' + (props.page + 1)">
    <template v-slot:activity>
      <TextView :sentences="props.sentences" />
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group">
          <DefinitionInput id="word-definition" />
          <DefinitionInput id="sentence-definition" tag="textarea" />
        </div>
        <div class="sidebar-group">
          <button @click="emit('changePageBy', -1)">Previous Page</button>
          <button @click="emit('changePageBy', 1)">Next Page</button>
        </div>
        <div class="sidebar-group">
          <button>Toggle Highlighting</button>
        </div>
      </div>
    </template>
  </MainWindow>
</template>
