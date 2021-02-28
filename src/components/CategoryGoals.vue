<template>
  <goal-chart
    :chartdata="topSpent"
    :options="{
      responsive: true,
      tooltips: {
        callbacks: {
          title: this.getTitle,
          label: this.getLabel,
        },
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
import GoalChart from "@/components/GoalChart.vue";
import { ProntoDB } from "@/ProntoDB";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { ChartTooltipItem, ChartData } from "chart.js";
import { Humanized } from "@/categories";
import globalState from "@/globalState";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default Vue.extend({
  components: { GoalChart },
  props: {
    colors: Array as () => string[],
  },
  data() {
    return {
      update: true,
      topSpent: {
        labels: ["a", "b", "c"],
        datasets: [
          {
            backgroundColor: "#f87979",
            data: [0],
          },
        ],
      } as Chart.ChartData,
    };
  },
  computed: {
    updateBarGraph() {
      return globalState.updateBarGraph;
    },
  },
  async mounted() {
    this.updateGraph();
  },
  watch: {
    updateBarGraph() {
      this.updateGraph();
    },
  },
  methods: {
    getLabel(tooltipItem: ChartTooltipItem, data: ChartData) {
      const rawUnix =
        this.topSpent.datasets?.[0]?.data?.[tooltipItem.index!] || 0;
      return dayjs.duration(rawUnix as number).humanize();
    },
    getTitle(tooltipItem: ChartTooltipItem[], data: ChartData) {
      const title = data.labels?.[tooltipItem[0].index || 0] as string;
      return title;
    },
    async updateGraph() {
      const db = new ProntoDB();
      const spent = await db.getTopCategories();
      const storageGoals = window.localStorage.getItem("goals");

      const parsed: {
        [category: string]: string;
      } = storageGoals ? JSON.parse(storageGoals) : {};

      Vue.set(
        this.topSpent,
        "labels",
        Object.entries(spent).map(([key, val]) => Humanized[key])
      );
      Vue.set(
        this.topSpent.datasets![0],
        "data",
        Object.entries(spent).map(([key, value]) => {
          return value - +(parsed[key] || 0);
        })
      );

      Vue.set(this.topSpent.datasets![0], "backgroundColor", this.colors);

      this.update = !this.update;
    },
  },
});
</script>
