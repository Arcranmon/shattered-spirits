<template>
  <v-row justify="center">
    <v-col cols="2" class="sidebar">
      <div v-for="(character, index) in characters" :key="index" class="button--spacing">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="button--template"
              @click=";(selectedCharacter = character), (characterSelected = true), (selectedIndex = index)"
              v-bind="attrs"
              v-on="on"
              ><span>{{ character.Name }}</span></v-btn
            >
          </template>
          {{ character.Name }} and {{ character.SpiritName }} the {{ character.SpiritType }} Spirit
        </v-tooltip>
      </div> </v-col
    ><v-col cols="10">
      <span class="topbar">
        <span v-if="characterSelected" class="hidden--topbar">
          <v-dialog v-model="deleteDialog" hide-overlay>
            <template v-slot:activator="{}">
              <v-btn @click="deleteDialog = true" class="button--template button--topbar"> Delete {{ selectedCharacter.Name }} </v-btn>
            </template>
            <v-card>
              <v-card-title>Are You Sure?</v-card-title>
              <v-card-text>
                Are you sure you want to delete this character? This cannot be undone! <br /><br />
                <v-flex>
                  <div class="text-xs-center">
                    <v-btn color="button--template" @click="deleteCharacter(), (characterSelected = false)"> Delete {{ selectedCharacter.Name }} </v-btn>
                  </div>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-btn @click="exportCharacter" class="button--template button--topbar"> Export {{ selectedCharacter.Name }} </v-btn>
        </span>
        <v-dialog v-model="characterImportDialog" hide-overlay>
          <template v-slot:activator="{}">
            <v-btn @click="characterImportDialog = true" class="button--template button--topbar"> Import Character </v-btn>
          </template>
          <v-card>
            <v-card-title>Import Character From File</v-card-title>
            <v-card-text>
              <v-file-input truncate-length="15" accept=".json" v-model="importFile"></v-file-input>
              <v-btn color="button--template" @click="importCharacter(), (characterImportDialog = false)"> Import Character </v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </span>
      <show-character v-if="characterSelected" :character="(selectedCharacter)" @changed="saveCharacter"
    /></v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import ShowCharacter from '@/components/ShowCharacter.vue'

export default Vue.extend({
  name: 'character-box',
  components: { ShowCharacter },
  props: {
    characters: {
      type: Array[Character],
      required: true,
    },
  },
  data() {
    return {
      importFile: null,
      selectedCharacter: new Character(),
      characterSelected: false,
      characterImportDialog: false,
      selectedIndex: 0,
      deleteDialog: false,
    }
  },
  methods: {
    deleteCharacter() {
      const store = getModule(CharacterManagementStore, this.$store)
      store.DeleteCharacter(this.selectedIndex)
      this.deleteDialog = false
    },
    saveCharacter() {
      const store = getModule(CharacterManagementStore, this.$store)
      store.SaveCharacters()
    },
    exportCharacter() {
      // credit: https://www.bitdegree.org/learn/javascript-download
      let text = JSON.stringify(Character.Serialize(this.selectedCharacter))
      let filename = this.selectedCharacter.Name + '.json'
      let element = document.createElement('a')
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()
      document.body.removeChild(element)
    },
    importCharacter() {
      var reader = new FileReader()
      const store = getModule(CharacterManagementStore, this.$store)
      reader.onload = (e) => {
        var fileData = JSON.parse(e.target.result)
        var char = Character.Deserialize(fileData)
        store.AddCharacter(char)
      }
      reader.readAsText(this.importFile)
    },
  },
})
</script>

<style scoped lang="scss">
.button--template {
  border: 5px double black;
  border-radius: 10px;
  font-family: $font--fancy;
  font-size: $font-size--m;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  height: 100%;
  width: 100%;
}
.button--topbar {
  width: 25%;
}
.button--spacing {
  margin-top: 1em;
  margin-bottom: 1em;
}
.topbar {
  padding: $space--s;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: right;
  height: 3em;
  margin-left: 1em;
  margin-right: 1em;
  width: 95%;
}
.hidden--topbar {
  width: 100%;
}
.sidebar {
  background: $color--light-parchment;
  padding: $space--m;
  border-right: 5px double black;
  margin-top: 3em;
}
</style>
