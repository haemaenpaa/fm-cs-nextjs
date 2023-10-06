import Character from "@/model/character";
import { convertCharacterDto } from "@/model/mapper/character-mapper";

export default async function fetchCharacter(id: number): Promise<Character> {
  return fetch(process.env.BACKEND_URL + `/character/${id}`, {
    next: { revalidate: 120 },
  })
    .then((res) => res.json())
    .then(convertCharacterDto);
}
