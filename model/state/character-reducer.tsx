import Character from "../character";
import { Skill } from "../skill";

export interface CharacterAction {
  type: "useFetched" | "ability" | "skill" | "addSkill" | "removeSkill"; //Type of the action
  specifier: string; //Specific target of the action, e.g. skill ID
  numericValue?: number; //Number value of the action
  stringValue?: string;
  stringList?: string[];
  override?: Character; //Used to set the new character.
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
      if (action.specifier in current.defaultSkills) {
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
          customSkills: current.customSkills.map((skl: Skill) =>
            skl.identifier === action.specifier
              ? ({
                  ...skl,
                  name: action.stringValue || skl.name,
                  rank: action.numericValue,
                  defaultAbilities: action.stringList
                    ? action.stringList
                    : skl.defaultAbilities,
                } as Skill)
              : skl
          ),
        };
      }
    case "addSkill":
      return {
        ...current,
        customSkills: [
          ...current.customSkills,
          {
            identifier: action.specifier,
            name: action.stringValue,
            rank: action.numericValue || 0,
            defaultAbilities: action.stringList || [],
          },
        ],
      };
    case "removeSkill":
      return {
        ...current,
        customSkills: current.customSkills.filter(
          (s) => s.identifier !== action.specifier
        ),
      };
    default:
      console.error(`Action type ${action.type} not recognized`);
      return current;
  }
}
