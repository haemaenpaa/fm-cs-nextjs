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
          <p>
            <Link href={`/characters/${c.id}`}>
              {c.id} - {c.name}, {c.biography?.concept}
            </Link>
          </p>
        ))}
        <AddCharacterButton></AddCharacterButton>
      </ul>
    );
  },
  { returnTo: "/characters" }
);
