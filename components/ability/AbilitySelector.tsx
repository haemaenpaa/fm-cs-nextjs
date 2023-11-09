import { useAbilities, useProficiency } from "@/model/state/character-context";
import styles from "./AbilityGrid.module.css";
import { useMemo } from "react";
import { abilityModifier } from "@/model/character-abilities";
import { ABILITY_SHORT_NAMES } from "./constants";

function AbilityButton(props: {
  abl: string;
  score: number;
  proficiency: number;
}) {
  const { abl, score, proficiency } = props;
  const name = useMemo(() => (ABILITY_SHORT_NAMES as any)[abl], [abl]);
  const modifier = useMemo(
    () => abilityModifier(score) + proficiency,
    [score, proficiency]
  );
  const valLabel = useMemo(
    () => (modifier + proficiency >= 0 ? `+${modifier}` : `${modifier}`),
    [modifier, proficiency]
  );
  return (
    <>
      {name}:{valLabel}
    </>
  );
}

export default function AbilitySelection(props: {
  excludeProficiency?: boolean;
  onAbilityClick: (ab: string) => void;
}) {
  const { excludeProficiency, onAbilityClick } = props;
  const abilities: any = useAbilities();
  const proficiency = useProficiency();
  const offset = excludeProficiency ? 0 : proficiency;
  return (
    <div className={styles.container} style={{ background: "white" }}>
      {Object.keys(abilities).map((key) => (
        <div
          className={styles[key]}
          key={key}
          onClick={(_) => onAbilityClick(key)}
        >
          <AbilityButton
            abl={key}
            score={abilities[key]}
            proficiency={offset}
          ></AbilityButton>
        </div>
      ))}
    </div>
  );
}
