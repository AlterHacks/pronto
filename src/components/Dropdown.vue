<template>
  <div class="dropdown">
    <button class="dropbtn">Dropdown</button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="postcss">
/* Style The Dropdown Button */
.dropbtn {
  @apply bg-prontodark-700 text-white p-4 text-lg border-none cursor-pointer rounded-sm focus:outline-none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  @apply bg-prontodark-800 relative inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  @apply bg-prontodark-700;
  display: none;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  @apply bg-prontodark-700;
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
