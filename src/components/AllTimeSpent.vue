<template>
  <div>
    <h1 class="text-2xl mb-8">Total time spent:</h1>
    <h1 class="lg:text-8xl text-4xl text-gray-300">{{ humanTime }}</h1>
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
      const hours = Math.round(duration.asHours());
      const minutes = Math.round(duration.asMinutes());

      if (hours === 0 && minutes === 0) {
        return "No significant time";
      } else if (hours == 0 && minutes > 0) {
        return minutes.toString() + " minutes.";
      } else if (hours > 0 && minutes == 0) {
        return hours.toString() + " hours.";
      } else {
        return (
          hours.toString() + " hours and " + minutes.toString() + " minutes."
        );
      }
    },
  },
});
</script>
oh
