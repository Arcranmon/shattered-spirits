<template
  ><div
    class="discipline--box"
    :style="{ 'background-color': discipline.Background }"
  >
    <h2>{{ discipline.Name }}</h2>
    <div class="page--description">
      <b>{{ discipline.Role }}</b>
    </div>
    <div class="page--description">{{ discipline.Flavor }}</div>
    <show-cards
      :inputs="$store.getters.getStancesFromList(discipline.Stances)"
      job="Stances"
      :color_category="category"
    />
    <show-cards
      :inputs="$store.getters.getTechniquesFromList(discipline.Techniques)"
      job="Techniques"
      :color_category="category"
    />
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/cards/ShowCards.vue";
import { Discipline } from "@/class";
import { store } from "@/store";
export default Vue.extend({
  name: "category-cards",
  props: {
    discipline: {
      type: Discipline,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  components: {
    ShowCards,
  },
});
</script>

<style scoped lang="scss">
.discipline--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
