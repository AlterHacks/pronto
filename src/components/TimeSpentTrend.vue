<template>
  <line-chart
    :chartdata="topSpent"
    :options="{
      responsive: false,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: this.getTitle,
          label: this.getLabel,
        },
        mode: 'nearest',
        intersect: false,
      },
      legend: {
        display: false,
      },
    }"
    :update="update"
  />
</template>

<script lang="ts">
import Vue from "vue";
import LineChart from "@/components/LineChart.vue";
import { ProntoDB } from "@/ProntoDB";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { ChartTooltipItem, ChartData } from "chart.js";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default Vue.extend({
  components: { LineChart },
  props: {
    colors: Array as () => string[],
    range: String as () => "day" | "week" | "month" | "year",
  },
  data() {
    return {
      update: true,
      topSpent: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#f87979",
            data: [40, 20],
          },
        ],
      } as Chart.ChartData,
    };
  },
  async mounted() {
    // in seconds
    const ranges = {
      hour: 3.6e3,
      day: 8.64e4,
      week: 6.048e5,
      month: 2.628e6,
      year: 3.154e7,
    };
    const selectedRange = 20000; // ranges[this.range];
    const granularity = 100;

    const step = selectedRange / granularity;

    const db = new ProntoDB();

    const lineConfig: Chart.ChartData = {
      labels: [],
      datasets: [],
    };

    const mappedData: {
      [host: string]: number[];
    } = {};
    for (let i = 0; i < granularity; i++) {
      const spent = await db.getTopSpentBetween(
        Date.now() - step * 1000 * i,
        Date.now() - step * 1000 * (i - 1)
      );

      Object.keys(spent).forEach((key) => {
        if (!mappedData[key]) mappedData[key] = [];
        mappedData[key].push(spent[key]);
      });
    }

    Object.keys(mappedData).forEach((key, i) => {
      lineConfig.datasets?.push({
        borderColor: this.colors[i % this.colors.length],
        fill: false,
        label: key,
        data: mappedData[key],
        pointRadius: 5,
        pointBackgroundColor: this.colors[i % this.colors.length],
        lineTension: 0.8,
      });
    });
    Vue.set(this.topSpent, "datasets", lineConfig.datasets);
    this.update = !this.update;
  },
  methods: {
    getLabel(tooltipItem: ChartTooltipItem, data: ChartData) {
      const rawUnix =
        this.topSpent.datasets?.[0]?.data?.[tooltipItem.index!] || 0;
      return dayjs.duration(rawUnix as number).humanize();
    },
    getTitle(tooltipItem: ChartTooltipItem[], data: ChartData) {
      return data.datasets?.[tooltipItem[0].datasetIndex || 0].label;
    },
  },
});
</script>
