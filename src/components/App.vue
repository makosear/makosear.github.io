<script>
import { newParagraph, storeParagraphs } from "../utils/paragraph";
import { applyDrag } from "../utils/applyDrag";
import ViewDialogue from "./ViewDialogue.vue";
import ViewParagraph from "./ViewParagraph.vue";

export default {
  components: { ViewDialogue, ViewParagraph },

  props: ["initialParagraphs"],

  data() {
    return {
      characters: {},

      /** @type {import("../paragraph").Paragraph[]} */
      paragraphs: this.initialParagraphs.map(obj =>
        newParagraph(obj.kind, obj.text, obj.image)
      ),
      
      /** @type {number | null} */
      currentItem: null,
    }
  },

  watch: {
    // Monitor changes in the paragraphs array and save to localStorage
    paragraphs: storeParagraphs,
  },
    
  created() {
    this.doFetchCharacters().then(data => {
      this.characters = data;
    });
  },

  methods: {
    doCreateItem(index, type='dialogue') {
      const nextItems = this.paragraphs.slice();
      index = isNaN(index) ? nextItems.length : index;
      nextItems.splice(index, 0, newParagraph(type));
      this.paragraphs = nextItems;
    },

    doUpdateItem(index, property, value) {
      const nextItem = {...this.paragraphs[index], [property]: value};
      const nextItems = this.paragraphs.slice();
      nextItems.splice(index, 1, nextItem);
      this.paragraphs = nextItems;
    },

    doRemoveItem(index) {
      const proceed = window.confirm("Do you want to delete this paragraph? There's no undo.");
      if (proceed) {
        const nextItems = this.paragraphs.slice();
        nextItems.splice(index, 1);
        this.paragraphs = nextItems;
      }
    },

    doSelectItem(index) {
      this.currentItem = index;
    },

    doClearItems() {
      const proceed = window.confirm("Do you want to delete all the dialogue? There's no undo.");
      if (proceed) {
        this.paragraphs = [newParagraph('dialogue')];
      }
    },

    doFetchCharacters() {
      return window.fetch('/characters.json')
        .then(response => response.json())
    },

    doFetchSprites(character) {
      return window.fetch(`/characters/${character}.json`)
        .then(response => response.json())
    },

    doDrop(dropResult) {
      this.paragraphs = applyDrag(this.paragraphs, dropResult);
    },
  },
}
</script>

<template>
  <ViewDialogue v-if="currentItem === null"
    :items="paragraphs"
  />
  <ViewParagraph v-else
    :index="currentItem"
  />
</template>
