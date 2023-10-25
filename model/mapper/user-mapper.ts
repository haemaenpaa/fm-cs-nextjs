import { UserDto } from "fm-transfer-model";
import User from "../user";

export function convertUserDto(dto?: UserDto): User | undefined {
  if (!dto) {
    return undefined;
  }
  return {
    id: dto.id || 0,
    name: dto.name || "<insert-name-here>",
  };
}
