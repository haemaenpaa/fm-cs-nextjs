import { Skill } from "@/model/skill";
import { authorizationHeaders } from "./auth-header";
import {
  convertSkillDto,
  convertSkillModel,
} from "@/model/mapper/skill-mapper";
import { blankOrError, jsonOrError } from "./fetch-error";
import { characterRevalidator } from "./characterRevalidator";

export async function createSkill(
  characterId: number,
  skill: Skill
): Promise<Skill> {
  const postArguments = {
    method: "POST",
    headers: {
      ...(await authorizationHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(convertSkillModel(skill)),
  };

  return fetch(
    `${process.env.BACKEND_URL}/character/${characterId}/skills`,
    postArguments
  )
    .then(jsonOrError)
    .then(characterRevalidator(characterId))
    .then(convertSkillDto);
}

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
    .then(characterRevalidator(characterId))
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
    .then(characterRevalidator(characterId))
    .then(convertSkillDto);
}

export async function deleteSkill(characterId: number, skillId: string) {
  return fetch(
    `${process.env.BACKEND_URL}/character/${characterId}/skills/${skillId}`,
    {
      method: "DELETE",
      headers: {
        ...(await authorizationHeaders()),
        "Content-Type": "application/json",
      },
    }
  )
    .then(blankOrError)
    .then(characterRevalidator(characterId));
}
