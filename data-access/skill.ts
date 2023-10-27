import { Skill } from "@/model/skill";
import { authorizationHeaders } from "./auth-header";
import {
  convertSkillDto,
  convertSkillModel,
} from "@/model/mapper/skill-mapper";
import { jsonOrError } from "./fetch-error";

export async function updateDefaultSkill(
  characterId: number,
  skill: string,
  value: number
): Promise<Skill> {
  const putArguments = {
    method: "PUT",
    headers: {
      ...(await authorizationHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [skill]: value,
    }),
  };

  return fetch(
    `${process.env.BACKEND_URL}/character/${characterId}/defaultSkills`,
    putArguments
  )
    .then(jsonOrError)
    .then(convertSkillDto);
}

export async function updateSkill(
  characterId: number,
  skill: Skill
): Promise<Skill> {
  const putArguments = {
    method: "PUT",
    headers: {
      ...(await authorizationHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(convertSkillModel(skill)),
  };

  return fetch(
    `${process.env.BACKEND_URL}/character/${characterId}/skills/${skill.identifier}`,
    putArguments
  )
    .then(jsonOrError)
    .then(convertSkillDto);
}
