<template
  ><span>
    <div class="button-seperator">
      <v-btn
        color="success"
        large
        tile
        @click="$emit('chose-armor')"
        :disabled="!character.HasEquippedArmor"
      >
        <span v-if="!character.HasEquippedArmor">CHOOSE YOUR ARMOR</span>
        <span v-else>CHOOSE {{ character.EquippedArmor.Name }}</span>
      </v-btn>
    </div>
    Click an armor to select it!
    <div>
      <show-cards
        :inputs="armors"
        job="Armor"
        :selectButton="true"
        @chose="setArmor"
        :collapse="false"
      /></div
  ></span>
</template>
<script>
import Vue from "vue";

import { store } from "@/store";
import { Character } from "@/class";
import variables from "@/styles/variables.scss";
import ShowCards from "@/components/cards/ShowCards.vue";
export default Vue.extend({
  name: "armor-selection",
  components: { ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      variables,
    };
  },
  computed: {
    armors: function () {
      return this.$store.getters.getPlayerArmors();
    },
  },
  methods: {
    setArmor(variable) {
      this.character.EquippedArmor = variable.card;
    },
  },
});
</script>

<style scoped lang="scss">
.button-seperator {
  margin-bottom: 1em;
}
</style>
