<template>
  <v-container fluid>
    <v-tabs fixed-tabs v-model="stepper" height="4em" color="black">
      <v-tab>
        <h4>Spirit Type</h4>
      </v-tab>
      <v-tab>
        <h4>Spirit Subtype</h4>
      </v-tab>
      <v-tab>
        <h4>Spirit Customization</h4>
      </v-tab>
      <v-tab>
        <h4>Disciplines</h4>
      </v-tab>
      <v-tab>
        <h4>Equipment</h4>
      </v-tab>
      <v-tab>
        <h4>Name</h4>
      </v-tab>
      <v-tab>
        <h4>Preview</h4>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="stepper">
      <v-tab-item :eager="true" class="builder--body"><spirit-selection :character="character" @chose-spirit="stepper++" /> </v-tab-item>
      <v-tab-item :eager="true" class="builder--body"><subtype-selection :character="character" @chose-subtype="stepper++" /> </v-tab-item>
      <v-tab-item :eager="true" class="builder--body"><spirit-customization :character="character" @customized="stepper++" /> </v-tab-item>
      <v-tab-item :eager="true" class="builder--body"><discipline-selection :character="character" @chose-discipline="stepper++" /></v-tab-item>
      <v-tab-item :eager="true" class="builder--body"><equipment-selection :character="character" @chose-equipment="stepper++" /> </v-tab-item>
      <v-tab-item :eager="true" class="builder--body"
        ><name-selection :character="character" @chose-names="stepper++, this.character.ResetDefault" /></v-tab-item
      ><v-tab-item :eager="true" class="builder--body">
        <v-layout style="margin-top: 1em; width: 100%" justify-center>
          <v-btn color="success" large tile @click="saveCharacter()" :disabled="!character.Complete">
            <span v-if="!character.Complete">You must finish making your character!</span>
            <span v-else>SAVE {{ character.Name }} AND {{ character.Spirit.Name }}</span></v-btn
          ></v-layout
        ><show-character v-if="character.Complete" :character="character" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import SpiritSelection from '@/components/character-creation/SpiritSelection.vue'
import SubtypeSelection from '@/components/character-creation/SubtypeSelection.vue'
import SpiritCustomization from '@/components/character-creation/SpiritCustomization.vue'
import DisciplineSelection from '@/components/character-creation/DisciplineSelection.vue'
import EquipmentSelection from '@/components/character-creation/EquipmentSelection.vue'
import NameSelection from '@/components/character-creation/NameSelection.vue'
import ShowCharacter from '@/components/ShowCharacter.vue'
export default Vue.extend({
  name: 'character-creator',
  components: {
    DisciplineSelection,
    NameSelection,
    SpiritCustomization,
    SpiritSelection,
    SubtypeSelection,
    EquipmentSelection,
    ShowCharacter,
  },
  data: () => ({
    stepper: 0,
    character: {},
  }),
  created() {
    this.character = new Character()
  },
  methods: {
    updateCharacter(variable) {
      this.character = variable
    },
    saveCharacter() {
      const store = getModule(CharacterManagementStore, this.$store)
      store.AddCharacter(this.character)
      this.$router.push('character-manager')
    },
  },
})
</script>

<style scoped lang="scss">
.builder--header {
  background: $color--parchment;
}
.builder--body {
  background: $color--background;
  height: 100%;
}
.no-transition .stepper__content {
  transition: none;
}
@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: flex !important;
    flex-direction: row;
  }
}
</style>
