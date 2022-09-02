import { Character } from "@/class";
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";

function saveCharacters(characters: Character[]) {
  const stringed = JSON.stringify(
    characters.map((x) => Character.Serialize(x))
  );
  localStorage.setItem("characters.json", stringed);
}

@Module({
  name: "character-management",
})
export class CharacterManagementStore extends VuexModule {
  public Characters: Character[] = [];

  public get AllCharacters(): Character[] {
    return this.Characters;
  }

  @Mutation
  private LoadCharacter(characterData: string): void {
    var tempData = JSON.parse(characterData);
    this.Characters = tempData.map((x) => Character.Deserialize(x));
  }

  @Action
  public DeleteCharacter(index: number): void {
    this.AllCharacters.splice(index, 1);
    saveCharacters(this.AllCharacters);
  }

  @Action
  public AddCharacter(character: Character): void {
    this.AllCharacters.push(character);
    saveCharacters(this.AllCharacters);
  }

  @Action({ rawError: true })
  public SaveCharacters(): void {
    saveCharacters(this.AllCharacters);
  }

  @Action
  public async loadCharacter() {
    this.LoadCharacter(localStorage.getItem("characters.json"));
  }
}
