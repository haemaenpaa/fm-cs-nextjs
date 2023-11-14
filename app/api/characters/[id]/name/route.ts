import { renameCharacter } from "@/data-access/character";
import { handleFetchError } from "@/data-access/fetch-error";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const characterId = Number.parseInt(params.id);
  return req
    .blob()
    .then((b) => b.text())
    .then((name) => renameCharacter(characterId, name))
    .then(NextResponse.json, handleFetchError);
}
