import CharacterAbilities from "@/model/character-abilities";
import { CharacterAction } from "@/model/reducer/character-reducer";
import { useMemo } from "react";
import styles from "./AbilityGrid.module.css";
import AbilityScore from "./AbilityScore";

interface Color {
  r: number;
  g: number;
  b: number;
}

function colorRange(count: number, start: Color, end: Color): Color[] {
  const ret: Color[] = [];

  for (var i = 0; i < count; i++) {
    const q = i / (count - 1.0);
    const p = 1 - q;
    ret.push({
      r: p * start.r + q * end.r,
      g: p * start.g + q * end.g,
      b: p * start.b + q * end.b,
    });
  }
  return ret;
}

function genColors(): string[] {
  const ret: string[] = [];
  const colors = colorRange(5, { r: 200, g: 0, b: 0 }, { r: 180, g: 50, b: 60 })
    .concat(colorRange(5, { r: 255, g: 61, b: 69 }, { r: 200, g: 64, b: 0 }))
    .concat(colorRange(5, { r: 0, g: 0, b: 0 }, { r: 0, g: 160, b: 0 }))
    .concat(colorRange(5, { r: 0, g: 180, b: 0 }, { r: 10, g: 160, b: 145 }))
    .concat(colorRange(5, { r: 0, g: 280, b: 160 }, { r: 160, g: 160, b: 0 }))
    .concat(colorRange(6, { r: 180, g: 180, b: 0 }, { r: 0, g: 200, b: 200 }));
  return colors.map(
    (c) => `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`
  );
}

const colors = genColors();

export default function AbilityGrid(props: {
  abilities: CharacterAbilities;
  dispatch: (action: CharacterAction) => void;
}) {
  const { abilities, dispatch } = props;
  const handlers: { [key: string]: (v: number) => void } = useMemo(() => {
    const dispatchChange = (specifier: string, value: number) => {
      console.log("Update " + specifier + "=" + value);
      if (!Number.isNaN(value)) {
        dispatch({ type: "ability", specifier, numericValue: value });
      }
    };
    return {
      br: (v: number) => dispatchChange("br", v),
      dex: (v: number) => dispatchChange("dex", v),
      vit: (v: number) => dispatchChange("vit", v),
      int: (v: number) => dispatchChange("int", v),
      cun: (v: number) => dispatchChange("cun", v),
      res: (v: number) => dispatchChange("res", v),
      pre: (v: number) => dispatchChange("pre", v),
      man: (v: number) => dispatchChange("man", v),
      com: (v: number) => dispatchChange("com", v),
    };
  }, [dispatch]);
  return (
    <div className={styles.container}>
      {Object.keys(abilities).map((key) => (
        <div className={styles[key]} key={key}>
          <div style={{ color: colors[(abilities as any)[key]] }}>
            <AbilityScore
              score={(abilities as any)[key]}
              heading={key}
              changed={handlers[key]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
