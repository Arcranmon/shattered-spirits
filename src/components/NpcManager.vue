<template>
  <div style="margin-top: 1em">
    <v-row
      justify="center"
      class="background--color">
      <v-col
        cols="2"
        class="sidebar">
        <div
          v-for="(npc, index) in npcs"
          :key="index"
          class="button--spacing">
          <v-btn
            fill-height
            class="button--template"
            @click=";(selectedNpc = npc), (selectedIndex = index)">
            <span style="margin: 2px"> {{ npc.Name }} - {{ npc.Tag }} </span>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="10">
        <v-row class="topbar">
          <v-btn
            @click="applyRespiteToAll"
            class="button--template button--topbar"
            style="width: 25%">
            <span class="btn-content">Apply Respite to All</span>
          </v-btn>
          <v-btn
            @click="resetAllToDefault"
            class="button--template button--topbar"
            style="width: 25%">
            <span class="btn-content">Reset All to Default</span>
          </v-btn>
          <v-dialog
            v-model="addNpcDialog"
            hide-overlay>
            <template v-slot:activator="{}">
              <v-btn
                @click="addNpcDialog = true"
                class="button--template button--topbar"
                style="width: 25%">
                <span class="btn-content">Add NPC</span>
              </v-btn>
            </template>
            <v-card height="50vh">
              <v-card-title>Add NPC</v-card-title>
              <v-card-text>
                <v-select
                  v-model="npcToAdd"
                  :items="npcOptions"
                  item-text="Name"
                  return-object
                  attach
                  label="Selected NPC"
                  filled
                  outlined
                  style="margin-left: 0.5em; margin-right: 0.5em">
                </v-select>
                <v-btn
                  color="button--template"
                  @click="addNpc(), (addNpcDialog = false)">
                  <span style="margin: 2px">Add NPC</span>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-btn
            v-if="selectedNpc != null"
            @click="deleteNpc"
            class="button--template button--topbar"
            style="width: 25%">
            <span class="btn-content">Delete NPC</span>
          </v-btn>
        </v-row>
        <show-npc
          v-if="npcSelected"
          :npc="selectedNpc"
          @changed="saveNpc"
          :key="selectedNpc.Name" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { NpcManagementStore } from '@/store'
import { Npc } from '@/class'
import ShowNpc from '@/components/ShowNpc.vue'

export default Vue.extend({
  name: 'npc-box',
  components: { ShowNpc },
  data() {
    return {
      npcToAdd: null,
      selectedNpc: null,
      selectedIndex: 0,
      addNpcDialog: false,
      deleteDialog: false,
    }
  },
  methods: {
    addNpc() {
      const store = getModule(NpcManagementStore, this.$store)
      this.npcToAdd.Tag = store.GetNextTag(this.npcToAdd.Name)
      this.npcToAdd.ResetDefault()
      store.AddNpc(this.npcToAdd)
      store.SaveNpcs()
      this.addNpcDialog = false
    },

    deleteNpc() {
      const store = getModule(NpcManagementStore, this.$store)
      store.DeleteNpc(this.selectedIndex)
      this.selectedNpc = null
      this.deleteDialog = false
      store.SaveNpcs()
    },

    saveNpc() {
      const store = getModule(NpcManagementStore, this.$store)
      store.SaveNpcs()
    },

    applyRespiteToAll() {
      const store = getModule(NpcManagementStore, this.$store)
      for (var npc of this.npcs) {
        npc.ApplyRespite()
      }
      store.SaveNpcs()
    },

    resetAllToDefault() {
      const store = getModule(NpcManagementStore, this.$store)
      for (var npc of this.npcs) {
        npc.ResetDefault()
      }
      store.SaveNpcs()
    },
  },
  computed: {
    npcSelected: function () {
      return this.selectedNpc != null
    },
    npcOptions: function () {
      return this.$store.getters.getNpcs()
    },
    npcs() {
      const store = getModule(NpcManagementStore, this.$store)
      store.loadNpc()
      return store.AllNpcs
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
