<template>
  <div class="w-full h-full p-5">
    <h1 class="text-2xl mb-3">Pronto Dashboard</h1>
    <paper>
      <line-chart
        :chartdata="{
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20],
            },
          ],
        }"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
        }"
      />
    </paper>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Paper from "@/components/Paper.vue";
import LineChart from "@/components/LineChart.vue";

export default Vue.extend({
  name: "App",
  components: { Paper, LineChart },
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
