import { handleFetchError } from "@/data-access/fetch-error";
import { deleteSkill } from "@/data-access/skill";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  {
    params,
  }: {
    params: { id: string; skillId: string };
  }
) {
  const characterId = Number.parseInt(params.id);
  return deleteSkill(characterId, params.skillId).then(
    NextResponse.json,
    handleFetchError
  );
}
