<script>
import Navbar from "./Navbar.vue";
import { Container, Draggable } from "vue-dndrop";
import ParagraphBlock from "./ParagraphBlock.vue";
import Button from "./Button.vue";
import MarkdownGen from "./MarkdownGen.vue";

export default {
  components: { Container, Draggable, Navbar, ParagraphBlock, Button, MarkdownGen },

  props: ["items"],

  data() {
    return {
      showMarkdown: false,
    }
  }
}
</script>

<template>
  <Navbar v-if="showMarkdown">
    <Button
      @click="showMarkdown = false"
      label="&laquo; Back"
    />
  </Navbar>
  <Navbar v-else>
    <Button
      @click="showMarkdown = true"
      label="Show Markdown"
      class="mr-6"
    />
    <Button
      @click="$root.doCreateItem(NaN, 'dialogue')"
      label="+Dialogue"
    />
    <Button
      @click="$root.doCreateItem(NaN, 'bullet')"
      label="+Bullet"
    />
    <Button
      @click="$root.doCreateItem(NaN, 'evidence')"
      label="+Evidence"
    />
    <div class="grow" />
    <Button
      @click="$root.doClearItems"
      label="Delete all" 
      class="text-red-800 ring-red-500 bg-red-200"
    />
  </Navbar>
  
  <MarkdownGen v-if="showMarkdown" :items="items" />

  <Container v-else
    @drop="$root.doDrop"
    class="my-1"
    drag-class="bg-slate-300"
    drag-handle-selector="span.drag-handler"
    lock-axis="y" 
  >
    <Draggable v-for="(paragraph, p) of items" :key="paragraph.id">
      <ParagraphBlock
        :item="paragraph"
        :index="p"
      />
    </Draggable>
  </Container>
</template>
