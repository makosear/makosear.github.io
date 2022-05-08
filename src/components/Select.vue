<script>
export default {
  props: {
    modelValue: String,
  },

  emits: ['update:modelValue'],

  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
}
</script>

<template>
  <select 
    class="p-1 text-sm text-slate-800 ring-1 ring-slate-500 bg-slate-200 rounded-sm"
    v-model="value"
  >
    <slot />
  </select>
</template>
