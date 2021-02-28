<template>
  <div :class="{ relative: true, open }">
    <button
      @click="open = !open"
      class="relative z-10 block rounded p-2 bg-prontodark-600 w-full text-left"
      v-wave
    >
      {{ text }}
    </button>

    <div
      v-show="open"
      @click="open = false"
      class="fixed inset-0 h-full w-full z-10"
    ></div>

    <div
      v-show="open"
      class="absolute left-0 mt-2 w-48 bg-prontodark-700 rounded-md overflow-hidden shadow-xl z-20 overflow-y-auto h-32"
    >
      <div
        v-for="item in options"
        class="block px-4 py-2 text-sm text-gray-200 border-b border-transparent hover:bg-prontodark-600 cursor-pointer"
        :key="item"
        @click="selectOption(item)"
        v-wave
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      open: false,
    };
  },
  methods: {
    selectOption(option: any) {
      this.open = false;
      this.$emit("input", option);
    },
  },
  props: {
    options: Array as () => Array<string>,
    value: String,
    text: String,
  },
});
</script>

<style scoped lang="postcss"></style>
