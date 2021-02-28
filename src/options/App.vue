<template>
  <div class="w-full h-full p-5">
    <h1 class="text-2xl mb-3">Pronto Dashboard</h1>
    <div class="flex">
      <paper>
        <h3 class="text-sm text-gray-300 mb-4 text-center">Most Time Spent</h3>
        <time-spent-pie :colors="colors" />
      </paper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Paper from "@/components/Paper.vue";
import TimeSpentPie from "@/components/TimeSpentPie.vue";

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
  components: { Paper, TimeSpentPie },
});
</script>

<style lang="postcss">
html,
body {
  @apply w-full h-full bg-prontodark-900;
}

html {
  @apply font-sans text-xl;
}

.dark {
  @apply text-white;
}
</style>
