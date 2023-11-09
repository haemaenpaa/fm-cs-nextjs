"use client";
import AbilityGrid from "@/components/ability/AbilityGrid";
import SkillGrid from "@/components/skill/SkillGrid";
import Character, { getSkill } from "@/model/character";
import { randomId } from "@/model/id-generator";
import { Skill } from "@/model/skill";
import { CharacterContext } from "@/model/state/character-context";
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
    [character?.abilities, params.id]
  );

  const onSkillChange = useCallback(
    (specifier: string, rank: number, abilities?: string[], name?: string) => {
      const oldValue: Skill = getSkill(character!, specifier)!;
      const newValue: Skill = {
        identifier: oldValue.identifier,
        name: name || oldValue.name,
        rank,
        defaultAbilities: abilities || oldValue.defaultAbilities,
      };
      const onError = (e: any) => {
        console.error("Failed to update skill", e);
        dispatch({
          type: "skill",
          specifier,
          numericValue: oldValue.rank,
          stringValue: oldValue.name,
          stringList: oldValue.defaultAbilities,
        });
      };
      fetch(`/api/characters/${params.id}/skill`, {
        method: "PUT",
        body: JSON.stringify(newValue),
      }).catch(onError);
      dispatch({
        type: "skill",
        specifier,
        numericValue: rank,
        stringValue: name,
        stringList: abilities,
      });
    },
    [character, params.id]
  );
  const onSkillAdd = useCallback(
    (name: string) => {
      const specifier = `${randomId()}`;
      const addedSkill: Skill = {
        identifier: specifier,
        name,
        rank: 0,
        defaultAbilities: [],
      };
      const onError = (e: any) => {
        console.error("Failed to update skill", e);
        dispatch({
          type: "removeSkill",
          specifier,
        });
      };
      fetch(`/api/characters/${params.id}/skill`, {
        method: "POST",
        body: JSON.stringify(addedSkill),
      }).catch(onError);
      dispatch({ type: "addSkill", specifier, stringValue: name });
    },
    [params.id]
  );

  const onSkillRemove = useCallback(
    (identifier: string) => {
      const removed = getSkill(character, identifier);
      if (!removed) {
        console.log("Skill not found");
        return;
      }
      const onError = (e: any) => {
        console.error("Failed to update skill", e);
        dispatch({
          type: "addSkill",
          specifier: identifier,
          stringValue: removed?.name,
          numericValue: removed?.rank,
          stringList: removed?.defaultAbilities,
        });
      };
      fetch(`/api/characters/${params.id}/skill/${identifier}`, {
        method: "DELETE",
      })
        .catch(onError)
        .then(console.log);
      dispatch({ type: "removeSkill", specifier: identifier });
    },
    [character, params.id]
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
            onAdd={onSkillAdd}
            onRemove={onSkillRemove}
          ></SkillGrid>
        </div>
      </section>
    </CharacterContext>
  );
}
