<script setup>
import TextView from "@/components/TextView.vue";
import AudioTimesInput from "@/components/AudioTimesInput.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import MainWindow from "@/components/MainWindow.vue";
import { Activity } from "@/activity";
import SentenceActivity from "@/sentence-activity";
import { onBeforeMount, onBeforeUpdate, reactive } from "vue";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { Word } from "@/word";

const emit = defineEmits(["done"]);
const audioPlayer = useAudioPlayerStore();

const sentenceActivity = reactive(
  new SentenceActivity(Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT, () => emit("done"))
);

const wordOptions = (raw, clean) => {
  return clean === sentenceActivity.word().word ? { bold: true } : {};
};

const wordPool = () => {
  return sentenceActivity.wordPool
    .filter((w) => w.isDefined())
    .map((w) => w.definition);
};

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
  <MainWindow v-if="sentenceActivity.word()" :title="Activity.VOCAB_IN_CONTEXT">
    <template #activity>
      <TextView
        :sentences="sentenceActivity.rawSentences()"
        :word-options="wordOptions"
      />
      <MultipleChoice
        :pool="wordPool()"
        :solution="sentenceActivity.word().definition"
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
