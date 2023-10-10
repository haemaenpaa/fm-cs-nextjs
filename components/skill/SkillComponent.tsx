import { useAbilities } from "@/model/state/character-context";
import RowOfDots from "../common/RowOfDots";
import { abilityModifier } from "@/model/character-abilities";
import styles from "./SkillComponent.module.css";

function AbilityButton(props: { ability?: string; className?: string }) {
  const characterAbilities = useAbilities() as any;
  const { ability, className } = props;
  if (!ability) {
    return <></>;
  }
  const mod = abilityModifier(characterAbilities[ability]);
  return (
    <div className={styles.button + " " + (className || "")}>
      <p>{ability}</p>
      <button>{mod >= 0 ? `+${mod}` : `${mod}`}</button>
    </div>
  );
}

export default function Skill(props: {
  name: string;
  value: number;
  proficiency?: number;
  abilities?: string[];
  onChange: (v: number) => void;
}) {
  const { name, value, proficiency, abilities, onChange } = props;
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{name}</h3>
      <RowOfDots
        current={value}
        max={5}
        min={0}
        onChange={onChange}
        className={styles.rank}
      ></RowOfDots>
      {abilities?.map((a, i) => (
        <AbilityButton
          ability={a}
          className={i % 2 ? styles.rightButton : styles.leftButton}
        ></AbilityButton>
      ))}
      <button className={styles.button + " " + styles.middleButton}>
        <p>+0</p>
      </button>
    </div>
  );
}
