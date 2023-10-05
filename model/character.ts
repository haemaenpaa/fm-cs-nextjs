import { Ability } from "./ability";
import { AoSelection } from "./ao-selection";
import CharacterAbilities from "./character-abilities";
import CharacterAttack from "./character-attack";
import { CharacterSpells } from "./character-spells";
import { SKILL_DEFAULT_ABILITIES } from "./constants";
import { Race } from "./race";
import Resistance from "./resistance";
import { Skill } from "./skill";
import CharacterHitDice from "./character-hit-dice";
import { InventoryContainer } from "./item";
import { CharacterBiography } from "./character-bio";
import { CharacterResource } from "./character-resource";

export interface AbilityNumberStruct {
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

/**
 * A single character model, that encapsulates everything contained in a character sheet.
 *
 */
export default interface Character {
  id?: number;
  /**
   * Abilities; brawn, dexterity etc.
   */
  abilities: CharacterAbilities;
  /**
   * The default skills, always displayed on the character sheet.
   */
  defaultSkills: {
    anh: number;
    ath: number;
    dec: number;
    emp: number;
    inv: number;
    lea: number;
    med: number;
    occ: number;
    perc: number;
    pers: number;
    sub: number;
    ste: number;
    sur: number;
  };

  /**
   * Current hit point total.
   */
  hitPointTotal: number;
  /**
   * Temporary hit points.
   */
  tempHitPoints: number;
  /**
   * Currently available hit dice.
   */
  hitDiceRemaining: CharacterHitDice;
  name: string;
  race: Race;
  speed: number;
  selections: AoSelection[];
  customSkills: Skill[];
  savingThrows: string[];
  armorValue: number;
  hitPointMaximum: number;
  damageResistances: Resistance[];
  statusResistances: Resistance[];
  spells: CharacterSpells;
  attacks: CharacterAttack[];
  hitDice: CharacterHitDice;
  inventory: InventoryContainer[];
  biography: CharacterBiography;
  resources: CharacterResource[];
}
