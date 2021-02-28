<template>
  <button v-wave :class="{ 'tab-group-item': true, active }">
    <slot />
  </button>
</template>

<style lang="postcss" scoped>
.tab-group-item {
  @apply text-white px-3 py-1 outline-none focus:outline-none rounded-t-sm mb-2 duration-150 border-b-2 border-transparent;
}

.active {
  @apply bg-opacity-20 bg-blue-300 border-blue-300 border-b-2;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
