<template>
  <div class="dropdown">
    <button class="dropbtn">{{ value || "Select..." }}</button>
    <div class="dropdown-content">
      <div
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    selectOption(option: any) {
      this.$emit("input", option);
    },
  },
  props: ["options", "value"],
});
</script>

<style scoped lang="postcss">
/* Style The Dropdown Button */
.dropbtn {
  @apply bg-prontodark-700 text-white p-4 text-lg border-none cursor-pointer rounded-sm min-w-full focus:outline-none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  @apply bg-prontodark-800 relative inline-block text-center rounded-md;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  @apply bg-prontodark-700 hidden absolute min-w-full shadow-md;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content div {
  @apply text-white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content div:hover {
  @apply bg-prontodark-700 hover:bg-blue-200 hover:text-black;
  box-shadow: 0 4px 18px 0 theme("colors.blue.400");
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  @apply bg-prontodark-800;
}
</style>
