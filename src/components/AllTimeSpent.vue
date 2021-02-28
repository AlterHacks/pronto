<template>
  <div>
    <h1 class="text-2xl mb-8">Time spent on the internet:</h1>
    <h1 class="text-8xl text-gray-300">{{ humanTime }} Hours.</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import dayjs from "dayjs";
import { ProntoDB } from "@/ProntoDB";

export default Vue.extend({
  data() {
    return {
      totalTime: 0,
    };
  },
  async mounted() {
    const db = new ProntoDB();
    const spent = await db.getAllTimeSpent();
    this.totalTime = spent;
  },
  computed: {
    humanTime(): string {
      const duration = dayjs.duration(this.totalTime);
      return Math.round(duration.asHours()).toString();
    },
  },
});
</script>
oh
