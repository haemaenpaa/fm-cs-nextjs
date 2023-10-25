import "server-only";
import {
  AoSelectionDto,
  InventoryContainerDto,
  ItemDto,
} from "fm-transfer-model";
import { CharacterDto } from "fm-transfer-model/src/model/character";
import { AoSelection } from "../ao-selection";
import Character from "../character";
import { CharacterBuilder } from "../character-builder";
import { randomId } from "../id-generator";
import { InventoryContainer, Item } from "../item";
import { ResistanceType } from "../resistance";
import { convertAttackDto, convertAttackModel } from "./attack-mapper";
import { convertBiographyModel } from "./biography-mapper";
import { convertInventoryContainerDto } from "./inventory-mapper";
import { convertAoSelectionDto } from "./selection-mapper";
import { convertSpellBookModel } from "./spell-mapper";
import { convertResourceModel } from "./resource-mapper";
import { convertSkillModel } from "./skill-mapper";
import { convertSpellbookDto } from "./spell-mapper";

export function convertCharacterDto(dto: CharacterDto): Character {
  const builder = new CharacterBuilder();
  if (dto.name) {
    builder.setName(dto.name);
  }
  convertRace(dto, builder);

  convertAbilities(dto, builder);
  convertSpeed(dto, builder);
  convertSkills(dto, builder);
  convertSelections(dto, builder);
  builder.setArmorValue(dto.armorValue);
  if (dto.hitPointMaximum) {
    builder.setMaxHP(dto.hitPointMaximum);
  }
  convertResistances(dto, builder);

  convertSpells(dto, builder);
  convertAttacks(dto, builder);
  convertInventory(dto, builder);
  convertBio(dto, builder);
  convertResources(dto, builder);

  const ret: Character = builder.build();
  ret.id = dto.id;
  convertHp(ret, dto);
  convertHitDice(dto, ret);
  return ret;
}

export function convertCharacterModel(character: Character): CharacterDto {
  const ret: CharacterDto = {
    id: character.id,
    name: character.name,
    abilities: {
      br: character.abilities.br,
      dex: character.abilities.dex,
      vit: character.abilities.vit,
      int: character.abilities.int,
      cun: character.abilities.cun,
      pre: character.abilities.pre,
      man: character.abilities.man,
      com: character.abilities.com,
    },
    defaultSkills: { ...character.defaultSkills },
    speed: character.speed,
    hitPointTotal: character.hitPointTotal,
    hitPointMaximum: character.hitPointMaximum,
    tempHitPoints: character.tempHitPoints,
    hitDice: { ...character.hitDice },
    hitDiceRemaining: { ...character.hitDiceRemaining },
    selections: character.selections.map(convertAoSelectionModel),
    customSkills: character.customSkills.map(convertSkillModel),
    savingThrows: [...character.savingThrows],
    armorValue: character.armorValue,
    damageResistances: character.damageResistances.map((res) => ({
      type: res.type,
      value: res.value,
    })),
    statusResistances: character.statusResistances.map((res) => ({
      type: res.type,
      value: res.value,
    })),
    spells: convertSpellBookModel(character.spells),
    attacks: character.attacks.map(convertAttackModel),
    inventory: character.inventory.map(convertInventoryContainerModel),
    biography: convertBiographyModel(character.biography),
    resources: character.resources.map(convertResourceModel),
  };
  return ret;
}

function convertInventoryContainerModel(
  model: InventoryContainer
): InventoryContainerDto {
  return {
    id: model.id,
    name: model.name,
    description: model.description,
    baseWeight: model.baseWeight,
    weightMultiplierPercent: model.weightMultiplierPercent,
    contents: model.contents.map(convertItemModel),
  };
}
function convertItemModel(model: Item): ItemDto {
  return {
    id: model.id,
    name: model.name,
    description: model.description,
    weight: model.weight,
    quantity: model.quantity,
    attunement: model.attunement,
    equipped: model.equipped,
  };
}

function convertAoSelectionModel(selection: AoSelection): AoSelectionDto {
  return {
    id: selection.id,
    abilityOrigin: selection.abilityOrigin,
    level: selection.level,
    name: selection.name,
    description: selection.description,
    hilightColor: selection.hilightColor,
    isPrimary: selection.isPrimary,
    takenAtLevel: selection.takenAtLevel,
  };
}

function convertHp(ret: Character, dto: CharacterDto) {
  ret.hitPointTotal = dto.hitPointTotal || 0;
  ret.tempHitPoints = dto.tempHitPoints || 0;
}

