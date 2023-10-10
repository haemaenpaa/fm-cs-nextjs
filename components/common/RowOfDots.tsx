import { useState } from "react";

export default function RowOfDots(props: {
  current: number;
  max: number;
  min: number;
  onChange: (v: number) => void;
  className?: string;
}) {
  const { current, max, min, onChange, className } = props;
  const [hovered, setHovered] = useState(current);

  const checkedIdx = [...Array(current).keys()];
  const hoveredIdx =
    hovered > current
      ? [...Array(hovered - current).keys()].map((i) => current + i)
      : [];
  const uncheckedIdx = [...Array(max - hovered).keys()].map((i) => hovered + i);

  return (
    <div onMouseLeave={() => setHovered(current)} className={className || ""}>
      {checkedIdx.map((n) => (
        <button onClick={() => onChange(n)}>◆</button>
      ))}
      {hoveredIdx.map((n) => (
        <button
          onClick={() => onChange(n + 1)}
          onMouseEnter={() => setHovered(n + 1)}
          onMouseLeave={() => setHovered(current)}
        >
          ◈
        </button>
      ))}
      {uncheckedIdx.map((n) => (
        <button
          onClick={() => onChange(n + 1)}
          onMouseEnter={() => setHovered(n + 1)}
        >
          ◇
        </button>
      ))}
    </div>
  );
}
