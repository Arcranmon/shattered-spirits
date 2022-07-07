<template
  ><span>
    <v-autocomplete
      class="dropdown"
      label="Choose a Discipline!"
      :items="disciplines"
      item-text="name_"
      :menu-props="{ top: false, offsetY: true }"
      hide-details
      v-model="discipline"
      outlined
      return-object
      @change="$emit('chose', discipline)"
    >
      <template slot="item" slot-scope="{ item }"> {{ item.Name }}</template>
      <template slot="selection" slot-scope="{ item }">
        {{ item.Name }}
      </template>
    </v-autocomplete>
    <discipline-card
      :discipline="discipline"
      v-if="(discipline.Name !='' )"
      :category="discipline.Category"
    />
  </span>
</template>
<script>
import Vue from "vue";

import { store } from "@/store";
import { Character, Discipline } from "@/class";
import variables from "@/styles/variables.scss";
import ShowCards from "@/components/cards/ShowCards.vue";
import DisciplineCard from "@/components/cards/DisciplineCard.vue";
export default Vue.extend({
  name: "stance-selection",
  components: { DisciplineCard, ShowCards },
  data: () => {
    return {
      variables,
      discipline: new Discipline(),
    };
  },
  computed: {
    disciplines: function () {
      return this.$store.getters.getDisciplines();
    },
  },
});
</script>

<style scoped lang="scss">
.discipline--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
.dropdown {
  width: 50%;
  margin: 2em !important;
  margin-left: auto !important ;
  margin-right: auto !important ;
  background-color: $color--off-white;
}
</style>
