"use client";
import AbilityGrid from "@/components/ability/AbilityGrid";
import SkillGrid from "@/components/skill/SkillGrid";
import Character, { getSkill } from "@/model/character";
import {
  AbilitiesContext,
  CharacterContext,
  LevelContext,
} from "@/model/state/character-context";
import { reduceCharacter } from "@/model/state/character-reducer";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useReducer } from "react";

export default function CharacterSheet() {
  const params = useParams();
  const [character, dispatch] = useReducer(
    reduceCharacter,
    undefined as any as Character
  );

  const onAbilityChange = useCallback(
    (specifier: string, value: number) => {
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
    },
    [dispatch, character?.abilities]
  );

  const onSkillChange = useCallback(
    (specifier: string, rank: number) => {
      const oldValue = getSkill(character!, specifier);
      const isDefault = specifier in character.defaultSkills;
      const onError = (e: any) => {
        console.error("Failed to update character", e);
        dispatch({
          type: "skill",
          specifier,
          numericValue: oldValue?.rank,
        });
      };
      fetch(`/api/characters/${params.id}/skill`, {
        method: "PUT",
        body: JSON.stringify({ ...oldValue, rank }),
      }).catch(onError);
      dispatch({ type: "skill", specifier, numericValue: rank });
    },
    [dispatch, character?.defaultSkills, character?.customSkills]
  );

  useEffect(() => {
    fetch(`/api/characters/${params.id}`)
      .then((res) => res.json())
      .then((c) =>
        dispatch({ type: "useFetched", specifier: "", override: c })
      );
  }, []);
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
    <CharacterContext character={character}>
      <section>
        <p>{character.name}</p>
        <div style={{ width: "40vw" }}>
          <AbilityGrid
            abilities={character.abilities}
            onChange={onAbilityChange}
          />
        </div>
        <div style={{ width: "40vw" }}>
          <SkillGrid
            defaultSkills={character.defaultSkills}
            otherSkills={character.customSkills}
            onChange={onSkillChange}
          ></SkillGrid>
        </div>
      </section>
    </CharacterContext>
  );
}
