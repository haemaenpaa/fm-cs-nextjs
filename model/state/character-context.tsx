import {
  Context,
  ReactComponentElement,
  ReactNode,
  createContext,
  useContext,
} from "react";
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

export function useAbilities(): CharacterAbilities {
  return useContext(_AbilitiesContext);
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
