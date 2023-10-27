import { useAbilities, useProficiency } from "@/model/state/character-context";
import RowOfDots from "../common/RowOfDots";
import { abilityModifier } from "@/model/character-abilities";
import styles from "./SkillComponent.module.css";

function AbilityButton(props: {
  ability?: string;
  skillBonus?: number;
  className?: string;
}) {
  const characterAbilities = useAbilities() as any;
  const { ability, className, skillBonus } = props;
  if (!ability) {
    return <></>;
  }
  const mod = abilityModifier(characterAbilities[ability]) + (skillBonus || 0);
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
  const skillBonus = Math.ceil(((proficiency || 0) * value) / 2);
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
          skillBonus={skillBonus}
        ></AbilityButton>
      ))}
      <button className={styles.button + " " + styles.middleButton}>
        <p>+{skillBonus}</p>
      </button>
    </div>
  );
}
