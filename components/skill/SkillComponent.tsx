import { useAbilities } from "@/model/state/character-context";
import RowOfDots from "../common/RowOfDots";
import { abilityModifier } from "@/model/character-abilities";
import styles from "./SkillComponent.module.css";
import Popup from "reactjs-popup";
import AbilitySelection from "../ability/AbilitySelector";
import Image from "next/image";
import quill from "../../public/quill.png";
import sunderedShield from "../../public/sundered-shield.png";
import EditableText from "../common/EditableText";

function AbilityButton(props: {
  ability?: string;
  skillBonus?: number;
  className?: string;
  editable?: boolean;
  onChange: (s: string) => void;
}) {
  const characterAbilities = useAbilities() as any;
  const { ability, className, skillBonus, editable, onChange } = props;
  if (!ability) {
    return <></>;
  }
  const mod = abilityModifier(characterAbilities[ability]) + (skillBonus || 0);
  return (
    <div className={styles.button + " " + (className || "")}>
      {editable ? (
        <AbilityEdit onChange={onChange}></AbilityEdit>
      ) : (
        <p>&nbsp;</p>
      )}
      <p>{ability}</p>
      <button>{mod >= 0 ? `+${mod}` : `${mod}`}</button>
    </div>
  );
}
function AbilityEdit(props: { onChange: (a: string) => void }) {
  const { onChange } = props;
  return (
    <Popup
      trigger={
        <button>
          <Image
            alt="E"
            src={quill}
            style={{ height: "1.5em", width: "0.75em" }}
          ></Image>
        </button>
      }
      modal
      position="center center"
    >
      <AbilitySelection
        onAbilityClick={(a: string) => {
          onChange(a);
          close();
        }}
      ></AbilitySelection>
    </Popup>
  );
}

export default function SkillComponent(props: {
  name: string;
  value: number;
  proficiency?: number;
  abilities?: string[];
  editable?: boolean;
  onChange: (v: number, a?: string[]) => void;
  onDelete?: () => void;
  onRename?: (name: string) => void;
}) {
  const {
    name,
    value,
    proficiency,
    abilities,
    editable,
    onChange,
    onDelete,
    onRename,
  } = props;
  const skillBonus = Math.ceil(((proficiency || 0) * value) / 2);
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        {editable ? (
          <>
            <EditableText
              value={name}
              className={styles.skillName}
              onSubmit={onRename!}
            ></EditableText>
            <button onClick={onDelete}>
              {" "}
              <Image
                alt="X"
                src={sunderedShield}
                style={{
                  width: "1em",
                  height: "1em",
                }}
              ></Image>
            </button>
          </>
        ) : (
          <p className={styles.skillName}>{name}</p>
        )}
      </h3>
      <RowOfDots
        current={value}
        max={5}
        min={0}
        onChange={(n) => onChange(n, abilities)}
        className={styles.rank}
        iconStyle="heptagon"
      ></RowOfDots>
      {abilities?.map((a, i) => (
        <AbilityButton
          ability={a}
          className={i % 2 ? styles.rightButton : styles.leftButton}
          skillBonus={skillBonus}
          key={a}
          editable={editable}
          onChange={(abl) => {
            onChange(
              value,
              abilities ? abilities.map((s, k) => (k === i ? abl : s)) : [abl]
            );
          }}
        ></AbilityButton>
      ))}
      {editable && (!abilities || abilities?.length < 2) ? (
        <div
          className={
            styles.button +
            " " +
            (abilities?.length ? styles.rightButton : styles.leftButton)
          }
        >
          <AbilityEdit
            onChange={(abl) => {
              onChange(value, abilities ? [...abilities, abl] : [abl]);
            }}
          ></AbilityEdit>
        </div>
      ) : (
        <></>
      )}
      <button className={styles.button + " " + styles.middleButton}>
        <p>+{skillBonus}</p>
      </button>
    </div>
  );
}
