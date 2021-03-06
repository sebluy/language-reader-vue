<script setup>
import { reactive, onBeforeMount, ref, onUpdated } from "vue";
import { useLanguageDB } from "@/language-db";
import { useRuntimeData } from "@/runtime-data";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const chart = ref(null);
const db = useLanguageDB();
const runtimeData = useRuntimeData();
const emit = defineEmits(["hide"]);
const state = reactive({
  history: [],
  defined: 0,
  learned: 0,
  mastered: 0,
  definedToday: 0,
  learnedToday: 0,
  masteredToday: 0,
  loading: true,
});

onBeforeMount(async () => {
  const stats = await db.getStatistics();
  state.history = await db.getHistory();
  const lastStats = state.history[state.history.length - 1];
  state.history.push(stats);

  state.defined = stats.defined;
  state.learned = stats.learned;
  state.mastered = stats.mastered;

  if (lastStats === undefined) {
    state.definedToday = stats.defined;
    state.learnedToday = stats.learned;
    state.masteredToday = stats.mastered;
  } else {
    state.definedToday = stats.defined - lastStats.defined;
    state.learnedToday = stats.learned - lastStats.learned;
    state.masteredToday = stats.mastered - lastStats.mastered;
  }

  state.loading = false;
});

onUpdated(() => {
  if (!chart.value) return;
  const myChart = new Chart(chart.value, {
    type: 'line',
    data: {
      labels: state.history.map((day) => day.date),
      datasets: [{
        label: 'Learned',
        data: state.history.map((day) => day.learned)
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
})
</script>

<template>
  <div id="stats-modal" v-if="!state.loading">
    <div>
      <table>
        <tbody>
          <tr>
            <td>Words Defined</td>
            <td>{{ state.defined }}</td>
          </tr>
          <tr>
            <td>Words Learned</td>
            <td>{{ state.learned.toFixed(2) }}</td>
          </tr>
          <tr>
            <td>Words Mastered</td>
            <td>{{ state.mastered }}</td>
          </tr>
          <tr>
            <td>Defined Today</td>
            <td>{{ state.definedToday }}</td>
          </tr>
          <tr>
            <td>Learned Today</td>
            <td>{{ state.learnedToday.toFixed(2) }}</td>
          </tr>
          <tr>
            <td>Mastered Today</td>
            <td>{{ state.masteredToday }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <canvas ref="chart" width="400" height="200"></canvas>
    </div>
    <button @click="emit('hide')">Hide</button>
  </div>
</template>
