import Character from "@/model/character";
import { convertCharacterDto } from "@/model/mapper/character-mapper";
import { CharacterDto } from "fm-transfer-model";
import { authorizationHeaders } from "./auth-header";

export default async function fetchCharacterList(): Promise<Character[]> {
  return fetch(process.env.BACKEND_URL + "/characters", {
    headers: await authorizationHeaders(),
    next: { revalidate: 1 },
  })
    .then((res) => res.json())
    .then((dtos: CharacterDto[]) => dtos.map(convertCharacterDto));
}
