import { handleFetchError } from "@/data-access/fetch-error";
import {
  createSkill,
  updateDefaultSkill,
  updateSkill,
} from "@/data-access/skill";
import { defaultSkillKeys } from "@/model/character";
import { Skill } from "@/model/skill";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const characterId = Number.parseInt(params.id);
  return request
    .blob()
    .then((b) => b.text())
    .then(JSON.parse)
    .then((skill: Skill) => createSkill(characterId, skill))
    .then(NextResponse.json, handleFetchError);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const characterId = Number.parseInt(params.id);
  return request
    .blob()
    .then((b) => b.text())
    .then(JSON.parse)
    .then((skill: Skill) => {
      if (defaultSkillKeys.find((v) => v === skill.identifier)) {
        console.log(`Default skill ${skill.identifier}`);
        return updateDefaultSkill(characterId, skill.identifier, skill.rank);
      } else {
        console.log(`Custom skill ${skill.identifier} (${skill.name})`, skill);
        return updateSkill(characterId, skill);
      }
    })
    .then(NextResponse.json, handleFetchError);
}
