<template>
  <span v-if="isMobile"
    ><v-select
      v-model="selectedCharacter"
      :items="characters"
      item-text="Name"
      return-object
      attach
      label="Select a Character"
      filled
      outlined
      style="margin: 0.5em" />
    <v-row justify="center" style="display: flex; flex-direction: column">
      <v-col cols="12">
        <v-row class="topbar"
          ><v-col cols="4" class="d-flex" style="flex-direction: column">
            <v-dialog v-model="characterImportDialog" hide-overlay>
              <template v-slot:activator="{}">
                <v-btn @click="characterImportDialog = true" class="button--template button--topbar"> <span class="btn-content">Import Character</span></v-btn>
              </template>
              <v-card>
                <v-card-title>Import Character From File</v-card-title>
                <v-card-text>
                  <v-file-input accept=".json" v-model="importFile" />
                  <v-btn color="button--template" @click="importCharacter(), (characterImportDialog = false)">
                    <span style="margin: 2px">Import Character</span>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="4" v-if="characterSelected">
            <v-dialog v-model="deleteDialog" hide-overlay>
              <template v-slot:activator="{}">
                <v-btn @click="deleteDialog = true" class="button--template button--topbar">
                  <span class="btn-content">Delete {{ selectedCharacter.Name }}</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Are You Sure?</v-card-title>
                <v-card-text>
                  Are you sure you want to delete this character? This cannot be undone! <br /><br />
                  <v-flex>
                    <div class="text-xs-center">
                      <v-btn color="button--template" @click="deleteCharacter()">
                        <span class="btn-content">Delete {{ selectedCharacter.Name }}</span>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="4" v-if="characterSelected">
            <v-btn @click="exportCharacter" class="button--template button--topbar">
              <span class="btn-content">Export {{ selectedCharacter.Name }}</span>
            </v-btn>
          </v-col>
        </v-row>
        <show-character v-if="characterSelected" :character="selectedCharacter" @changed="saveCharacter"
      /></v-col> </v-row
  ></span>
  <div v-else style="margin-top: 1em">
    <v-row justify="center" class="background--color">
      <v-col cols="2" class="sidebar">
        <div v-for="(character, index) in characters" :key="index" class="button--spacing">
          <v-btn fill-height class="button--template" @click=";(selectedCharacter = character), (selectedIndex = index)"
            ><span v-if="character.Spirit.Subtype != undefined" style="margin: 2px">
              {{ character.Name }} and {{ character.Spirit.Name }} the {{ character.Spirit.Subtype.Name }} Spirit</span
            ></v-btn
          >
        </div> </v-col
      ><v-col cols="10">
        <v-row class="topbar"
          ><v-col cols="4" class="d-flex" style="flex-direction: column">
            <v-dialog v-model="characterImportDialog" hide-overlay>
              <template v-slot:activator="{}">
                <v-btn @click="characterImportDialog = true" class="button--template button--topbar"> <span class="btn-content">Import Character</span></v-btn>
              </template>
              <v-card>
                <v-card-title>Import Character From File</v-card-title>
                <v-card-text>
                  <v-file-input accept=".json" v-model="importFile" />
                  <v-btn color="button--template" @click="importCharacter(), (characterImportDialog = false)">
                    <span style="margin: 2px">Import Character</span>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="4" v-if="characterSelected">
            <v-dialog v-model="deleteDialog" hide-overlay>
              <template v-slot:activator="{}">
                <v-btn @click="deleteDialog = true" class="button--template button--topbar">
                  <span class="btn-content">Delete {{ selectedCharacter.Name }}</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Are You Sure?</v-card-title>
                <v-card-text>
                  Are you sure you want to delete this character? This cannot be undone! <br /><br />
                  <v-flex>
                    <div class="text-xs-center">
                      <v-btn color="button--template" @click="deleteCharacter()">
                        <span class="btn-content">Delete {{ selectedCharacter.Name }}</span>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="4" v-if="characterSelected">
            <v-btn @click="exportCharacter" class="button--template button--topbar">
              <span class="btn-content">Export {{ selectedCharacter.Name }}</span>
            </v-btn>
          </v-col>
        </v-row>
        <show-character v-if="characterSelected" :character="selectedCharacter" @changed="saveCharacter" :key="selectedCharacter.Name"
      /></v-col>
    </v-row>
  </div>
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
      importFile: [],
      uploadedChar: null,
      selectedCharacter: null,
      characterImportDialog: false,
      selectedIndex: 0,
      deleteDialog: false,
    }
  },
  methods: {
    deleteCharacter() {
      const store = getModule(CharacterManagementStore, this.$store)
      store.DeleteCharacter(this.selectedIndex)
      this.selectedCharacter = null
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
      if (this.importFile === null || this.importFile === undefined || this.importFile.length === 0) {
        alert('Please select a file to create a character from!')
        return
      }
      var reader = new FileReader()
      const store = getModule(CharacterManagementStore, this.$store)
      reader.onload = (e) => {
        let fileData = JSON.parse(e.target.result)
        var char = Character.Deserialize(fileData)
        store.AddCharacter(char)
      }
      reader.readAsText(this.importFile)
    },
  },
  computed: {
    characterSelected: function () {
      return this.selectedCharacter != null
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
  white-space: normal;
  display: inline-block;
}
.button--topbar {
  width: 33%;
}
.button--spacing {
  margin-top: 1em;
  margin-bottom: 1em;
}
.topbar {
  padding: $space--s;
  padding-top: 0.5em;
  display: inline-flex;
  align-items: center;
  margin-left: 1em;
  margin-right: 1em;
  width: 95%;
}
.sidebar {
  background: $color--light-parchment;
  padding: $space--m;
  border-right: 5px double black;
  margin-top: 3em;
}
.btn-content {
  margin: 2px;
  height: 2.5em;
  text-align: center;
  display: flex;
  align-items: center;
}
.v-btn__content {
  white-space: normal;
  word-wrap: break-word;
  display: inline-flex;
}
.v-btn {
  height: 100% !important;
  width: 100%;
}
</style>
