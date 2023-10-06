"use client";
import AbilityGrid from "@/components/ability/AbilityGrid";
import Character from "@/model/character";
import { reduceCharacter } from "@/model/reducer/character-reducer";
import Head from "next/head";
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
    <>
      <section>
        <p>{character.name}</p>
        <div style={{ width: "30vw" }}>
          <AbilityGrid abilities={character.abilities} dispatch={dispatch} />
        </div>
      </section>
    </>
  );
}
