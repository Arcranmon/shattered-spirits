<template>
  <div>
    <p style="text-align: center; width: 100%">
      You can do a great deal to specialize your spirit, from choosing its physical form to deciding what type of magic it is most aligned with. The below tabs
      show the different spirit options available at character creation, as well as an additional tab showing natural weapons such as claws and fangs that
      spirits may choose from.
    </p>
    <br />
    <v-tabs
      v-model="tab"
      class="spirit-tabs"
      background-color="#b69e75"
      color="black"
      centered>
      <!---<v-tab> <h4>Earth</h4> </v-tab>
<v-tab> <h4>Flame</h4> </v-tab>
<v-tab> <h4>Water</h4> </v-tab>
<v-tab> <h4>Wind</h4> </v-tab>

      -->
      <v-tab> <h4>Metal</h4> </v-tab>
      <v-tab> <h4>Wood</h4> </v-tab>
      <v-tab> <h4>Traits</h4> </v-tab>
      <v-tab> <h4>Stances</h4> </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
      class="spirit-tab-content">
      <!---
      <v-tab-item>
<spirit-ability-options element="Earth" /> </v-tab-item>
      <v-tab-item> </v-tab-item>
      <v-tab-item> </v-tab-item>
      <v-tab-item> </v-tab-item>
      <v-tab-item>
</v-tab-item>
      --->
      <v-tab-item class="character-tab-content">
        <spirit-ability-options element="Metal" />
      </v-tab-item>
      <v-tab-item class="character-tab-content">
        <spirit-ability-options element="Wood" />
      </v-tab-item>
      <v-tab-item class="character-tab-content">
        <show-cards
          display_text="Size Traits (Free)"
          :inputs="getSizeTraits"
          :cols="1" />
        <show-cards
          display_text="Common Traits (1 Point)"
          :inputs="this.$store.getters.getTraitsByTagAndCost('General', '1')"
          :cols="1" />
        <show-cards
          display_text="Uncommon Traits (2 Points)"
          :inputs="this.$store.getters.getTraitsByTagAndCost('General', '2')"
          :cols="1" />
        <show-cards
          display_text="Rare Traits (3 Points)"
          :inputs="this.$store.getters.getTraitsByTagAndCost('General', '3')"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          class="character-tab-content"
          style="border-top: 2px solid black"
          :inputs="$store.getters.getStancesFromList($store.getters.basicSpiritStances)"
          :cols="1"
          :collapse="false" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import EarthText from '@/database/text_files/spirit_mechanics/earth.txt'
import WaterText from '@/database/text_files/spirit_mechanics/water.txt'
import WindText from '@/database/text_files/spirit_mechanics/wind.txt'
import FlameText from '@/database/text_files/spirit_mechanics/flame.txt'
import SpiritWeaponText from '@/database/text_files/spirit_mechanics/spirit_weapons.txt'
import CombatTraitText from '@/database/text_files/spirit_mechanics/combat_traits.txt'
import SpiritTypeCard from '@/components/cards/SpiritTypeCard.vue'
import WeaponWidget from '@/components/cards/WeaponWidget.vue'
import SpiritAbilityOptions from '@/components/SpiritAbilityOptions.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'spirit-abilities',
  data() {
    return {
      tab: 0,
      weaponTypes: ['Any', 'Light', 'Balanced', 'Heavy'],
      selectedType: 'Any',
    }
  },
  components: { ShowCards, WeaponWidget, SpiritTypeCard, SpiritAbilityOptions },
  computed: {
    earthText() {
      return EarthText
    },
    waterText() {
      return WaterText
    },
    windText() {
      return WindText
    },
    flameText() {
      return FlameText
    },
    spiritWeaponText() {
      return SpiritWeaponText
    },
    combatTraitText() {
      return CombatTraitText
    },
    weapons: function () {
      return this.$store.getters.getFilteredWeapons('Natural', this.selectedType)
    },
    use_duo() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-duo'
    },
    getSizeTraits() {
      return this.$store.getters.getTraitsByTagAndCost('Size', 'None')
    },
    use_single() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-single'
    },
    num_cols() {
      if (this.isMobile) {
        return 12
      }
      return 4
    },
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.centered-single {
  justify-content: center;
  margin: auto;
  width: 33.33%;
}
.centered-duo {
  justify-content: center;
  margin: auto;
  width: 66.66%;
}
.spirit-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.spirit-tab-content {
  background-color: $color--background !important;
}
.spirit-box--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  padding-bottom: $space--xs;
}
.spirit-box--type {
  font-family: $font--fancy !important;
}
.spirit-box--header {
  padding-top: $space--xs;
  text-align: center;
  color: black;
}
.spirit-box--underline-top {
  border-bottom: 5px solid black;
}
.spirit-box--content {
  color: black;
  padding: $space--xs;
}
.spirit-box--text-format {
  font-size: $font-size--m;
}
.spirit-box--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