function convertResources(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.resources) {
    builder.resources = dto.resources.map((res) => ({
      id: res.id || randomId(),
      name: res.name || "",
      current: res.current || 0,
      max: res.max || 0,
      shortRest: !!res.shortRest,
    }));
  }
}

function convertBio(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.biography) {
    const biographyDto = dto.biography;
    builder.setConcept(biographyDto.concept);
    if (biographyDto.appearance) {
      builder.setAppearance(biographyDto.appearance);
    }
    builder.setSoulMarkDescription(biographyDto.soulMarkDescription);
    if (biographyDto.characterBiography) {
      builder.setBiography(biographyDto.characterBiography);
    }
    if (biographyDto.characterConnections) {
      builder.setCharacterConnections(biographyDto.characterConnections);
    }
    if (biographyDto.height) {
      builder.setHeight(biographyDto.height);
    }
    if (biographyDto.weight) {
      builder.setWeight(biographyDto.weight);
    }
    if (dto.id) {
      builder.biography.id = dto.id;
    }
  }
}

function convertInventory(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.inventory) {
    builder.inventory = dto.inventory.map(convertInventoryContainerDto);
  }
}

function convertSpells(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.spells) {
    builder.spells = convertSpellbookDto(dto.spells);
  }
}

function convertHitDice(dto: CharacterDto, ret: Character) {
  if (dto.hitDice) {
    ret.hitDice[6] = dto.hitDice[6] || 0;
    ret.hitDice[8] = dto.hitDice[8] || 0;
    ret.hitDice[10] = dto.hitDice[10] || 0;
    ret.hitDice[12] = dto.hitDice[12] || 0;
  }
  if (dto.hitDiceRemaining) {
    ret.hitDiceRemaining[6] = dto.hitDiceRemaining[6] || 0;
    ret.hitDiceRemaining[8] = dto.hitDiceRemaining[8] || 0;
    ret.hitDiceRemaining[10] = dto.hitDiceRemaining[10] || 0;
    ret.hitDiceRemaining[12] = dto.hitDiceRemaining[12] || 0;
  }
}

function convertRace(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.race) {
    builder.setRace(dto.race.name!, dto.race.subrace);
    if (dto.race.abilities) {
      Object.keys(dto.race.abilities).forEach((name) =>
        builder.addRacialAbility(name, dto.race!.abilities[name])
      );
    }
    if (dto.race.damageResistances) {
      dto.race.damageResistances.forEach((res) =>
        builder.addRaceDmgResistance(res.value!, res.type as ResistanceType)
      );
    }
    if (dto.race.statusResistances) {
      dto.race.statusResistances.forEach((res) =>
        builder.addRaceStatusResistance(res.value!, res.type as ResistanceType)
      );
    }
    builder.setRacePowerfulBuild(!!dto.race.powerfulBuild);
  }
}

function convertAbilities(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.abilities) {
    builder.setBrawn(dto.abilities.br || 10);
    builder.setDexterity(dto.abilities.dex || 10);
    builder.setVitality(dto.abilities.vit || 10);
    builder.setIntelligence(dto.abilities.int || 10);
    builder.setCunning(dto.abilities.cun || 10);
    builder.setResolve(dto.abilities.res || 10);
    builder.setPresence(dto.abilities.pre || 10);
    builder.setManipulation(dto.abilities.man || 10);
    builder.setComposure(dto.abilities.com || 10);
  }
}

function convertSpeed(dto: CharacterDto, builder: CharacterBuilder) {
  builder.setSpeed(dto.speed || 6);
}

function convertSelections(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.selections) {
    builder.selections = dto.selections.map(convertAoSelectionDto);
  }
}

function convertSkills(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.defaultSkills) {
    builder.defaultSkills = Object.assign(
      builder.defaultSkills,
      dto.defaultSkills
    );
  }
  if (dto.customSkills) {
    dto.customSkills.forEach((skill) => {
      builder.addCustomSkill(
        skill.name!,
        skill.rank!,
        skill.defaultAbilities,
        skill.identifier
      );
    });
  }

  if (dto.savingThrows) {
    dto.savingThrows.forEach((s) => builder.addSavingThrow(s));
  }
}

function convertResistances(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.damageResistances) {
    dto.damageResistances.forEach((res) =>
      builder.addDmgResistance(res.value!, res.type! as ResistanceType)
    );
  }
  if (dto.statusResistances) {
    dto.statusResistances.forEach((res) =>
      builder.addStatusResistance(res.value!, res.type! as ResistanceType)
    );
  }
}

function convertAttacks(dto: CharacterDto, builder: CharacterBuilder) {
  if (dto.attacks) {
    builder.attacks = dto.attacks?.map(convertAttackDto) || [];
  }
}
