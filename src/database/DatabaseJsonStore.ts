import Data from "@/database/database.json";
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { Discipline, Technique } from "@/class";

@Module({
  name: "databaseJson",
})
export class DatabaseJsonStore extends VuexModule {
  get byCategory(): any {
    return (category: string) => {
      return Data.filter(
        (x) => x.category.trim() === category.trim()
      ).map((x) => Discipline.Deserialize(<IDisciplineData>x));
    };
  }
}
