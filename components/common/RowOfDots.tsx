import Image from "next/image";
import { useState } from "react";

export default function RowOfDots(props: {
  current: number;
  max: number;
  min: number;
  onChange: (v: number) => void;
  className?: string;
  iconStyle?: "heptagon" | "star" | "jagged-star";
}) {
  const { current, max, min, onChange, className, iconStyle } = props;
  const [hovered, setHovered] = useState(current);
  const iconName = iconStyle || "heptagon";

  const checkedIdx = [...Array(current).keys()];
  const hoveredIdx =
    hovered > current
      ? [...Array(hovered - current).keys()].map((i) => current + i)
      : [];
  const uncheckedIdx = [...Array(max - hovered).keys()].map((i) => hovered + i);

  return (
    <div onMouseLeave={() => setHovered(current)} className={className || ""}>
      {checkedIdx.map((n) => (
        <button key={n} onClick={() => onChange(Math.max(n, min))}>
          <Image
            src={`/${iconName}-fill.png`}
            width={20}
            height={20}
            alt="◆"
          ></Image>
        </button>
      ))}
      {hoveredIdx.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n + 1)}
          onMouseEnter={() => setHovered(n + 1)}
          onMouseLeave={() => setHovered(current)}
        >
          <Image
            src={`/${iconName}-hilight.png`}
            width={20}
            height={20}
            alt="◆"
          ></Image>
        </button>
      ))}
      {uncheckedIdx.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n + 1)}
          onMouseEnter={() => setHovered(n + 1)}
        >
          <Image
            src={`/${iconName}.png`}
            width={20}
            height={20}
            alt="◆"
          ></Image>
        </button>
      ))}
    </div>
  );
}
