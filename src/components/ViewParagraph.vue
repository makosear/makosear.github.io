<script>
import Navbar from "./Navbar.vue";
import Button from "./Button.vue";
import ParagraphBlock from "./ParagraphBlock.vue";
import Select from "./Select.vue";

export default {
  components: { Navbar, Button, ParagraphBlock, Select },

  props: ["index"],

  data: function() {
    return {
      character:
        sessionStorage.getItem("composer:last_character") || 
        Object.keys(this.$root.characters)[0],
      busts: [],
    }
  },

  computed: {
    characterList: function() {
      return Object.entries(this.$root.characters)
        .map(character => ({id: character[0], name: character[1]}))
        .sort((a, b) => a.name.localeCompare(b.name));
    },

    item() {
      return this.$root.paragraphs[this.index];
    },
    
    kind: {
      get() {
        return this.item.kind;
      },
      set(value) {
        this.$root.doUpdateItem(this.index, "kind", value);
      }
    },

    filter: {
      get() {
        const image = this.item.image;
        const url = image ? new URL(image) : null;
        return (url ? url.hash : null) || "#sprite";
      },
      set(value) {
        const image = this.item.image;
        if (image) {
          const url = new URL(image);
          url.hash = value;
          this.$root.doUpdateItem(this.index, "image", url.toString());
        }
      }
    },
  },

  watch: {
    character: function(newValue) {
      sessionStorage.setItem("composer:last_character", newValue);
      this.busts = [];
      this.$root.doFetchSprites(newValue).then(this.storeBusts);
    }
  },
    
  created() {
    this.busts = [];
    this.$root.doFetchSprites(this.character).then(this.storeBusts);
  },

  methods: {
    storeBusts(data) {
      if (Array.isArray(data.sprites)) {
        this.busts = data.sprites.reduce((busts, group) => {
          const items = group.type == "busts" ? Object.values(group.files) : [];
          return busts.concat(items);
        }, []);
      }
      else {
        this.busts = Object.values(data.sprites);
      }
    },

    selectSprite(bust) {
      const url = new URL(bust);
      url.hash = this.filter;
      this.$root.doUpdateItem(this.index, 'image', url.toString());
    }
  }
}
</script>

<template>
  <Navbar class="justify-between">
    <Button 
      @click="$root.doSelectItem(null)"
      color="slate" 
      label="&laquo; Back" 
    />

    <Select v-model="kind">
      <option value="dialogue">Dialogue</option>
      <option value="bullet">Bullet</option>
      <option value="evidence">Evidence</option>
    </Select>
  </Navbar>
  
  <div class="my-1">
    <ParagraphBlock
      :item="item"
      :index="index" 
      :showOptions="false"
    />
  </div>

  <div v-if="kind == 'dialogue'" class="mx-2 my-1">
    <div class="mb-2 flex flex-row gap-2">
      <Select v-model="character">
        <option disabled>Character</option>
        <option v-for="item of characterList" :value="item.id">
          {{ item.name }}
        </option>
      </Select>

      <Select v-model="filter">
        <option disabled>Image Filter</option>
        <option value="#sprite">Normal</option>
        <option value="#screen">Old Screen</option>
        <option value="#testimony">Testimony</option>
      </Select>
    </div>

    <div class="flex flex-row flex-wrap justify-start">
      <img v-for="bust of busts"
        class="basis-32 grow w-36 h-32 object-cover ring-1 ring-slate-300 rounded-sm"
        :key="bust" 
        :src="bust" 
        @click="selectSprite(bust)" 
      />
    </div>
  </div>

  <div v-else-if="kind == 'bullet'" class="my-1"></div>
</template>
