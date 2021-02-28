<template>
  <div class="w-full h-full p-5">
    <portal-target name="destination"> </portal-target>
    <h1 class="text-2xl mb-3">Pronto Dashboard</h1>
    <div class="grid gap-4 grid-cols-3 w-full">
      <paper class="col-span-3 sm:col-auto">
        <h3 class="text-sm text-gray-300 mb-4 text-center">Most Time Spent</h3>
        <time-spent-pie :colors="colors" />
      </paper>
      <paper class="col-span-3 sm:col-span-2">
        <h3 class="text-sm text-gray-300 mb-4 text-center">
          Time Spent Over Time
        </h3>
        <tab-group>
          <tab-group-item
            v-for="option in rangeOptions"
            :key="option"
            :active="selectedRange === option"
            class="uppercase"
            @click.native="selectedRange = option"
          >
            {{ option }}
          </tab-group-item>
        </tab-group>
        <time-spent-trend :colors="colors" :range="selectedRange" />
      </paper>
      <paper class="col-span-2 flex flex-col justify-center text-center">
        <div class="flex flex-1 justify-center items-center">
          <all-time-spent />
        </div>
      </paper>
      <paper class="">
        <h3 class="text-sm text-gray-300 mb-4 text-center">
          Most Time Spent in Different Categories
        </h3>
        <category-pie :colors="colors" />
      </paper>
      <paper class="col-span-3 md:col-span-1">
        <h3 class="text-base text-gray-300 mb-2 text-center">
          Set a goal
        </h3>
        <p class="text-sm text-gray-400 mb-2">
          Setting a goal for how much time you spend on a certain kind of site
          can help you keep on task.
        </p>
        <goal-setter />
      </paper>
      <paper class="col-span-3 md:col-span-2">
        <h3 class="text-sm text-gray-300 mb-4 text-center">
          Diffrence between your goals and your acual time spent per category
        </h3>
        <category-goals :colors="colors" />
      </paper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Paper from "@/components/Paper.vue";
import TimeSpentPie from "@/components/TimeSpentPie.vue";
import TimeSpentTrend from "@/components/TimeSpentTrend.vue";
import CategoryPie from "@/components/CategoryPie.vue";
import AllTimeSpent from "@/components/AllTimeSpent.vue";
import TabGroup from "@/components/TabGroup.vue";
import TabGroupItem from "@/components/TabGroupItem.vue";
import CategoryGoals from "@/components/CategoryGoals.vue";
import GoalSetter from "@/components/GoalSetter.vue";

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
      rangeOptions: ["day", "week", "month", "year"],
      selectedRange: "day",
    };
  },
  components: {
    Paper,
    TimeSpentPie,
    TimeSpentTrend,
    CategoryPie,
    AllTimeSpent,
    TabGroupItem,
    TabGroup,
    CategoryGoals,
    GoalSetter,
  },
});
</script>

<style lang="postcss">
html,
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
