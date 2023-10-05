import { DamageRollDto } from "fm-transfer-model";
import { DamageRoll } from "../damage-roll";
import { RollComponent } from "../diceroll";
import { randomId } from "../id-generator";

export function convertDamageRollDto(dto: DamageRollDto): DamageRoll {
  const roll: DamageRoll = {
    id: dto.id || randomId(),
    roll: new RollComponent(dto.dieSize!, dto.dieCount!),
    type: dto.type!,
  };
  return roll;
}
export function convertDamageRollModel(model: DamageRoll): DamageRollDto {
  return {
    id: model.id,
    dieCount: model.roll.dice,
    dieSize: model.roll.sides,
    type: model.type,
  };
}
