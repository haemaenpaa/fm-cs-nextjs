import fetchCharacterList from "@/data-access/character-list";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import AddCharacterButton from "./AddCharacterButton";

export default withPageAuthRequired(
  async function CharacterListPage() {
    const characters = await fetchCharacterList();
    return (
      <ul>
        {characters.map((c) => (
          <li key={c.id}>
            <Link href={`/characters/${c.id}`}>
              {c.name}, {c.biography?.concept}
            </Link>
          </li>
        ))}
        <li key="new">
          <AddCharacterButton></AddCharacterButton>
        </li>
      </ul>
    );
  },
  {
    returnTo: "/characters",
  }
);
