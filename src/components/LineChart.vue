<template>
  <canvas ref="chart" class="w-full"></canvas>
</template>

<script lang="ts">
import Chart from "chart.js";
import Vue from "vue";

export default Vue.extend({
  props: {
    chartdata: {
      type: Object as () => Chart.ChartData,
      default: null,
    },
    options: {
      type: Object as () => Chart.ChartOptions,
      default: null,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartInst: undefined as Chart | undefined,
    };
  },
  mounted() {
    this.chartInst = new Chart(
      (this.$refs.chart as HTMLCanvasElement).getContext("2d")!,
      {
        type: "scatter",
        data: this.chartdata,
        options: this.options,
      }
    );
  },
  watch: {
    update() {
      this.chartInst?.update();
    },
  },
});
</script>
