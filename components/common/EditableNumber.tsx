import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { setEnvironmentData } from "worker_threads";

export default function EditableNumber(props: {
  value: number;
  onSubmit?: (newValue: number) => void;
  onChange?: (newValue: number) => void;
  className?: string;
  width?: number;
  minimum?: number;
  maximum?: number;
}) {
  const { value, onSubmit, onChange, className, width, minimum, maximum } =
    props;
  const [current, setCurrent] = useState(value);
  const [editing, setEditing] = useState(false);
  const ref = useRef();
  const submit = useCallback(() => {
    setEditing(false);
    if (current !== value && !Number.isNaN(current) && onSubmit) {
      onSubmit(current);
    }
  }, [onSubmit, setEditing, current, value]);
  const updateValue = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number.parseInt(ev.target.value);
      if (
        (minimum !== undefined && newValue < minimum) ||
        (maximum !== undefined && newValue > maximum)
      ) {
        return;
      }
      setCurrent(Math.max(newValue));
      if (onChange && !Number.isNaN(newValue)) {
        onChange(newValue);
      }
    },
    [setCurrent, onChange]
  );
  const onKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        setEditing(false);
      }
      if (ev.key === "Escape") {
        setCurrent(value);
        setEditing(false);
      }
    },
    [setCurrent, setEditing]
  );

  const descRef = useRef();

  if (editing) {
    return (
      <input
        autoFocus
        className={className}
        type="number"
        value={current}
        onChange={updateValue}
        onKeyDown={onKeyDown}
        onBlur={submit}
        size={width || 2}
      ></input>
    );
  }
  return (
    <p className={className} onClick={() => setEditing(true)}>
      {current}
    </p>
  );
}
