import Character from "@/model/character";
import {
  convertCharacterDto,
  convertCharacterModel,
} from "@/model/mapper/character-mapper";
import { authorizationHeaders } from "./auth-header";

export default async function fetchCharacter(id: number): Promise<Character> {
  return fetch(process.env.BACKEND_URL + `/character/${id}`, {
    headers: await authorizationHeaders(),
    next: { revalidate: 12 },
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
    .then((o) => {
      console.log(o);
      return o;
    })
    .then(convertCharacterDto);
}
