import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";

export default function EditableText(props: {
  value: string;
  onSubmit?: (newValue: string) => void;
  onChange?: (newValue: string) => void;
  className?: string;
  width?: number;
}) {
  const { value, onSubmit, onChange, className, width } = props;
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
      const newValue = ev.target.value;
      setCurrent(newValue);
      if (onChange && !Number.isNaN(newValue)) {
        onChange(newValue);
      }
    },
    [onChange]
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
    [value]
  );

  const descRef = useRef();

  if (editing) {
    return (
      <input
        autoFocus
        className={className}
        type="text"
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
