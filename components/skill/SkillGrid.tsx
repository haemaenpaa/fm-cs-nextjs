"use client";
import { DefaultSkills, defaultSkillKeys } from "@/model/character";
import { Skill } from "@/model/skill";
import SkillComponent from "./SkillComponent";
import styles from "./SkillGrid.module.css";
import { useProficiency } from "@/model/state/character-context";

const defaultSkillNames: any = {
  anh: "Animal Handling",
  ath: "Athletics",
  dec: "Deception",
  emp: "Empathy",
  inv: "Investigation",
  lea: "Leadership",
  med: "Medicine",
  occ: "Occult",
  perc: "Perception",
  pers: "Persuasion",
  sub: "Subterfuge",
  ste: "Stealth",
  sur: "Survival",
};

const defaultSkillAbilities: any = {
  anh: ["pre", "cun"],
  ath: ["br", "dex"],
  dec: ["pre", "man"],
  emp: ["com", "man"],
  inv: ["cun"],
  lea: ["pre", "man"],
  med: ["int", "cun"],
  occ: ["int", "cun"],
  perc: ["int", "com"],
  pers: ["pre", "man"],
  sub: ["dex", "cun"],
  ste: ["dex", "cun"],
  sur: ["int", "cun"],
};

export default function SkillGrid(props: {
  defaultSkills: DefaultSkills;
  otherSkills?: Skill[];
  onChange: (skill: string, value: number) => void;
}) {
  const { defaultSkills, onChange } = props;
  const otherSkills = props.otherSkills || [];
  const proficiency = useProficiency();

  return (
    <div className={styles.grid}>
      {defaultSkillKeys.map((key) => (
        <SkillComponent
          key={key}
          name={defaultSkillNames[key]}
          value={defaultSkills[key]}
          abilities={defaultSkillAbilities[key]}
          proficiency={proficiency}
          onChange={(n) => onChange(key, n)}
        ></SkillComponent>
      ))}
      {otherSkills.map((sk) => (
        <SkillComponent
          key={sk.identifier}
          name={sk.name || ""}
          value={sk.rank}
          abilities={sk.defaultAbilities}
          proficiency={proficiency}
          onChange={(n) => onChange(sk.identifier, n)}
        ></SkillComponent>
      ))}
    </div>
  );
}
