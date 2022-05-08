<script>
export default {
  props: ["label"],
};
</script>

<template>
  <button class="px-2 py-1 text-sm ring-1 rounded-sm text-slate-800 ring-slate-500 bg-slate-200">
    {{label}}
  </button>
</template>
