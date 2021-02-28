<template>
  <paper>
    <div class="flex align-text-top items-center justify-center mb-4">
      <h1 class="text-lg">Pronto</h1>
      <div class="flex-1" />
      <h-btn @click.native="optionsButtonClick">View more stats</h-btn>
    </div>
    <h3 class="text-sm text-gray-300 mb-4 text-center">Most Time Spent</h3>
    <time-spent-pie :colors="colors" />
  </paper>
</template>

<script lang="ts">
import HBtn from "@/components/HBtn.vue";
import Paper from "@/components/Paper.vue";
import TimeSpentPie from "@/components/TimeSpentPie.vue";

import Vue from "vue";
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
  components: { Paper, TimeSpentPie, HBtn },
  methods: {
    optionsButtonClick() {
      chrome.tabs.create({ url: "options.html" });
    },
  },
});
</script>

<style lang="postcss">
html {
  @apply w-96 h-96;
}

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
