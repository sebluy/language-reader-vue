<script setup>
import MultipleChoice from "@/components/MultipleChoice.vue";
import AudioTimesInput from "@/components/AudioTimesInput.vue";
import MainWindow from "@/components/MainWindow.vue";
import { Activity } from "@/activity";
import SentenceActivity from "@/sentence-activity";
import { onBeforeMount, onBeforeUpdate, reactive } from "vue";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { Word } from "@/word";

const emit = defineEmits(["done"]);
const audioPlayer = useAudioPlayerStore();

const sentenceActivity = reactive(
  new SentenceActivity(Word.MASTERY_LEVELS.LISTENING2, () => emit("done"))
);

onBeforeMount(() => {
  sentenceActivity.load();
});

onBeforeUpdate(() => {
  const sentence = sentenceActivity.sentence();
  audioPlayer.setAudioTimes(sentence.startTime, sentence.endTime);
  audioPlayer.play();
});
</script>

<template>
  <MainWindow v-if="sentenceActivity.sentence()" :title="Activity.LISTENING2">
    <template #activity>
      <MultipleChoice
        :pool="sentenceActivity.sentencePool"
        :solution="sentenceActivity.sentence().definition"
        @correct-answer="() => sentenceActivity.correctAnswer()"
      />
    </template>
    <template v-slot:sidebar>
      <div class="sidebar right">
        <div class="sidebar-group">
          <audio-times-input :sentence="sentenceActivity.sentence()" />
        </div>
      </div>
    </template>
  </MainWindow>
</template>
