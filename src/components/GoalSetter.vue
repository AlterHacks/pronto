<template>
    <div>
        <dropdown :options="categoryKeys" v-model="selectedCategory"/>
        <input value="">
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Dropdown from "@/components/Dropdown.vue";
import categories from "../categories";


export default Vue.extend({
  components: { Dropdown },
  props: {
  },
  data() {
      return {
          selectedCategory: ""
      };
  },
  computed: {
      categoryKeys : function() {
          return Object.entries(categories).map(([key, value]) => key);
      }
  },
  async mounted() {
      console.log("keys", this.categoryKeys)
  },
});
</script>