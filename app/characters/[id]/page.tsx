"use client";
import AbilityGrid from "@/components/ability/AbilityGrid";
import SkillGrid from "@/components/skill/SkillGrid";
import Character from "@/model/character";
import { AbilitiesContext } from "@/model/state/character-context";
import { reduceCharacter } from "@/model/state/character-reducer";
import { useParams } from "next/navigation";
import { useEffect, useReducer } from "react";

export default function CharacterSheet() {
  const params = useParams();
  const [character, dispatch] = useReducer(
    reduceCharacter,
    undefined as any as Character
  );
  useEffect(() => {
    fetch(`/api/characters/${params.id}`)
      .then((res) => res.json())
      .then((c) =>
        dispatch({ type: "useFetched", specifier: "", override: c })
      );
  }, [params.id]);
  useEffect(() => {
    document.title = character ? character.name : "Loading character...";
  }, [character]);
  if (!character) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  return (
    <AbilitiesContext character={character}>
      <section>
        <p>{character.name}</p>
        <div style={{ width: "40vw" }}>
          <AbilityGrid
            abilities={character.abilities}
            onChange={(specifier, value) => {
              const oldValue = (character.abilities as any)[specifier];
              fetch(`/api/characters/${params.id}/ability/${specifier}`, {
                method: "PUT",
                body: `${value}`,
              }).catch((e) => {
                console.error("Failed to update character", e);
                dispatch({
                  type: "ability",
                  specifier,
                  numericValue: oldValue,
                });
              });
              dispatch({ type: "ability", specifier, numericValue: value });
            }}
          />
        </div>
        <div style={{ width: "40vw" }}>
          <SkillGrid
            defaultSkills={character.defaultSkills}
            onChange={(skill, value) =>
              dispatch({ type: "skill", specifier: skill, numericValue: value })
            }
          ></SkillGrid>
        </div>
      </section>
    </AbilitiesContext>
  );
}
