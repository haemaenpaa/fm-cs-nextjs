import fetchCharacterList from "@/data-access/character-list";
import Link from "next/link";

export default async function CharacterListPage() {
  const characters = await fetchCharacterList();
  return (
    <ul>
      {characters.map((c) => (
        <p>
          <Link href={`/characters/${c.id}`}>
            {c.id} - {c.name}, {c.biography?.concept}
          </Link>
        </p>
      ))}
    </ul>
  );
}
