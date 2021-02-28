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
      scales: {
        yAxes: [
          {
            type: 'logarithmic',
          },
        ],
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
import updateLocale from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";
import { ChartTooltipItem, ChartData, ChartPoint } from "chart.js";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

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
    this.updateGraph();
  },
  watch: {
    range(): void {
      this.updateGraph();
    },
  },
  methods: {
    getLabel(tooltipItem: ChartTooltipItem, data: ChartData) {
      const rawUnix =
        (data.datasets?.[tooltipItem.datasetIndex || 0]?.data?.[
          tooltipItem.index!
        ] as ChartPoint)?.y || 0;
      return dayjs.duration(rawUnix as number).humanize(false);
    },
    getTitle(tooltipItem: ChartTooltipItem[], data: ChartData) {
      return data.datasets?.[tooltipItem[0].datasetIndex || 0].label;
    },
    async updateGraph() {
      const ranges = {
        hour: 3.6e3,
        day: 8.64e4,
        week: 6.048e5,
        month: 2.628e6,
        year: 3.154e7,
      };
      const selectedRange = ranges[this.range];
      const granularity = 100;

      const step = selectedRange / granularity;

      const db = new ProntoDB();

      const lineConfig: Chart.ChartData = {
        labels: [],
        datasets: [],
      };

      const mappedData: {
        [host: string]: {
          x: number;
          y: number;
        }[];
      } = {};
      for (let i = 0; i < granularity; i++) {
        const spent = await db.getTopSpentBetween(
          Date.now() - step * 1000 * i,
          Date.now() - step * 1000 * (i - 1)
        );

        Object.keys(spent).forEach((key) => {
          if (!mappedData[key]) mappedData[key] = [];
          mappedData[key].push({
            x: Date.now() - step * 1000 * i,
            y: spent[key],
          });
        });
      }

      console.log(mappedData);

      Object.keys(mappedData).forEach((key, i) => {
        lineConfig.datasets?.push({
          borderColor: this.colors[i % this.colors.length],
          fill: false,
          label: key,
          data: mappedData[key],
          pointRadius: 5,
          pointBackgroundColor: this.colors[i % this.colors.length],
          lineTension: 0,
          showLine: true,
        });
      });
      Vue.set(this.topSpent, "datasets", lineConfig.datasets);
      this.update = !this.update;
    },
  },
});
</script>
