<template>
  <div class="w-full h-full p-5">
    <h1 class="text-2xl mb-3">Pronto Dashboard</h1>
    <div class="grid gap-4 grid-cols-3 w-full">
      <paper>
        <h3 class="text-sm text-gray-300 mb-4 text-center">Most Time Spent</h3>
        <time-spent-pie :colors="colors" />
      </paper>
      <paper class="col-span-2">
        <h3 class="text-sm text-gray-300 mb-4 text-center">
          Time Spent Over Time
        </h3>
        <time-spent-trend :colors="colors" range="day" />
      </paper>
      <paper class="col-span-2">
        <h3 class="text-sm text-gray-300 mb-4 text-center">
          Time Spent Over Time
        </h3>
        <time-spent-trend :colors="colors" range="day" />
      </paper>
      <paper class="">
        <h3 class="text-sm text-gray-300 mb-4 text-center">
          Most Time Spent in Different Categories
        </h3>
        <category-pie :colors="colors" />
      </paper>
      <dropdown></dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Paper from "@/components/Paper.vue";
import TimeSpentPie from "@/components/TimeSpentPie.vue";
import TimeSpentTrend from "@/components/TimeSpentTrend.vue";
import CategoryPie from "@/components/CategoryPie.vue";
import Dropdown from "@/components/Dropdown.vue";

export default Vue.extend({
  name: "App",
  data() {
    return {
      colors: [
        "#355070ff",
        "#6d597aff",
        "#b56576ff",
        "#e56b6fff",
        "#eaac8bff",
        "#cdb4dbff",
        "#ffc8ddff",
        "#ffafccff",
        "#bde0feff",
        "#a2d2ffff",
      ],
    };
  },
  components: { Paper, TimeSpentPie, TimeSpentTrend, CategoryPie, Dropdown },
});
</script>

<style lang="postcss">
html,
body {
  @apply w-full h-full;
}

html {
  @apply font-sans text-xl;
}

.dark {
  @apply text-white bg-prontodark-900;
}
</style>
