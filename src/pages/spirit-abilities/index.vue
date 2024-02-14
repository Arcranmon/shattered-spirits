<template
  ><div class="background">
    <h2>Spirit Abilities</h2>
    <p style="text-align: center; width: 100%;">
      You can do a great deal to specialize your spirit, from choosing its physical form to deciding what type of magic it is most aligned with. The below tabs
      show the different spirit options available at character creation, as well as an additional tab showing natural weapons such as claws and fangs that
      spirits may choose from.
    </p>
    <br />
    <v-tabs v-model="tab" class="spirit-tabs" background-color="#b69e75" color="black" centered
      ><v-tab> <h4>Earth</h4> </v-tab><v-tab> <h4>Flame</h4> </v-tab><v-tab> <h4>Water</h4> </v-tab><v-tab> <h4>Wind</h4> </v-tab
      ><v-tab> <h4>Combat Traits</h4> </v-tab><v-tab> <h4>Natural Weapons</h4> </v-tab></v-tabs
    >
    <v-tabs-items v-model="tab" class="spirit-tab-content">
      <v-tab-item>
        <display-tooltip-text style="margin: 1em;" :string="earthText" /><br /><br />
        <h4>Earth Spirit Types</h4>
        <display-tooltip-text
          class="description-text"
          string="Your Spirit reflects your expertise in magic. Your spirit gets one of the below, based on your starting Spirit Discipline:"
        />
        <v-row style="padding: 1em;"
          ><v-col :cols="4" v-for="item in ['Land', 'Mountain']" :key="item">
            <spirit-type-card :type="$store.getters.getSpiritType(item)" :header_color="item" /></v-col
        ></v-row>
        <h4>Earth Spirit Forms</h4>
        <display-tooltip-text
          class="description-text"
          string="Choose one of the below, which represents the physical form your spirit takes when summoned:"
        /><v-row style="padding: 1em;">
          <v-col :cols="4" v-for="item in ['Swift Earth Spirit', 'Balanced Earth Spirit', 'Heavy Earth Spirit']" :key="item">
            <spirit-form-card :form="$store.getters.getSpiritForm(item)" header_color="Earth" /></v-col
        ></v-row>
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text style="margin: 1em;" :string="flameText" /><br /><br />
        <h4>Flame Spirit Types</h4>
        <display-tooltip-text
          class="description-text"
          string="Your Spirit reflects your expertise in magic. Your spirit gets one of the below, based on your starting Spirit Discipline:"
        />
        <v-row style="padding: 1em;"
          ><v-col :cols="4" v-for="item in ['Blaze', 'Explosion']" :key="item">
            <spirit-type-card :type="$store.getters.getSpiritType(item)" :header_color="item" /></v-col
        ></v-row>
        <h4>Flame Spirit Forms</h4>
        <display-tooltip-text
          class="description-text"
          string="Choose one of the below, which represents the physical form your spirit takes when summoned:"
        /><v-row style="padding: 1em;">
          <v-col :cols="4" v-for="item in ['Swift Flame Spirit', 'Balanced Flame Spirit', 'Heavy Flame Spirit']" :key="item">
            <spirit-form-card :form="$store.getters.getSpiritForm(item)" header_color="Flame" /></v-col
        ></v-row>
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text style="margin: 1em;" :string="waterText" /><br /><br />
        <h4>Water Spirit Types</h4>
        <display-tooltip-text
          class="description-text"
          string="Your Spirit reflects your expertise in magic. Your spirit gets one of the below, based on your starting Spirit Discipline:"
        />
        <v-row style="padding: 1em;"
          ><v-col :cols="4" v-for="item in ['Tide', 'Frost']" :key="item">
            <spirit-type-card :type="$store.getters.getSpiritType(item)" :header_color="item" /></v-col
        ></v-row>
        <h4>Water Spirit Forms</h4>
        <display-tooltip-text
          class="description-text"
          string="Choose one of the below, which represents the physical form your spirit takes when summoned:"
        /><v-row style="padding: 1em;">
          <v-col :cols="4" v-for="item in ['Swift Water Spirit', 'Balanced Water Spirit', 'Heavy Water Spirit']" :key="item"
            ><spirit-form-card :form="$store.getters.getSpiritForm(item)" header_color="Water" /></v-col
        ></v-row>
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text style="margin: 1em;" :string="earthText" /><br /><br />
        <h4>Wind Spirit Types</h4>
        <display-tooltip-text
          class="description-text"
          string="Your Spirit reflects your expertise in magic. Your spirit gets one of the below, based on your starting Spirit Discipline:"
        />
        <v-row style="padding: 1em;"
          ><v-col :cols="4" v-for="item in ['Gale', 'Storm']" :key="item">
            <spirit-type-card :type="$store.getters.getSpiritType(item)" :header_color="item" /></v-col
        ></v-row>
        <h4>Wind Spirit Forms</h4>
        <display-tooltip-text
          class="description-text"
          string="Choose one of the below, which represents the physical form your spirit takes when summoned:"
        /><v-row style="padding: 1em;">
          <v-col :cols="4" v-for="item in ['Swift Wind Spirit', 'Balanced Wind Spirit', 'Heavy Wind Spirit']" :key="item">
            <spirit-form-card :form="$store.getters.getSpiritForm(item)" header_color="Wind" /></v-col
        ></v-row>
      </v-tab-item>
      <v-tab-item> <display-tooltip-text style="margin: 1em;" :string="combatTraitText" /><br /><br /></v-tab-item>
      <v-tab-item>
        <display-tooltip-text style="margin: 1em;" :string="spiritWeaponText" /><br /><br />
        <v-row align="center" style="margin-left: 0.5em; margin-top: 1em;">
          <v-col cols="2"><v-select v-model="selectedSpeed" :items="weaponSpeeds" attach label="Weapon Speed" filled outlined></v-select></v-col
          ><v-col cols="2"><v-select v-model="selectedType" :items="weaponTypes" attach label="Weapon Type" filled outlined></v-select></v-col
        ></v-row>
        <v-row class="page" style="margin-bottom: 1em;">
          <v-col cols="auto" class="sidebar">
            <v-btn-toggle borderless overflow-auto
              ><div v-for="weapon in weapons" style="width: 100%;" v-bind:key="weapon.Name">
                <v-btn @click="selectedWeapon = weapon" class="button--style" depressed tile block>
                  <img class="image--icon-size" :src="weapon.Icon" />{{ weapon.Name }}
                </v-btn>
              </div>
            </v-btn-toggle></v-col
          >
          <v-col> <attack-card v-if="selectedWeapon != null" :attack="selectedWeapon" style="width: 40em;" :key="selectedWeapon.Name" /></v-col> </v-row
      ></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import EarthText from '@/database/text_files/spirit_mechanics/earth.txt'
