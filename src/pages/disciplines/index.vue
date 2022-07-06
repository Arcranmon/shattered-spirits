<template
  ><span>
    <v-select
      label="Choose a Discipline!"
      :items="disciplines"
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
    </v-select>
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
</style>
