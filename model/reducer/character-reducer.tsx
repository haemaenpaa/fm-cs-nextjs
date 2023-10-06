import Character from "../character";

export interface CharacterAction {
  type: "useFetched" | "ability" | "skill";
  specifier: string;
  numericValue?: number;
  override?: Character;
}
export function reduceCharacter(current: Character, action: CharacterAction) {
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
    default:
      console.error(`Action type ${action.type} not recognized`);
      return current;
  }
}
