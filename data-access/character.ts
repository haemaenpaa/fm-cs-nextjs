import Character from "@/model/character";
import {
  convertCharacterDto,
  convertCharacterModel,
} from "@/model/mapper/character-mapper";
import { authorizationHeaders } from "./auth-header";
import { characterRevalidator } from "./characterRevalidator";

export default async function fetchCharacter(id: number): Promise<Character> {
  return fetch(process.env.BACKEND_URL + `/character/${id}`, {
    headers: await authorizationHeaders(),
    next: { revalidate: 60, tags: [`character:${id}`] },
  })
    .then((res) => res.json())
    .then(convertCharacterDto);
}

export async function createCharacter(
  character: Character
): Promise<Character> {
  return fetch(process.env.BACKEND_URL + `/character`, {
    method: "POST",
    body: JSON.stringify(convertCharacterModel(character)),
    headers: {
      ...(await authorizationHeaders()),
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(convertCharacterDto);
}

export async function renameCharacter(characterId: number, name: string) {
  return fetch(process.env.BACKEND_URL + `/character/${characterId}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
    headers: {
      ...(await authorizationHeaders()),
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(characterRevalidator(characterId))
    .then(convertCharacterDto);
}
