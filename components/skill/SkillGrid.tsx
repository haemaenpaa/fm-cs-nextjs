"use client";
import { DefaultSkills, defaultSkillKeys } from "@/model/character";
import { Skill } from "@/model/skill";
import SkillComponent from "./SkillComponent";
import styles from "./SkillGrid.module.css";
import { useProficiency } from "@/model/state/character-context";
import { useState } from "react";

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
  onChange: (
    skill: string,
    value: number,
    abilities?: string[],
    name?: string
  ) => void;
  onAdd: (name: string) => void;
  onRemove: (identifier: string) => void;
}) {
  const { defaultSkills, onChange, onAdd, onRemove } = props;
  const otherSkills = props.otherSkills || [];
  const proficiency = useProficiency();
  const [adding, setAdding] = useState(false);
  const [newSkill, setNewSkill] = useState("");

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
          editable
          key={sk.identifier}
          name={sk.name || ""}
          value={sk.rank}
          abilities={sk.defaultAbilities}
          proficiency={proficiency}
          onChange={(n, s) => onChange(sk.identifier, n, s)}
          onDelete={() => onRemove(sk.identifier)}
          onRename={(a) =>
            onChange(sk.identifier, sk.rank, sk.defaultAbilities, a)
          }
        ></SkillComponent>
      ))}
      {adding ? (
        <input
          type="text"
          placeholder="Skill name"
          value={newSkill}
          autoFocus
          onChange={(ev) => setNewSkill(ev.target.value)}
          onBlur={() => {
            if (newSkill) {
              onAdd(newSkill);
            }
            setNewSkill("");
            setAdding(false);
          }}
        ></input>
      ) : (
        <button onClick={() => setAdding(true)}>Add skill</button>
      )}
    </div>
  );
}