import WaterText from '@/database/text_files/spirit_mechanics/water.txt'
import FlameText from '@/database/text_files/spirit_mechanics/flame.txt'
import SpiritWeaponText from '@/database/text_files/spirit_mechanics/spirit_weapons.txt'
import CombatTraitText from '@/database/text_files/spirit_mechanics/combat_traits.txt'
import SpiritFormCard from '@/components/cards/SpiritFormCard.vue'
import SpiritTypeCard from '@/components/cards/SpiritTypeCard.vue'
import MovementCard from '@/components/cards/MovementCard.vue'
import AttackCard from '@/components/cards/AttackCard'
import { store } from '@/store'
export default Vue.extend({
  name: 'spirit-abilities',
  data() {
    return {
      tab: null,
      weaponSpeeds: ['Any', 1, 2, 3, 4, 5, 6, 7, 8],
      selectedSpeed: 'Any',
      weaponTypes: ['Any', 'Light', 'Versatile', 'Heavy'],
      selectedType: 'Any',
      selectedWeapon: null,
    }
  },
  components: {
    ShowCards,
    AttackCard,
    MovementCard,
    SpiritFormCard,
    SpiritTypeCard,
  },
  computed: {
    earthText() {
      return EarthText
    },
    waterText() {
      return WaterText
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
      return this.$store.getters.getFilteredWeapons('Natural', this.selectedSpeed, this.selectedType).sort((a, b) => a.Speed > b.Speed)
    },
    use_duo() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-duo'
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
      return 6
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
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
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
  height: 100%;
  padding-bottom: $space--xs;
}
.spirit-box--type {
  font-family: $font--fancy !important;
}
.spirit-box--header {
  padding-top: $space--xs;
  height: 100%;
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
