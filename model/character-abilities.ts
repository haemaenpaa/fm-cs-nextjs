/**
 * Data structure to contain a character's abilities.
 */
export default interface CharacterAbilities {
  br: number;
  dex: number;
  vit: number;
  int: number;
  cun: number;
  res: number;
  pre: number;
  man: number;
  com: number;
}

export function abilityModifier(score: number) {
  return Math.floor((score - 10) / 2);
}
