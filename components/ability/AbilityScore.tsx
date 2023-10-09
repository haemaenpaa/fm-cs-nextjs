import { abilityModifier } from "@/model/character-abilities";
import { useCallback, useMemo, useState } from "react";
import EditableNumber from "../common/EditableNumber";
import styles from "./AbilityScore.module.css";

export default function AbilityScore(props: {
  heading: string;
  score: number;
  changed: (v: number) => void;
}) {
  const { heading, score, changed } = props;
  const [current, setCurrent] = useState(score);
  const modifier = useMemo(() => abilityModifier(current), [current]);

  return (
    <div className={styles.container}>
      <p className={styles.heading}>{heading}</p>
      <EditableNumber
        value={score}
        onChange={setCurrent}
        onSubmit={changed}
        className={styles.score}
        minimum={0}
        maximum={30}
      />
      <p className={styles.modifier}>
        {modifier < 0 ? `${modifier}` : `+${modifier}`}
      </p>
    </div>
  );
}
