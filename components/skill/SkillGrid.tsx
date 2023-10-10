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
  dispatch: (a: CharacterAction) => void;
}) {
  const { defaultSkills, dispatch } = props;
  const otherSkills = props.otherSkills || [];

  return (
    <div className={styles.grid}>
      {defaultKeys.map((key) => (
        <SkillComponent
          name={defaultSkillNames[key]}
          value={(defaultSkills as any)[key]}
          abilities={defaultSkillAbilities[key]}
          onChange={(n) =>
            dispatch({ type: "skill", specifier: key, numericValue: n })
          }
        ></SkillComponent>
      ))}
    </div>
  );
}
