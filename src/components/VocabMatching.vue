<script setup>
import MainWindow from "@/components/MainWindow.vue";
import { Activity } from "@/activity";
import { onBeforeMount, reactive, onMounted, onBeforeUnmount } from "vue";
import { Word } from "@/word";
import { Utility } from "@/utility";

const props = defineProps(["db"]);
const emit = defineEmits(["done"]);

const state = reactive({
  practiceWords: [],
  practiceIndex: 0,
  words: [], // word index => Word
  grid: [], // row, col => {wordIndex, shuffledIndex, selected}
});

onBeforeMount(async () => {
  state.practiceWords = await props.db.getPracticeByType(
    Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT
  );
  reloadGrid();
});

onMounted(() => {
  document.addEventListener("keydown", keyListener);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});

const cellClass = (x, y) => {
  const cell = state.grid[y][x];
  return {
    "matching-item": true,
    selected: cell === undefined ? false : cell.selected,
  };
};

const cellValue = (x, y) => {
  const cell = state.grid[y][x];
  return cell === undefined ? "" : state.words[cell.wordIndex].definition;
};

const findCell = (predicate) => {
  for (let y = 0; y < state.words.length; y++) {
    for (let x = 0; x < state.words.length; x++) {
      const cell = state.grid[y][x];
      if (cell && predicate(cell)) return { x: x, y: y, ...cell };
    }
  }
  return undefined;
};

const nextDefinition = () => {
  const cell = findCell((c) => c.selected);
  const nextIndex = (cell.shuffledIndex + 1) % state.words.length;
  const next = findCell((c) => c.shuffledIndex === nextIndex);
  cell.selected = false;
  next.selected = true;
};

const swapWith = (xDel, yDel) => {
  const { x, y } = findCell((c) => c.selected);
  const newX = x + xDel;
  const newY = y + yDel;

  const valid =
    1 <= newX && newX <= 2 && 0 <= newY && newY <= (state.words.length - 1);
  if (!valid) return;

  const temp = state.grid[newY][newX];
  state.grid[newY][newX] = state.grid[y][x];
  state.grid[y][x] = temp;
  if (checkAnswer()) {
    // TODO: add mastery and XP
    reloadGrid();
  }
};

const reloadGrid = () => {
  state.words = state.practiceWords.slice(
    state.practiceIndex,
    state.practiceIndex + 8
  );
  if (state.words.length === 0) emit("done");
  const shuffled = state.words.map((word, index) => index);
  Utility.shuffle(shuffled);
  state.grid = shuffled.map((wordIndex, shuffledIndex) => {
    const cell = {
      wordIndex,
      shuffledIndex,
      selected: shuffledIndex === 0,
    };
    return [undefined, undefined, cell];
  });
  state.practiceIndex += state.words.length;
};

const checkAnswer = () => {
  for (let y = 0; y < state.words.length; y++) {
    const cell = state.grid[y][1];
    if (cell === undefined || cell.wordIndex !== y) return false;
  }
  return true;
};

const keyListener = (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    nextDefinition();
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    swapWith(0, 1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    swapWith(-1, 0);
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    swapWith(0, -1);
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    swapWith(1, 0);
  }
  e.stopPropagation();
};
</script>

<template>
  <MainWindow
    v-if="state.practiceWords.length > 0"
    :title="Activity.VOCAB_IN_CONTEXT"
  >
    <template #activity>
      <table>
        <tr v-for="(word, index) in state.words">
          <td :class="cellClass(0, index)">{{ word.word }}</td>
          <td :class="cellClass(1, index)">{{ cellValue(1, index) }}</td>
          <td :class="cellClass(2, index)">{{ cellValue(2, index) }}</td>
        </tr>
      </table>
    </template>
  </MainWindow>
</template>
