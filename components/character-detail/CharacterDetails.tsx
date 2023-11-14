import Character from "@/model/character";
import EditableText from "../common/EditableText";
import { channel } from "diagnostics_channel";

export function CharacterDetails(props: {
  character: Character;
  onRename: (name: string) => void;
}) {
  const { character, onRename } = props;
  return (
    <div>
      <EditableText value={character.name} onSubmit={onRename}></EditableText>
    </div>
  );
}
