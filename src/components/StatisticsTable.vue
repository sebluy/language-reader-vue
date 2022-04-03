<script setup>
const props = defineProps(["statistics"]);

const fp = (p) => (p * 100).toFixed(2) + "%";
const s = () => props.statistics;
</script>

<template>
  <div class="sidebar-group">
    <table id="stats">
      <tbody>
        <tr>
          <td>Total Words Translated</td>
          <td>{{ s().totalWordsTranslated }}</td>
        </tr>
        <tr>
          <td>New Words</td>
          <td>{{ s().newWords }}</td>
        </tr>
        <tr>
          <td>Words Learned Today</td>
          <td>{{ s().wordsLearnedToday }}</td>
        </tr>
        <tr>
          <td>Percent Translated</td>
          <td>{{ fp(s().percentTranslated) }}</td>
        </tr>
        <tr>
          <td>Words Mastered</td>
          <td>{{ fp(s().percentWordsMastered) }}</td>
        </tr>
        <tr>
          <td>Today's XP</td>
          <td>{{ s().xpToday }}</td>
        </tr>
        <tr>
          <td>Last XP</td>
          <td>{{ s().xpLast }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
