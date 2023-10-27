import Character from "../character";
import { Skill } from "../skill";

export interface CharacterAction {
  type: "useFetched" | "ability" | "skill";
  specifier: string;
  numericValue?: number;
  override?: Character;
}
export function reduceCharacter(
  current: Character,
  action: CharacterAction
): Character {
  switch (action.type) {
    case "useFetched":
      return action.override!;
    case "ability":
      return {
        ...current,
        abilities: {
          ...current.abilities,
          [action.specifier]: action.numericValue,
        },
      };
    case "skill":
      console.log("Skill action", action);
      if (action.specifier in current.defaultSkills) {
        console.log(`Custom skill ${action.specifier}`);
        return {
          ...current,
          defaultSkills: {
            ...current.defaultSkills,
            [action.specifier]: action.numericValue,
          },
        };
      } else {
        return {
          ...current,
          customSkills: current.customSkills.map((s: Skill) =>
            s.identifier === action.specifier
              ? ({ ...s, rank: action.numericValue } as Skill)
              : s
          ),
        };
      }
    default:
      console.error(`Action type ${action.type} not recognized`);
      return current;
  }
}
