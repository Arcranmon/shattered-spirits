<template>
  <span>
    <div class="button-separator">
      <display-tooltip-text :string="spiritSubtypeText" />
      <v-layout justify-center
        ><v-btn large tile color="success" @click="$emit('chose-subtype')" style="margin-top: 1em" :disabled="!character.Spirit.HasSubtype" :key="tracker">
          <span v-if="!character.Spirit.HasSubtype">CHOOSE YOUR SPIRIT SUBTYPE</span>
          <span v-else>CHOOSE {{ character.Spirit.Subtype.Name }}</span>
        </v-btn></v-layout
      >
    </div>
    <div>
      <v-row
        ><v-col cols="6" class="element-box" v-for="subtype in subtypes" :key="subtype.Name">
          <div>
            <i><display-tooltip-text :string="$store.getters.getGlossaryItem(subtype.Name)" /></i>
          </div>
          <v-btn
            v-bind:class="subtype.Name"
            large
            tile
            :disabled="character.Spirit.HasSubtype && character.Spirit.Subtype.Name == subtype.Name"
            @click="setSubtype(subtype)"
            style="margin-top: 1em"
          >
            <img class="image--icon-size image--left" :src="artSymbol(subtype.Name)" />{{ subtype.Name }}
            <img class="image--icon-size image--right" :src="artSymbol(subtype.Name)" /></v-btn></v-col
      ></v-row>
      <div v-if="character.Spirit.HasSubtype" :key="character.Spirit.Subtype.Name">
        <div class="page--description table--top" style="width: 100%">
          <i><display-tooltip-text style="margin-left: 1em; margin-right: 1em" class="page--description" :string="art.Flavor" /></i><br />
          <display-tooltip-text style="margin-left: 1em; margin-right: 1em" class="page--description" :string="art.TagsHeader" /><br />
          <display-tooltip-text style="margin-left: 1em; margin-right: 1em" class="page--description" :string="art.Mechanics" /><br />
        </div>
        <div class="page--description" style="margin-bottom: 1em; margin-top: 2em">
          If you choose the {{ character.Spirit.Subtype.Name }} Subtype, your spirit gains the following abilities:
        </div>
        <v-row justify="center">
          <v-col :cols="num_cols"><subtype-card :type="character.Spirit.Subtype" /></v-col>
        </v-row>
        <div class="page--description" style="margin-bottom: 1em; margin-top: 1em">
          If you choose the {{ character.Spirit.Subtype.Name }} Subtype, you and your spirit gain the following four abilities:
        </div>
        <div class="body">
          <v-row justify="center"
            ><v-col :cols="num_cols" v-for="tech in art.Tier1Techniques" :key="tech.Name"><tech-card :tech="tech" /></v-col
            ><v-col :cols="num_cols" v-for="attack in art.Tier1Attacks" :key="attack.Name"><weapon-widget :attack="attack" /></v-col
            ><v-col :cols="num_cols" v-for="man in art.Tier1Maneuvers" :key="man.Name"><maneuver-card :maneuver="man" :format_text="true" /></v-col
          ></v-row>
        </div>
        <div class="body">
          <v-row justify="center"
            ><v-col :cols="num_cols" v-for="stance in art.Tier2Stances" :key="stance.Name"><stance-card :stance="stance" /></v-col>
            <v-col :cols="num_cols" v-for="attack in art.Tier2Attacks" :key="attack.Name"><weapon-widget :attack="attack" /></v-col
            ><v-col :cols="num_cols" v-for="tech in art.Tier2Techniques" :key="tech.Name"><tech-card :tech="tech" /></v-col
            ><v-col :cols="num_cols" v-for="man in art.Tier2Maneuvers" :key="man.Name"><maneuver-card :maneuver="man" :format_text="true" /></v-col
          ></v-row>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character } from '@/class'
import SpiritSubtypeText from '@/database/text_files/character_creation/choosing_your_subtype.txt'
import ManeuverCard from '@/components/cards/ManeuverCard'
import TechCard from '@/components/cards/TechCard'
import WeaponWidget from '@/components/cards/WeaponWidget'
import SpiritTypeCard from '@/components/cards/SpiritTypeCard'
export default Vue.extend({
  name: 'subtype-selection',
  components: { ManeuverCard, TechCard, WeaponWidget, SpiritTypeCard },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => ({
    tracker: 1,
  }),
  methods: {
    setSubtype(variable) {
      this.character.ClearSpiritAbilities()
      this.character.Spirit.Subtype = variable
      this.character.AddArt(this.art)
      this.character.AddArt(this.art)
      this.tracker++
    },
    artSymbol: function (art) {
      return require('@/assets/disciplines/' + art + '.svg')
    },
  },
  computed: {
    art: function () {
      return this.$store.getters.getArt('Basic ' + this.character.Spirit.Subtype.Name + ' Arts')
    },
    spiritSubtypeText: function () {
      return SpiritSubtypeText
    },
    subtypes: function () {
      return this.$store.getters.getSpiritTypesByElement(this.character.Element)
    },
    num_cols: function () {
      if (this.isMobile) return 12
      if (this.art.Tier1Techniques.length == 0) return 4
      return 4
    },
    subtype_width: function () {
      if (this.isMobile) return 1.0
      return 1 / 3
    },
  },
})
</script>

<style scoped lang="scss">
.character-creation {
  font-size: smaller;
}
.button-separator {
  margin-bottom: 1em;
}
.element-box {
  text-align: center;
}
.table--top {
  width: 100%;
  margin-top: 2em;
  padding-top: 2em;
  border-top: 5px solid black;
}
</style>
