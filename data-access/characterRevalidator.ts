import { revalidateTag } from "next/cache";

/**
 * Returns a promise handler that revalidates the cached character and returns the original result.
 * @param characterId
 * @returns
 */
export function characterRevalidator(characterId: number) {
  return (o: any) => {
    if (o !== undefined) {
      revalidateTag(`character:${characterId}`);
    }
    return o;
  };
}
