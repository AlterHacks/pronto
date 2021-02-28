<template>
  <div>
    <h-dialog v-model="setNewGoalOpen">
      <template slot="activator">
        <h-btn
          color="primary"
          outlined
          class="mb-2"
          @click.native="setNewGoalOpen = true"
          >Set a new goal</h-btn
        >
      </template>
      <paper class="p-4 w-5/6 md:w-1/2">
        <h1 class="text-lg">Create a New Category Goal</h1>
        <label class="text-sm text-gray-300">Chosen Category</label>
        <dropdown
          :options="categoryKeys"
          v-model="selectedCategory"
          :text="humanized[selectedCategory] || 'Select a Category...'"
          class="mb-2"
        />
        <label class="text-sm text-gray-300">Time Goal</label>
        <h-text-field
          v-model="goal"
          type="number"
          placeholder="Goal for time usage"
          step="30"
          class="w-full"
          dense
        />
        <div class="flex mt-4">
          <div class="flex-1" />
          <h-btn
            text
            flat
            color="secondary"
            @click.native="setNewGoalOpen = false"
            >Cancel
          </h-btn>
          <h-btn class="ml-2" text flat color="primary" @click.native="addGoal"
            >Add Goal
          </h-btn>
        </div>
      </paper>
    </h-dialog>
    <table class="w-full">
      <tr class="text-left">
        <th>Category</th>
        <th>Goal</th>
        <th>Actions</th>
      </tr>
      <tbody>
        <tr v-for="(goal, category) in goals" :key="category">
          <td>
            {{ category }}
          </td>
          <td>
            {{ goal }}
          </td>
          <td>
            <div>
              <h-btn
                flat
                color="primary"
                @click.native="removeGoal(category)"
                icon
              >
                <h-icon icon="mdiDelete" size="22" />
              </h-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Dropdown from "@/components/Dropdown.vue";
import categories, { Humanized } from "../categories";
import HTextField from "./HTextField.vue";
import Paper from "./Paper.vue";
import HBtn from "./HBtn.vue";
import HDialog from "./HDialog.vue";
import HIcon from "./HIcon.vue";
import globalState from "@/globalState";

export default Vue.extend({
  components: { Dropdown, HTextField, Paper, HBtn, HDialog, HIcon },
  props: {},
  data() {
    return {
      setNewGoalOpen: false,
      selectedCategory: "",
      goal: "0",
      goals: {} as {
        [category: string]: string;
      },
      humanized: Humanized,
    };
  },
  computed: {
    categoryKeys: function() {
      return Object.keys(Humanized);
    },
  },
  mounted() {
    const storageGoals = localStorage.getItem("goals");
    if (storageGoals) {
      this.goals = JSON.parse(storageGoals);
    }
  },
  methods: {
    addGoal() {
      Vue.set(this.goals, this.selectedCategory, this.goal);
      localStorage.setItem("goals", JSON.stringify(this.goals));
      this.setNewGoalOpen = false;
      globalState.updateBarGraph = !globalState.updateBarGraph;
    },
    removeGoal(category: string) {
      console.log(category, this.goals);
      Vue.delete(this.goals, category);
      localStorage.setItem("goals", JSON.stringify(this.goals));
      globalState.updateBarGraph = !globalState.updateBarGraph;
    },
  },
});
</script>
