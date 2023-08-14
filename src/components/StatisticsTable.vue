<script setup>
import {reactive, onBeforeMount, ref, onUpdated, computed} from "vue";
import { useLanguageDB } from "@/language-db";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";

Chart.register(...registerables);

const chart = ref(null);
const db = useLanguageDB();
const emit = defineEmits(["hide"]);
const state = reactive({
  history: [],
  definedByDay: [],
  definedByWeek: [],
  defined: 0,
  definedToday: 0,
  maxDefined: 0,
  loading: true,
  mode: "Cumulative",
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

  let dateIter = new Date(state.history[0].date);
  for (let i = 1; i < state.history.length; i++) {
    const previousDay = state.history[i - 1];
    const day = state.history[i];

    while (dateIter < new Date(day.date)) {
      state.definedByDay.push({
        date: dateIter.toLocaleDateString(),
        defined: 0,
      });
      dateIter.setDate(dateIter.getDate() + 1);
    }

    state.definedByDay.push({
      date: day.date,
      defined: day.defined - previousDay.defined,
    });
    dateIter.setDate(dateIter.getDate() + 1);
  }

  let filterSum = 0;
  for (let i = 0; i < state.definedByDay.length; i++) {
    filterSum += state.definedByDay[i].defined;
    if (i >= 7) {
      filterSum -= state.definedByDay[i - 7].defined;
    }

    state.definedByWeek.push({
      date: state.definedByDay[i].date,
      defined: filterSum,
    });
  }

  state.maxDefined = Math.max(...state.definedByDay.map((day) => day.defined));

  state.loading = false;
});

onUpdated(() => {
  if (!chart.value) return;
  const existingChart = Chart.getChart(chart.value);
  if (existingChart) existingChart.destroy();

  let collection;
  if (state.mode === "Cumulative") {
    collection = state.history;
  } else if (state.mode === "Per Day") {
    collection = state.definedByDay;
  } else {
    collection = state.definedByWeek;
  }

  const labels = collection.map((day) => new Date(day.date));
  const data = collection.map((day) => day.defined);

  new Chart(chart.value, {
    type: "line",
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
          type: "time",
        },
      },
    },
  });
});

const nextMode = computed(() => {
  if (state.mode === "Cumulative") {
    return "Per Day";
  } else if (state.mode === "Per Day") {
    return "Per Week";
  } else {
    return "Cumulative";
  }
});

const changeMode = () => {
  state.mode = nextMode.value;
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
    <button @click="changeMode">
      {{ nextMode }}
    </button>
    <button @click="emit('hide')">Hide</button>
  </div>
</template>
