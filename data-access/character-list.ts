import Character from "@/model/character";
import { convertCharacterDto } from "@/model/mapper/character-mapper";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { CharacterDto } from "fm-transfer-model";
import { authorizationHeaders } from "./auth-header";

export default async function fetchCharacterList(): Promise<Character[]> {
  const { accessToken } = await getAccessToken({
    scopes: ["email"],
  });
  console.log("Access token: ", accessToken);
  return fetch(process.env.BACKEND_URL + "/characters", {
    headers: await authorizationHeaders(),
    next: { revalidate: 120 },
  })
    .then((res) => res.json())
    .then((dtos: CharacterDto[]) => dtos.map(convertCharacterDto));
}
