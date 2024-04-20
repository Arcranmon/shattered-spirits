import { Npc } from '@/class'
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'

function saveNpc(npcs: Npc[]) {
  const stringed = JSON.stringify(npcs.map((x) => Npc.Serialize(x)))
  localStorage.setItem('npcs.json', stringed)
}

@Module({
  name: 'npc-management',
})
export class NpcManagementStore extends VuexModule {
  public Npcs: Npc[] = []

  public get AllNpcs(): Npc[] {
    return this.Npcs
  }

  public get GetNextTag(): any {
    return (name: string) => {
      var count = 0
      for (var npc of this.AllNpcs) {
        if (name == npc.Name) count = Math.max(count, npc.Tag + 1)
      }
      return count
    }
  }

  @Mutation
  private LoadNpc(npcData: string): void {
    var tempData = JSON.parse(npcData)
    this.Npcs = tempData.map((x) => Npc.Deserialize(x))
  }

  @Action
  public DeleteNpc(index: number): void {
    this.AllNpcs.splice(index, 1)
    saveNpc(this.AllNpcs)
  }

  @Action
  public AddNpc(npc: Npc): void {
    this.AllNpcs.push(npc)
    saveNpc(this.AllNpcs)
  }

  @Action({ rawError: true })
  public SaveNpcs(): void {
    saveNpc(this.AllNpcs)
  }

  @Action
  public async loadNpc() {
    var npcs = localStorage.getItem('npcs.json')
    if (npcs) this.LoadNpc(npcs)
  }
}
