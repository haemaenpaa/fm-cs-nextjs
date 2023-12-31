import { revalidateTag } from "next/cache";
import { authorizationHeaders } from "./auth-header";
import { jsonOrError } from "./fetch-error";
import { characterRevalidator } from "./characterRevalidator";

export default async function updateAbility(
  characterId: number,
  ability: string,
  value: number
) {
  const putArguments = {
    method: "PUT",
    headers: {
      ...(await authorizationHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [ability]: value,
    }),
  };

  return fetch(
    `${process.env.BACKEND_URL}/character/${characterId}/abilities`,
    putArguments
  )
    .then(jsonOrError)
    .then(characterRevalidator(characterId));
}
