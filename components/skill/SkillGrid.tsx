import { DefaultSkills } from "@/model/character";
import { CharacterAction } from "@/model/state/character-reducer";
import { Skill } from "@/model/skill";
import SkillComponent from "./SkillComponent";
import styles from "./SkillGrid.module.css";

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

const defaultKeys = [
  "anh",
  "ath",
  "dec",
  "emp",
  "inv",
  "lea",
  "med",
  "occ",
  "perc",
  "pers",
  "sub",
  "ste",
  "sur",
];

export default function SkillGrid(props: {
  defaultSkills: DefaultSkills;
  otherSkills?: Skill[];
  onChange: (skill: string, value: number) => void;
}) {
  const { defaultSkills, onChange } = props;
  const otherSkills = props.otherSkills || [];

  return (
    <div className={styles.grid}>
      {defaultKeys.map((key) => (
        <SkillComponent
          name={defaultSkillNames[key]}
          value={(defaultSkills as any)[key]}
          abilities={defaultSkillAbilities[key]}
          onChange={(n) => onChange(key, n)}
        ></SkillComponent>
      ))}
      {otherSkills.map((sk) => (
        <SkillComponent
          name={sk.name || ""}
          value={sk.rank}
          abilities={sk.defaultAbilities}
          onChange={(n) => onChange(sk.identifier, n)}
        ></SkillComponent>
      ))}
    </div>
  );
}
