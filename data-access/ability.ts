export default async function updateAbility(
  characterId: number,
  ability: string,
  value: number
) {
  const putArguments = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      [ability]: value,
    }),
  };

  return fetch(
    `${process.env.BACKEND_URL}/character/${characterId}/abilities`,
    putArguments
  );
}
