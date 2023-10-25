"use client";
import { CharacterSpells } from "@/model/character-spells";
import { convertCharacterDto } from "@/model/mapper/character-mapper";
import { useRouter } from "next/navigation";

export default function AddCharacterButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        const character = await fetch("/api/characters", {
          method: "POST",
          body: JSON.stringify({
            abilities: {
              br: 10,
              dex: 10,
              vit: 10,
              int: 10,
              cun: 10,
              res: 10,
              pre: 10,
              man: 10,
              com: 10,
            },
            defaultSkills: {
              anh: 0,
              ath: 0,
              dec: 0,
              emp: 0,
              inv: 0,
              lea: 0,
              med: 0,
              occ: 0,
              perc: 0,
              pers: 0,
              sub: 0,
              ste: 0,
              sur: 0,
            },
            hitPointTotal: 0,
            tempHitPoints: 0,
            hitDiceRemaining: {
              6: 0,
              8: 0,
              10: 0,
              12: 0,
            },
            name: "J. Random Character",
            race: {
              name: "",
              subrace: null,
              abilities: {},
              damageResistances: [],
              statusResistances: [],
            },
            speed: 0,
            selections: [],
            customSkills: [],
            savingThrows: [],
            armorValue: 0,
            hitPointMaximum: 0,
            damageResistances: [],
            statusResistances: [],
            spells: new CharacterSpells(),
            attacks: [],
            hitDice: {
              6: 0,
              8: 0,
              10: 0,
              12: 0,
            },
            inventory: [],
            biography: {
              id: 0,
              appearance: "",
              characterBiography: "",
              characterConnections: "",
              concept: "Newly Created Character",
              height: 0,
              weight: 0,
            },
            resources: [],
          }),
        }).then((res) => res.json());
        router.push(`/characters/${character.id || 0}`);
      }}
    >
      New Character
    </button>
  );
}
