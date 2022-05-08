<script>
import { isValidParagraph, toMarkdown } from "../utils/paragraph";
import Button from "./Button.vue";

export default {
  props: ["items"],
  computed: {
    markdown() {
      return this.items
        .filter(isValidParagraph)
        .map(toMarkdown)
        .join("\n\n");
    }
  },
  methods: {
    copyAll() {
      navigator.clipboard.writeText(this.markdown);
    },

    selectAll: function selectAll(evt) {
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(evt.target);
        range.select();
      }
      else if (window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(evt.target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
  },
  components: { Button }
}
</script>

<template>
  <div class="m-2">
    <div 
      class="mb-2 px-2 py-1 ring-1 ring-slate-500 rounded-sm whitespace-pre-line"
      v-on:click="selectAll"
    >{{ markdown }}</div>
    <Button @click="copyAll" label="Copy all" />
  </div>
</template>
