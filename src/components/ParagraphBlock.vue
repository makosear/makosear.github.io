<script>
export default {
  props: {
    index: Number,
    item: null,
    showOptions: {
      type: Boolean,
      default: true
    },
  },

  computed: {
    image: {
      get() {
        return this.item.image;
      },
      set(value) {
        this.$root.doUpdateItem(this.index, "image", value);
      }
    },

    text: {
      get() {
        return this.item.text;
      },
      set(value) {
        this.$root.doUpdateItem(this.index, "text", value);
      }
    }
  },
};
</script>

<template>
  <div class="paragraph mx-1 p-1 grid grid-cols-paragraph gap-2 rounded-md">

    <div v-if="item.kind == 'dialogue'" class="flex gap-1">
      <img v-if="item.image" 
        @click="$root.doSelectItem(index)" 
        :src="item.image" 
        class="w-32 h-24 object-cover ring-1 ring-slate-400 rounded-sm" 
      />
      <button v-else 
        class="w-32 h-24 text-2xl ring-1 ring-slate-400 rounded-sm" 
        @click="$root.doSelectItem(index)">&#8943;</button>

      <textarea 
        class="h-24 min-h-full p-1 grow text-sm ring-1 ring-slate-400 rounded-sm bg-transparent" 
        v-model="text" 
      />
    </div>

    <div v-if="item.kind == 'bullet'" class="grid justify-start items-center">
      <label class="bullet">
        <input type="text" v-model="text" />
      </label>
    </div>

    <div v-if="item.kind == 'evidence'" class="grid grid-cols-evidence grid-rows-evidence gap-2">
      <img :src="item.image" :alt="item.text" class="evidence row-span-2" />
      <label class="text-sm">Image URL</label>
      <input type="url" v-model="image" class="ring-1 ring-slate-400 rounded-sm" />
      <label class="text-sm">Alt text</label>
      <textarea v-model="text" class="ring-1 ring-slate-400 rounded-sm" />
    </div>

    <div v-if="showOptions" class="grid grid-rows-3 gap-1">
      <button
        @click="$root.doRemoveItem(index)"
        class="text-center text-red-500 ring-1 ring-red-400 rounded-sm"
      >&#10060;</button>

      <span class="drag-handler row-span-2 grid place-content-center text-center text-slate-500 ring-1 ring-slate-400 rounded-sm cursor-ns-resize">&#x2630;</span>
    </div>

  </div>
</template>
