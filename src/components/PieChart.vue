<script lang="ts">
import Vue from "vue";
import { Pie } from "vue-chartjs";
import { BaseChart } from "vue-chartjs/types/components";

export default Vue.extend({
  extends: Pie,
  props: {
    chartdata: {
      type: Object as () => Chart.ChartData,
      default: null,
    },
    options: {
      type: Object as () => Chart.ChartOptions,
      default: null,
    },
  },
  mounted() {
    ((this as unknown) as BaseChart).renderChart(this.chartdata, this.options);
  },
});
</script>
