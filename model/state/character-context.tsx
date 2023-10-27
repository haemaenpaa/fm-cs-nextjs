import { ReactNode, createContext, memo, useContext, useMemo } from "react";
import Character from "../character";
import CharacterAbilities from "../character-abilities";

const _AbilitiesContext = createContext<CharacterAbilities>({
  br: 10,
  dex: 10,
  vit: 10,
  int: 10,
  cun: 10,
  res: 10,
  pre: 10,
  man: 10,
  com: 10,
});

const _ProficiencyContext = createContext<number>(2);
const _LevelContext = createContext<number>(0);

export function useAbilities(): CharacterAbilities {
  return useContext(_AbilitiesContext);
}

export function useProficiency() {
  return useContext(_ProficiencyContext);
}

export function useLevel() {
  return useContext(_LevelContext);
}

export function AbilitiesContext(props: {
  character: Character;
  children: ReactNode;
}) {
  return (
    <_AbilitiesContext.Provider value={props.character.abilities}>
      {props.children}
    </_AbilitiesContext.Provider>
  );
}

export function LevelContext(props: {
  character: Character;
  children: ReactNode;
}) {
  const { character, children } = props;
  const level = useMemo(
    () => character.selections.filter((s) => s.isPrimary).length,
    [character.selections, character.selections?.length]
  );
  const proficiency = useMemo(() => {
    if (level > 16) return 6;
    if (level > 12) return 5;
    if (level > 8) return 4;
    if (level > 4) return 3;
    return 2;
  }, [level]);

  return (
    <_LevelContext.Provider value={level}>
      <_ProficiencyContext.Provider value={proficiency}>
        {children}
      </_ProficiencyContext.Provider>
    </_LevelContext.Provider>
  );
}

export function CharacterContext(props: {
  character: Character;
  children: ReactNode;
}) {
  return (
    <LevelContext character={props.character}>
      <AbilitiesContext character={props.character}>
        {props.children}
      </AbilitiesContext>
    </LevelContext>
  );
}
