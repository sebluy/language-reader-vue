<script setup>
import { reactive, onBeforeMount, ref, onUpdated } from "vue";
import { useLanguageDB } from "@/language-db";
import { Chart, registerables } from "chart.js";
import 'chartjs-adapter-moment';

Chart.register(...registerables);

const chart = ref(null);
const db = useLanguageDB();
const emit = defineEmits(["hide"]);
const state = reactive({
  history: [],
  definedByDay: [],
  defined: 0,
  definedToday: 0,
  maxDefined: 0,
  loading: true,
  cumulative: true,
});

onBeforeMount(async () => {
  const stats = await db.getStatistics();
  state.history = await db.getHistory();
  const lastStats = state.history[state.history.length - 1];
  state.history.push(stats);

  state.defined = stats.defined;

  if (lastStats === undefined) {
    state.definedToday = stats.defined;
  } else {
    state.definedToday = stats.defined - lastStats.defined;
  }

  for (let i = 1; i < state.history.length; i++) {
    const previousDay = state.history[i - 1];
    const day = state.history[i];
    state.definedByDay.push({
      date: day.date,
      defined: day.defined - previousDay.defined,
    });
  }

  state.maxDefined = Math.max(...state.definedByDay.map((day) => day.defined));

  state.loading = false;
});

onUpdated(() => {
  if (!chart.value) return;
  const existingChart = Chart.getChart(chart.value);
  if (existingChart) existingChart.destroy();

  let labels, data;
  if (state.cumulative) {
    labels = state.history.map((day) => new Date(day.date));
    data = state.history.map((day) => day.defined);
  } else {
    labels = state.definedByDay.map((day) => new Date(day.date));
    data = state.definedByDay.map((day) => day.defined);
  }

  new Chart(chart.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: "Defined",
          data,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          type: 'time',
        },
      }
    }
  });
});

const toggleCumulative = () => {
  state.cumulative = !state.cumulative;
};

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
            <td>Defined Today</td>
            <td>{{ state.definedToday }}</td>
          </tr>
          <tr>
            <td>Maximum Daily Defined</td>
            <td>{{ state.maxDefined }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <canvas ref="chart" width="400" height="200"></canvas>
    </div>
    <button @click="toggleCumulative">
      {{ state.cumulative ? "Per Day" : "Cumulative" }}
    </button>
    <button @click="emit('hide')">Hide</button>
  </div>
</template>
